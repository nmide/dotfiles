(function() {
  describe('Should tokenize todo lists', function() {
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
    it('when todo', function() {
      var tokens;
      tokens = grammar.tokenizeLine('- [ ] todo 1').tokens;
      expect(tokens).toHaveLength(4);
      expect(tokens[0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[2]).toEqual({
        value: '[ ]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      return expect(tokens[3]).toEqual({
        value: ' todo 1',
        scopes: ['source.asciidoc']
      });
    });
    it('when [*] done', function() {
      var tokens;
      tokens = grammar.tokenizeLine('- [*] todo 1').tokens;
      expect(tokens).toHaveLength(4);
      expect(tokens[0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[2]).toEqual({
        value: '[*]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      return expect(tokens[3]).toEqual({
        value: ' todo 1',
        scopes: ['source.asciidoc']
      });
    });
    it('when [x] done', function() {
      var tokens;
      tokens = grammar.tokenizeLine('- [x] todo 1').tokens;
      expect(tokens).toHaveLength(4);
      expect(tokens[0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[2]).toEqual({
        value: '[x]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      return expect(tokens[3]).toEqual({
        value: ' todo 1',
        scopes: ['source.asciidoc']
      });
    });
    return it('when a varied todo-list', function() {
      var tokens;
      tokens = grammar.tokenizeLines('- [ ] todo 1\n- normal item\n - [x] done x\n- [*] done *');
      expect(tokens).toHaveLength(4);
      expect(tokens[0]).toHaveLength(4);
      expect(tokens[0][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[0][1]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[0][2]).toEqual({
        value: '[ ]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      expect(tokens[0][3]).toEqual({
        value: ' todo 1',
        scopes: ['source.asciidoc']
      });
      expect(tokens[1]).toHaveLength(2);
      expect(tokens[1][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[1][1]).toEqual({
        value: ' normal item',
        scopes: ['source.asciidoc']
      });
      expect(tokens[2]).toHaveLength(5);
      expect(tokens[2][0]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[2][1]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[2][2]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[2][3]).toEqual({
        value: '[x]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      expect(tokens[2][4]).toEqual({
        value: ' done x',
        scopes: ['source.asciidoc']
      });
      expect(tokens[3]).toHaveLength(4);
      expect(tokens[3][0]).toEqual({
        value: '-',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.list.bullet.asciidoc']
      });
      expect(tokens[3][1]).toEqual({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc']
      });
      expect(tokens[3][2]).toEqual({
        value: '[*]',
        scopes: ['source.asciidoc', 'markup.todo.asciidoc', 'markup.todo.box.asciidoc']
      });
      return expect(tokens[3][3]).toEqual({
        value: ' done *',
        scopes: ['source.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL3RvZG8tbGlzdC1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyw0QkFBVCxFQUF1QyxTQUFBLEdBQUE7QUFDckMsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxFQUFBLENBQUcsV0FBSCxFQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLE1BQUE7QUFBQSxNQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsY0FBckIsRUFBVixNQUFELENBQUE7QUFBQSxNQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFmLENBQTRCLENBQTVCLENBREEsQ0FBQTtB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/todo-list-grammar-spec.coffee