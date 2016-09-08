(function() {
  describe('Sidebar open block', function() {
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
    describe('Should tokenizes when', function() {
      return it('contains simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[sidebar]\n--\nA multi-line *sidebar*.\n--');
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toHaveLength(3);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'sidebar',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[2]).toHaveLength(5);
        expect(tokens[2][0]).toEqualJson({
          value: 'A multi-line ',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[2][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2][2]).toEqualJson({
          value: 'sidebar',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[2][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2][4]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[3]).toHaveLength(2);
        expect(tokens[3][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        return expect(tokens[3][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
      });
    });
    return describe('Should not tokenizes when', function() {
      return it('beginning with space', function() {
        var tokens;
        tokens = grammar.tokenizeLines(' [sidebar]\n--\nA multi-line *sidebar*.\n--');
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toHaveLength(1);
        expect(tokens[0][0]).toEqualJson({
          value: ' [sidebar]',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc', 'constant.other.symbol.asciidoc']
        });
        expect(tokens[2]).toHaveLength(5);
        expect(tokens[2][0]).toEqualJson({
          value: 'A multi-line ',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc']
        });
        expect(tokens[2][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2][2]).toEqualJson({
          value: 'sidebar',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[2][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2][4]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        return expect(tokens[3][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.block.open.asciidoc', 'constant.other.symbol.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9zaWRlYmFyLW9wZW4tYmxvY2stZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtBQUFBLElBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTthQUVoQyxFQUFBLENBQUcsd0JBQUgsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxhQUFSLENBQXNCLDRDQUF0QixDQUFULENBQUE7QUFBQSxRQU9BLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFmLENBQTRCLENBQTVCLENBUEEsQ0FBQTtBQUFBLFFBUUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQVJBLENBQUE7QUFBQSxRQVNBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXBCO1NBQWpDLENBVEEsQ0FBQTtBQUFBLFFBVUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxTQUFQO0FBQUEsVUFBa0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLEVBQXFELHFDQUFyRCxFQUE0RiwrQkFBNUYsQ0FBMUI7U0FBakMsQ0FWQSxDQUFBO0FBQUEsUUFXQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFwQjtTQUFqQyxDQVhBLENBQUE7QUFBQSxRQVlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FaQSxDQUFBO0FBQUEsUUFhQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLElBQVA7QUFBQSxVQUFhLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFyQjtTQUFqQyxDQWJBLENBQUE7QUFBQSxRQWNBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FkQSxDQUFBO0FBQUEsUUFlQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLGVBQVA7QUFBQSxVQUF3QixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBaEM7U0FBakMsQ0FmQSxDQUFBO0FBQUEsUUFnQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsRUFBcUQsb0NBQXJELEVBQTJGLHNCQUEzRixFQUFtSCxpQ0FBbkgsQ0FBcEI7U0FBakMsQ0FoQkEsQ0FBQTtBQUFBLFFBaUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sU0FBUDtBQUFBLFVBQWtCLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixFQUFxRCxvQ0FBckQsRUFBMkYsc0JBQTNGLENBQTFCO1NBQWpDLENBakJBLENBQUE7QUFBQSxRQWtCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixFQUFxRCxvQ0FBckQsRUFBMkYsc0JBQTNGLEVBQW1ILGlDQUFuSCxDQUFwQjtTQUFqQyxDQWxCQSxDQUFBO0FBQUEsUUFtQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBcEI7U0FBakMsQ0FuQkEsQ0FBQTtBQUFBLFFBb0JBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FwQkEsQ0FBQTtBQUFBLFFBcUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFVBQWEsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXJCO1NBQWpDLENBckJBLENBQUE7ZUFzQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxFQUFQO0FBQUEsVUFBVyxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBbkI7U0FBakMsRUF2QjJCO01BQUEsQ0FBN0IsRUFGZ0M7SUFBQSxDQUFsQyxDQWJBLENBQUE7V0F3Q0EsUUFBQSxDQUFTLDJCQUFULEVBQXNDLFNBQUEsR0FBQTthQUVwQyxFQUFBLENBQUcsc0JBQUgsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxhQUFSLENBQXNCLDZDQUF0QixDQUFULENBQUE7QUFBQSxRQU9BLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFmLENBQTRCLENBQTVCLENBUEEsQ0FBQTtBQUFBLFFBUUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQVJBLENBQUE7QUFBQSxRQVNBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sWUFBUDtBQUFBLFVBQXFCLE1BQUEsRUFBUSxDQUFDLGlCQUFELENBQTdCO1NBQWpDLENBVEEsQ0FBQTtBQUFBLFFBVUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQVZBLENBQUE7QUFBQSxRQVdBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFVBQWEsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsNEJBQXBCLEVBQWtELGdDQUFsRCxDQUFyQjtTQUFqQyxDQVhBLENBQUE7QUFBQSxRQVlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FaQSxDQUFBO0FBQUEsUUFhQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLGVBQVA7QUFBQSxVQUF3QixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiw0QkFBcEIsQ0FBaEM7U0FBakMsQ0FiQSxDQUFBO0FBQUEsUUFjQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLDRCQUFwQixFQUFrRCxvQ0FBbEQsRUFBd0Ysc0JBQXhGLEVBQWdILGlDQUFoSCxDQUFwQjtTQUFqQyxDQWRBLENBQUE7QUFBQSxRQWVBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sU0FBUDtBQUFBLFVBQWtCLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLDRCQUFwQixFQUFrRCxvQ0FBbEQsRUFBd0Ysc0JBQXhGLENBQTFCO1NBQWpDLENBZkEsQ0FBQTtBQUFBLFFBZ0JBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsNEJBQXBCLEVBQWtELG9DQUFsRCxFQUF3RixzQkFBeEYsRUFBZ0gsaUNBQWhILENBQXBCO1NBQWpDLENBaEJBLENBQUE7QUFBQSxRQWlCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLDRCQUFwQixDQUFwQjtTQUFqQyxDQWpCQSxDQUFBO0FBQUEsUUFrQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQWxCQSxDQUFBO2VBbUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFVBQWEsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsNEJBQXBCLEVBQWtELGdDQUFsRCxDQUFyQjtTQUFqQyxFQXBCeUI7TUFBQSxDQUEzQixFQUZvQztJQUFBLENBQXRDLEVBekM2QjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/sidebar-open-block-grammar-spec.coffee
