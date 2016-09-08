(function() {
  describe('Stem macro', function() {
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
    return describe('Should tokenizes stem macro when', function() {
      it('contains stem', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo stem:[x != 0] bar').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'stem',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'x != 0',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
      it('contains asciimath', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo asciimath:[x != 0] bar').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'asciimath',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'x != 0',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
      return it('contains latexmath', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo latexmath:[\\sqrt{4} = 2] bar').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'latexmath',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':[',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '\\sqrt{4} = 2',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.inline.stem.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvc3RlbS1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUEsR0FBQTtBQUNyQixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7V0FhQSxRQUFBLENBQVMsa0NBQVQsRUFBNkMsU0FBQSxHQUFBO0FBRTNDLE1BQUEsRUFBQSxDQUFHLGVBQUgsRUFBb0IsU0FBQSxHQUFBO0FBQ2xCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQix1QkFBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMs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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/stem-grammar-spec.coffee
