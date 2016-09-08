(function() {
  describe('Passthrough open block', function() {
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
      return it('contains simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[pass]\n--\n<s>Could be struck through</s>\n--\nfoobar');
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toHaveLength(3);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'pass',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: '<s>Could be struck through</s>',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc']
        });
        expect(tokens[3]).toHaveLength(2);
        expect(tokens[3][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc']
        });
        expect(tokens[3][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.block.passthrough.asciidoc']
        });
        expect(tokens[4]).toHaveLength(1);
        return expect(tokens[4][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9wYXNzdGhyb3VnaC1vcGVuLWJsb2NrLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLHdCQUFULEVBQW1DLFNBQUEsR0FBQTtBQUNqQyxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7V0FhQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO2FBRWhDLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0Isd0RBQXRCLENBQVQsQ0FBQTtBQUFBLFFBT0EsTUFBQSxD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/passthrough-open-block-grammar-spec.coffee
