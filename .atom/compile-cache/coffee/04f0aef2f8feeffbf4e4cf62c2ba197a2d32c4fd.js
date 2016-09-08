(function() {
  describe('Front matter block', function() {
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
      return it('contains others grammars', function() {
        var tokens;
        tokens = grammar.tokenizeLines('---\ntitle:   "Free Operating Systems: A Comparison and Overview"\ndate:    2016-04-19 +1000\nlayout:  post\n---');
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toHaveLength(1);
        expect(tokens[0][0]).toEqualJson({
          value: '---',
          scopes: ['source.asciidoc', 'markup.block.front-matter.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: 'title:   "Free Operating Systems: A Comparison and Overview"',
          scopes: ['source.asciidoc', 'markup.block.front-matter.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: 'date:    2016-04-19 +1000',
          scopes: ['source.asciidoc', 'markup.block.front-matter.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        expect(tokens[3][0]).toEqualJson({
          value: 'layout:  post',
          scopes: ['source.asciidoc', 'markup.block.front-matter.asciidoc']
        });
        expect(tokens[4]).toHaveLength(1);
        return expect(tokens[4][0]).toEqualJson({
          value: '---',
          scopes: ['source.asciidoc', 'markup.block.front-matter.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9mcm9udC1tYXR0ZXItZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7YUFFaEMsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQUM3QixZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxPQUFPLENBQUMsYUFBUixDQUFzQixrSEFBdEIsQ0FBVCxDQUFBO0FBQUEsUUFPQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixDQUE1QixDQVBBLENBQUE7QUFBQSxRQVFBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FSQSxDQUFBO0FBQUEsUUFTQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEtBQVA7QUFBQSxVQUFjLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLG9DQUFwQixDQUF0QjtTQUFqQyxDQVRBLENBQUE7QUFBQSxRQVVBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FWQSxDQUFBO0FBQUEsUUFXQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLDhEQUFQO0FBQUEsVUFBdUUsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0Isb0NBQXBCLENBQS9FO1NBQWpDLENBWEEsQ0FBQTtBQUFBLFFBWUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxZQUFsQixDQUErQixDQUEvQixDQVpBLENBQUE7QUFBQSxRQWFBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFqQixDQUFvQixDQUFDLFdBQXJCLENBQWlDO0FBQUEsVUFBQSxLQUFBLEVBQU8sMkJBQVA7QUFBQSxVQUFvQyxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQixvQ0FBcEIsQ0FBNUM7U0FBakMsQ0FiQSxDQUFBO0FBQUEsUUFjQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFlBQWxCLENBQStCLENBQS9CLENBZEEsQ0FBQTtBQUFBLFFBZUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQWpCLENBQW9CLENBQUMsV0FBckIsQ0FBaUM7QUFBQSxVQUFBLEtBQUEsRUFBTyxlQUFQO0FBQUEsVUFBd0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0Isb0NBQXBCLENBQWhDO1NBQWpDLENBZkEsQ0FBQTtBQUFBLFFBZ0JBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsWUFBbEIsQ0FBK0IsQ0FBL0IsQ0FoQkEsQ0FBQTtlQWlCQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBakIsQ0FBb0IsQ0FBQyxXQUFyQixDQUFpQztBQUFBLFVBQUEsS0FBQSxFQUFPLEtBQVA7QUFBQSxVQUFjLE1BQUEsRUFBUSxDQUFDLGlCQUFELEVBQW9CLG9DQUFwQixDQUF0QjtTQUFqQyxFQWxCNkI7TUFBQSxDQUEvQixFQUZnQztJQUFBLENBQWxDLEVBZDZCO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/front-matter-grammar-spec.coffee
