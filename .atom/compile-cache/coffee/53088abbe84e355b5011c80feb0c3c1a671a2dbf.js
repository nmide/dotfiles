(function() {
  describe('Sidebar inline paragraph', function() {
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
        tokens = grammar.tokenizeLines('[sidebar]\nA multi-line *sidebar*.');
        expect(tokens).toHaveLength(2);
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
        expect(tokens[1]).toHaveLength(5);
        expect(tokens[1][0]).toEqualJson({
          value: 'A multi-line ',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
        expect(tokens[1][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1][2]).toEqualJson({
          value: 'sidebar',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[1][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[1][4]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
        });
      });
    });
    return describe('Should not tokenizes when', function() {
      return it('beginning with space', function() {
        var tokens;
        tokens = grammar.tokenizeLines(' [sidebar]\nA multi-line *sidebar*.');
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toHaveLength(1);
        expect(tokens[0][0]).toEqualJson({
          value: ' [sidebar]',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toHaveLength(5);
        expect(tokens[1][0]).toEqualJson({
          value: 'A multi-line ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1][2]).toEqualJson({
          value: 'sidebar',
          scopes: ['source.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[1][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[1][4]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9zaWRlYmFyLWlubGluZS1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUywwQkFBVCxFQUFxQyxTQUFBLEdBQUE7QUFDbkMsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO2FBRWhDLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0Isb0NBQXRCLENBQVQsQ0FBQTtBQUFBLFFBS0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQWYsQ0FBNEIsQ0FBNUIsQ0FMQSxDQUFBO0FBQUEsUUFNQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBTkEsQ0FBQTtBQUFBLFFBT0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBcEI7U0FBakMsQ0FQQSxDQUFBO0FBQUEsUUFRQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLFNBQVA7QUFBQSxVQUFrQixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsRUFBcUQscUNBQXJELEVBQTRGLCtCQUE1RixDQUExQjtTQUFqQyxDQVJBLENBQUE7QUFBQSxRQVNBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXBCO1NBQWpDLENBVEEsQ0FBQTtBQUFBLFFBVUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQVZBLENBQUE7QUFBQSxRQVdBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sZUFBUDtBQUFBLFVBQXdCLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFoQztTQUFqQyxDQVhBLENBQUE7QUFBQSxRQVlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLEVBQXFELG9DQUFyRCxFQUEyRixzQkFBM0YsRUFBbUgsaUNBQW5ILENBQXBCO1NBQWpDLENBWkEsQ0FBQTtBQUFBLFFBYUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxTQUFQO0FBQUEsVUFBa0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLEVBQXFELG9DQUFyRCxFQUEyRixzQkFBM0YsQ0FBMUI7U0FBakMsQ0FiQSxDQUFBO0FBQUEsUUFjQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixFQUFxRCxvQ0FBckQsRUFBMkYsc0JBQTNGLEVBQW1ILGlDQUFuSCxDQUFwQjtTQUFqQyxDQWRBLENBQUE7ZUFlQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFwQjtTQUFqQyxFQWhCMkI7TUFBQSxDQUE3QixFQUZnQztJQUFBLENBQWxDLENBYkEsQ0FBQTtXQWlDQSxRQUFBLENBQVMsMkJBQVQsRUFBc0MsU0FBQSxHQUFBO2FBRXBDLEVBQUEsQ0FBRyxzQkFBSCxFQUEyQixTQUFBLEdBQUE7QUFDekIsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0IscUNBQXRCLENBQVQsQ0FBQTtBQUFBLFFBS0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQWYsQ0FBNEIsQ0FBNUIsQ0FMQSxDQUFBO0FBQUEsUUFNQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBTkEsQ0FBQTtBQUFBLFFBT0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxZQUFQO0FBQUEsVUFBcUIsTUFBQSxFQUFRLENBQUMsaUJBQUQsQ0FBN0I7U0FBakMsQ0FQQSxDQUFBO0FBQUEsUUFRQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBUkEsQ0FBQTtBQUFBLFFBU0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxlQUFQO0FBQUEsVUFBd0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsQ0FBaEM7U0FBakMsQ0FUQSxDQUFBO0FBQUEsUUFVQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLG9DQUFwQixFQUEwRCxzQkFBMUQsRUFBa0YsaUNBQWxGLENBQXBCO1NBQWpDLENBVkEsQ0FBQTtBQUFBLFFBV0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxTQUFQO0FBQUEsVUFBa0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0Isb0NBQXBCLEVBQTBELHNCQUExRCxDQUExQjtTQUFqQyxDQVhBLENBQUE7QUFBQSxRQVlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0Isb0NBQXBCLEVBQTBELHNCQUExRCxFQUFrRixpQ0FBbEYsQ0FBcEI7U0FBakMsQ0FaQSxDQUFBO2VBYUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxDQUFwQjtTQUFqQyxFQWR5QjtNQUFBLENBQTNCLEVBRm9DO0lBQUEsQ0FBdEMsRUFsQ21DO0VBQUEsQ0FBckMsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/sidebar-inline-grammar-spec.coffee
