(function() {
  describe('Characters', function() {
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
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Dungeons &amp; Dragons').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'Dungeons ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '&',
          scopes: ['source.asciidoc', 'markup.character-reference.asciidoc', 'constant.character.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'amp',
          scopes: ['source.asciidoc', 'markup.character-reference.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: ';',
          scopes: ['source.asciidoc', 'markup.character-reference.asciidoc', 'constant.character.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' Dragons',
          scopes: ['source.asciidoc']
        });
      });
      return it('contains space (invalid context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Dungeons &a mp; Dragons').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'Dungeons &a mp; Dragons',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvY2hhcmFjdGVycy1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUEsR0FBQTtBQUNyQixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7V0FhQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO0FBRWhDLE1BQUEsRUFBQSxDQUFHLGdCQUFILEVBQXFCLFNBQUEsR0FBQTtBQUNuQixZQUFBLE1BQUE7QUFBQSxRQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsd0JBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsUUFDQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixDQUE1QixDQURBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsV0FBbEIsQ0FBOEI7QUFBQSxVQUFBLEtBQUEsRUFBTyxXQUFQO0FBQUEsVUFBb0IsTUFBQSxFQUFRLENBQUMsaUJBQUQsQ0FBNUI7U0FBOUIsQ0FGQSxDQUFBO0FBQUEsUUFHQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFdBQWxCLENBQThCO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IscUNBQXBCLEVBQTJELDZCQUEzRCxDQUFwQjtTQUE5QixDQUhBLENBQUE7QUFBQSxRQUlBLE1BQUEsQ0FBTyxNQUFPLENBQUEsQ0FBQSxDQUFkLENBQWlCLENBQUMsV0FBbEIsQ0FBOEI7QUFBQSxVQUFBLEtBQUEsRUFBTyxLQUFQO0FBQUEsVUFBYyxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxFQUFvQixxQ0FBcEIsQ0FBdEI7U0FBOUIsQ0FKQSxDQUFBO0FBQUEsUUFLQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFdBQWxCLENBQThCO0FBQUEsVUFBQSxLQUFBLEVBQU8sR0FBUDtBQUFBLFVBQVksTUFBQSxFQUFRLENBQUMsaUJBQUQsRUFBb0IscUNBQXBCLEVBQTJELDZCQUEzRCxDQUFwQjtTQUE5QixDQUxBLENBQUE7ZUFNQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFdBQWxCLENBQThCO0FBQUEsVUFBQSxLQUFBLEVBQU8sVUFBUDtBQUFBLFVBQW1CLE1BQUEsRUFBUSxDQUFDLGlCQUFELENBQTNCO1NBQTlCLEVBUG1CO01BQUEsQ0FBckIsQ0FBQSxDQUFBO2FBU0EsRUFBQSxDQUFHLGtDQUFILEVBQXVDLFNBQUEsR0FBQTtBQUNyQyxZQUFBLE1BQUE7QUFBQSxRQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIseUJBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsUUFDQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixDQUE1QixDQURBLENBQUE7ZUFFQSxNQUFBLENBQU8sTUFBTyxDQUFBLENBQUEsQ0FBZCxDQUFpQixDQUFDLFdBQWxCLENBQThCO0FBQUEsVUFBQSxLQUFBLEVBQU8seUJBQVA7QUFBQSxVQUFrQyxNQUFBLEVBQVEsQ0FBQyxpQkFBRCxDQUExQztTQUE5QixFQUhxQztNQUFBLENBQXZDLEVBWGdDO0lBQUEsQ0FBbEMsRUFkcUI7RUFBQSxDQUF2QixDQUFBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/characters-grammar-spec.coffee
