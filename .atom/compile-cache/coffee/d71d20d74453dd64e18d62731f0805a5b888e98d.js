(function() {
  describe('Subscript', function() {
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
      it('simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('~subscript~ is good').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'subscript',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' is good',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on ~subscript~ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]~subscript~').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.meta.sub.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'subscript',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on ~subscript~ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]~subscript~').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.meta.sub.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'subscript',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '~',
          scopes: ['source.asciidoc', 'markup.subscript.asciidoc', 'markup.sub.subscript.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvc3Vic2NyaXB0LWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBQ3BCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7QUFFaEMsTUFBQSxFQUFBLENBQUcsZUFBSCxFQUFvQixTQUFBLEdBQUE7QUFDbEIsWUFBQSxNQUFBO0FBQUEsUUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLHFCQUFyQixFQUFWLE1BQUQsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFPLE1BQVAs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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/subscript-grammar-spec.coffee
