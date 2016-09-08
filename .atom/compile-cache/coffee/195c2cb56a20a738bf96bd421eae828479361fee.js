(function() {
  describe('typographic quotes', function() {
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
    describe('Should tokenizes typographic double quotes when', function() {
      it('in a simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo "`double-quoted`" foo').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '"`',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'double-quoted',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '`"',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' foo',
          scopes: ['source.asciidoc']
        });
      });
      return it('has role', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo [bar]"`double-quoted`" foo').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '[bar]',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '"`',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'double-quoted',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '`"',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' foo',
          scopes: ['source.asciidoc']
        });
      });
    });
    return describe('Should tokenizes typographic single quotes when', function() {
      it('in a simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo \'`single-quoted`\' foo').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '\'`',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'single-quoted',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '`\'',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' foo',
          scopes: ['source.asciidoc']
        });
      });
      return it('has role', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo [bar]\'`single-quoted`\' foo').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '[bar]',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '\'`',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'single-quoted',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '`\'',
          scopes: ['source.asciidoc', 'markup.italic.quote.typographic-quotes.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' foo',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvdHlwb2dyYXBoaWMtcXVvdGVzLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTtBQUM3QixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWFBLFFBQUEsQ0FBUyxpREFBVCxFQUE0RCxTQUFBLEdBQUE7QUFFMUQsTUFBQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQiwyQkFBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/typographic-quotes-grammar-spec.coffee
