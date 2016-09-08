(function() {
  describe('Footnote macro', function() {
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
    return describe('Should tokenizes when', function() {
      it('simple footnote', function() {
        var tokens;
        tokens = grammar.tokenizeLine('footnote:[text]').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'footnote',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'text',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
      });
      it('simple footnote with formatted text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('footnote:[*text*]').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'footnote',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'text',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'string.unquoted.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
      });
      it('simple footnoteref with id and text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('footnoteref:[id,text]').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'footnoteref',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'id,text',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
      });
      return it('simple footnoteref with id', function() {
        var tokens;
        tokens = grammar.tokenizeLine('footnoteref:[id]').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'footnoteref',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'id',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.footnote.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvZm9vdG5vdGUtbWFjcm8tZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7QUFFaEMsTUFBQSxFQUFBLENBQUcsaUJBQUgsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixpQkFBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/footnote-macro-grammar-spec.coffee
