(function() {
  describe('Should tokenizes unordered list bullets when', function() {
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
    it('use asterisks', function() {
      var tokens;
      tokens = grammar.tokenizeLines('* Level 1\n** Level 2\n*** Level 3\n**** Level 4\n***** Level 5');
      expect(tokens).toHaveLength(5);
      expect(tokens[0]).toHaveLength(2);
      expect(tokens[0][0]).toEqual({
        value: '*',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[0][1]).toEqual({
        value: ' Level 1',
        scopes: ['source.asciidoc']
      });
      expect(tokens[1]).toHaveLength(2);
      expect(tokens[1][0]).toEqual({
        value: '**',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1][1]).toEqual({
        value: ' Level 2',
        scopes: ['source.asciidoc']
      });
      expect(tokens[2]).toHaveLength(2);
      expect(tokens[2][0]).toEqual({
        value: '***',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[2][1]).toEqual({
        value: ' Level 3',
        scopes: ['source.asciidoc']
      });
      expect(tokens[3]).toHaveLength(2);
      expect(tokens[3][0]).toEqual({
        value: '****',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[3][1]).toEqual({
        value: ' Level 4',
        scopes: ['source.asciidoc']
      });
      expect(tokens[4]).toHaveLength(2);
      expect(tokens[4][0]).toEqual({
        value: '*****',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      return expect(tokens[4][1]).toEqual({
        value: ' Level 5',
        scopes: ['source.asciidoc']
      });
    });
    it('use hyphen', function() {
      var tokens;
      tokens = grammar.tokenizeLines('- foobar\n- foobar foobar\n- foobar foobar foobar');
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toHaveLength(2);
      expect(tokens[0][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[0][1]).toEqual({
        value: ' foobar',
        scopes: ['source.asciidoc']
      });
      expect(tokens[1]).toHaveLength(2);
      expect(tokens[0][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1][1]).toEqual({
        value: ' foobar foobar',
        scopes: ['source.asciidoc']
      });
      expect(tokens[2]).toHaveLength(2);
      expect(tokens[0][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      return expect(tokens[2][1]).toEqual({
        value: ' foobar foobar foobar',
        scopes: ['source.asciidoc']
      });
    });
    return it('use hyphen with several levels (invalid context)', function() {
      var tokens;
      tokens = grammar.tokenizeLines('- foobar\n-- foobar\n--- foobar');
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toHaveLength(2);
      expect(tokens[0][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[0][1]).toEqual({
        value: ' foobar',
        scopes: ['source.asciidoc']
      });
      expect(tokens[1]).toHaveLength(1);
      expect(tokens[1][0]).toEqual({
        value: '-- foobar',
        scopes: ['source.asciidoc']
      });
      expect(tokens[2]).toHaveLength(1);
      return expect(tokens[2][0]).toEqual({
        value: '--- foobar',
        scopes: ['source.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2xpc3QtdW5vcmRlcmVkLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLDhDQUFULEVBQXlELFNBQUEsR0FBQTtBQUN2RCxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWFBLEVBQUEsQ0FBRyxlQUFILEVBQW9CLFNBQUEsR0FBQTtBQUNsQixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsYUFBUixDQUFzQixpRUFBdEIsQ0FBVCxDQUFBO0FBQUEsTUFPQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixDQUE1QixDQVBB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/list-unordered-grammar-spec.coffee