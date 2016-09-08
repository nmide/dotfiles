(function() {
  describe('Air quotes', function() {
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
      it('contains simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[quote, Erwin Schrödinger, Sorry]\n""\nI don\'t like it, and I\'m sorry I ever had anything to do with it.\n""\nfoobar');
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toHaveLength(7);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'quote',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][3]).toEqualJson({
          value: ' Erwin Schrödinger',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][4]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][5]).toEqualJson({
          value: ' Sorry',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][6]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '""',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: 'I don\'t like it, and I\'m sorry I ever had anything to do with it.',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[3]).toHaveLength(2);
        expect(tokens[3][0]).toEqualJson({
          value: '""',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[3][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[4]).toHaveLength(1);
        return expect(tokens[4][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      return it('contains simple phrase and missing block name', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[, Erwin Schrödinger, Sorry]\n""\nI don\'t like it, and I\'m sorry I ever had anything to do with it.\n""\nfoobar');
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toHaveLength(6);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ' Erwin Schrödinger',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][3]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][4]).toEqualJson({
          value: ' Sorry',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '""',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: 'I don\'t like it, and I\'m sorry I ever had anything to do with it.',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        expect(tokens[3][0]).toEqualJson({
          value: '""',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9xdW90ZS1haXItYmxvY2stZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0Isd0hBQXRCLENBQVQsQ0FBQTtBQUFBLFFBT0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQWYsQ0FBNEIsQ0FBNUIsQ0FQQSxDQUFBO0FBQUEsUUFRQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBUkEsQ0FBQTtBQUFBLFFBU0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBcEI7U0FBakMsQ0FUQSxDQUFBO0FBQUEsUUFVQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLE9BQVA7QUFBQSxVQUFnQixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsRUFBcUQscUNBQXJELEVBQTRGLCtCQUE1RixDQUF4QjtTQUFqQyxDQVZBLENBQUE7QUFBQSxRQVdBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLEVBQXFELGdDQUFyRCxDQUFwQjtTQUFqQyxDQVhBLENBQUE7QUFBQSxRQVlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sb0JBQVA7QUFBQSxVQUE2QixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsRUFBcUQscUNBQXJELENBQXJDO1NBQWpDLENBWkEsQ0FBQTtBQUFBLFFBYUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsRUFBcUQsZ0NBQXJELENBQXBCO1NBQWpDLENBYkEsQ0FBQTtBQUFBLFFBY0EsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxRQUFQO0FBQUEsVUFBaUIsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLEVBQXFELHFDQUFyRCxDQUF6QjtTQUFqQyxDQWRBLENBQUE7QUFBQSxRQWVBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXBCO1NBQWpDLENBZkEsQ0FBQTtBQUFBLFFBZ0JBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FoQkEsQ0FBQTtBQUFBLFFBaUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFVBQWEsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXJCO1NBQWpDLENBakJBLENBQUE7QUFBQSxRQWtCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBbEJBLENBQUE7QUFBQSxRQW1CQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLHFFQUFQO0FBQUEsVUFBOEUsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IsK0JBQXBCLENBQXRGO1NBQWpDLENBbkJBLENBQUE7QUFBQSxRQW9CQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBcEJBLENBQUE7QUFBQSxRQXFCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLElBQVA7QUFBQSxVQUFhLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFyQjtTQUFqQyxDQXJCQSxDQUFBO0FBQUEsUUFzQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxFQUFQO0FBQUEsVUFBVyxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBbkI7U0FBakMsQ0F0QkEsQ0FBQTtBQUFBLFFBdUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0F2QkEsQ0FBQTtlQXdCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLFFBQVA7QUFBQSxVQUFpQixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxDQUF6QjtTQUFqQyxFQXpCMkI7TUFBQSxDQUE3QixDQUFBLENBQUE7YUEyQkEsRUFBQSxDQUFHLCtDQUFILEVBQW9ELFNBQUEsR0FBQTtBQUNsRCxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsYUFBUixDQUFzQixtSEFBdEIsQ0FBVCxDQUFBO0FBQUEsUUFPQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixDQUE1QixDQVBBLENBQUE7QUFBQSxRQVFBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FSQSxDQUFBO0FBQUEsUUFTQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxVQUFZLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLHlDQUFwQixDQUFwQjtTQUFqQyxDQVRBLENBQUE7QUFBQSxRQVVBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IseUNBQXBCLEVBQStELGdDQUEvRCxDQUFwQjtTQUFqQyxDQVZBLENBQUE7QUFBQSxRQVdBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sb0JBQVA7QUFBQSxVQUE2QixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQix5Q0FBcEIsRUFBK0QscUNBQS9ELENBQXJDO1NBQWpDLENBWEEsQ0FBQTtBQUFBLFFBWUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsVUFBWSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQix5Q0FBcEIsRUFBK0QsZ0NBQS9ELENBQXBCO1NBQWpDLENBWkEsQ0FBQTtBQUFBLFFBYUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxRQUFQO0FBQUEsVUFBaUIsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IseUNBQXBCLEVBQStELHFDQUEvRCxDQUF6QjtTQUFqQyxDQWJBLENBQUE7QUFBQSxRQWNBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IseUNBQXBCLENBQXBCO1NBQWpDLENBZEEsQ0FBQTtBQUFBLFFBZUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQWZBLENBQUE7QUFBQSxRQWdCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLElBQVA7QUFBQSxVQUFhLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUFyQjtTQUFqQyxDQWhCQSxDQUFBO0FBQUEsUUFpQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQWpCQSxDQUFBO0FBQUEsUUFrQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxxRUFBUDtBQUFBLFVBQThFLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLCtCQUFwQixDQUF0RjtTQUFqQyxDQWxCQSxDQUFBO0FBQUEsUUFtQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQW5CQSxDQUFBO0FBQUEsUUFvQkEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxJQUFQO0FBQUEsVUFBYSxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQiwrQkFBcEIsQ0FBckI7U0FBakMsQ0FwQkEsQ0FBQTtBQUFBLFFBcUJBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FyQkEsQ0FBQTtlQXNCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLFFBQVA7QUFBQSxVQUFpQixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxDQUF6QjtTQUFqQyxFQXZCa0Q7TUFBQSxDQUFwRCxFQTdCZ0M7SUFBQSxDQUFsQyxFQWRxQjtFQUFBLENBQXZCLENBQUEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/quote-air-block-grammar-spec.coffee
