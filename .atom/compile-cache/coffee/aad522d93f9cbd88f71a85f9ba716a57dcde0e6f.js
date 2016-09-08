(function() {
  describe('xref', function() {
    var grammar;
    grammar = null;
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-asciidoc');
      });
      return runs(function() {
        return grammar = atom.grammars.grammarForScopeName('source.asciidoc');
      });
    });
    it('parses the grammar', function() {
      expect(grammar).toBeDefined();
      return expect(grammar.scopeName).toBe('source.asciidoc');
    });
    return describe('should tokenizes when', function() {
      it('<<reference>> elements', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar <<id,reftext>> foobar').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foobar ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '<<',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'constant.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'id,',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'reftext',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '>>',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'constant.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' foobar',
          scopes: ['source.asciidoc']
        });
      });
      return it('tokenizes xref:id[reference] elements', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar xref:id[reftext] foobar').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqualJson({
          value: 'foobar ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'xref:',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'id',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: 'reftext',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.reference.xref.asciidoc']
        });
        return expect(tokens[6]).toEqualJson({
          value: ' foobar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMveHJlZi1tYWNyby1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFNBQUEsR0FBQTtBQUNmLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7QUFFaEMsTUFBQSxFQUFBLENBQUcsd0JBQUgsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQiw4QkFBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxNQUFQ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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/xref-macro-grammar-spec.coffee
