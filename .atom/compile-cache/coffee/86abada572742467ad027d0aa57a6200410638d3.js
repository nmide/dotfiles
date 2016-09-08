(function() {
  describe('Comments', function() {
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
    describe('inline comment', function() {
      describe('Should tokenizes when', function() {
        it('double slash following with space', function() {
          var tokens;
          tokens = grammar.tokenizeLine('// a comment').tokens;
          expect(tokens).toHaveLength(1);
          return expect(tokens[0]).toEqualJson({
            value: '// a comment',
            scopes: ['source.asciidoc', 'comment.inline.asciidoc']
          });
        });
        return it('double slash not following with space', function() {
          var tokens;
          tokens = grammar.tokenizeLine('//a comment').tokens;
          expect(tokens).toHaveLength(1);
          return expect(tokens[0]).toEqualJson({
            value: '//a comment',
            scopes: ['source.asciidoc', 'comment.inline.asciidoc']
          });
        });
      });
      return describe('Should not tokenizes when', function() {
        return it('triple slash', function() {
          var tokens;
          tokens = grammar.tokenizeLine('/// a comment').tokens;
          expect(tokens).toHaveLength(1);
          return expect(tokens[0]).toEqualJson({
            value: '/// a comment',
            scopes: ['source.asciidoc']
          });
        });
      });
    });
    return describe('comment block', function() {
      return describe('Should tokenizes when', function() {
        return it('simple block', function() {
          var tokens;
          tokens = grammar.tokenizeLines('////\nA multi-line comment.\n\nNotice it\'s a delimited block.\n////');
          expect(tokens).toHaveLength(5);
          expect(tokens[0]).toHaveLength(1);
          expect(tokens[0][0]).toEqualJson({
            value: '////',
            scopes: ['source.asciidoc', 'comment.block.asciidoc']
          });
          expect(tokens[1]).toHaveLength(1);
          expect(tokens[1][0]).toEqualJson({
            value: 'A multi-line comment.',
            scopes: ['source.asciidoc', 'comment.block.asciidoc']
          });
          expect(tokens[2]).toHaveLength(1);
          expect(tokens[2][0]).toEqualJson({
            value: '',
            scopes: ['source.asciidoc', 'comment.block.asciidoc']
          });
          expect(tokens[3]).toHaveLength(1);
          return expect(tokens[3][0]).toEqualJson({
            value: 'Notice it\'s a delimited block.',
            scopes: ['source.asciidoc', 'comment.block.asciidoc']
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2NvbW1lbnQtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBRXpCLE1BQUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxRQUFBLEVBQUEsQ0FBRyxtQ0FBSCxFQUF3QyxTQUFBLEdBQUE7QUFDdEMsY0FBQSxNQUFBO0FBQUEsVUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFC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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/comment-grammar-spec.coffee
