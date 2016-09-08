(function() {
  describe('_emphasis_ text', function() {
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
    describe('Should tokenizes constrained _emphasis_ text when', function() {
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is _emphasis_ text').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'this is ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' text',
          scopes: ['source.asciidoc']
        });
      });
      it('contains text with underscores', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is _emphasis_text_ with underscores').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'this is ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis_text',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' with underscores',
          scopes: ['source.asciidoc']
        });
      });
      it('have text at the beginning of the line', function() {
        var tokens;
        tokens = grammar.tokenizeLine('_emphasis text_ from the start.').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'emphasis text',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' from the start.',
          scopes: ['source.asciidoc']
        });
      });
      it('have text in a * bulleted list', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* _emphasis text_ followed by normal text').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'emphasis text',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' followed by normal text',
          scopes: ['source.asciidoc']
        });
      });
      it('tokenizes constrained _emphasis_ text within special characters', function() {
        var tokens;
        tokens = grammar.tokenizeLine('a_non-emphasis_a, !_emphasis_?, \'_emphasis_:, ._emphasis_; ,_emphasis_').tokens;
        expect(tokens).toHaveLength(16);
        expect(tokens[0]).toEqualJson({
          value: 'a_non-emphasis_a, !',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '?, \'',
          scopes: ['source.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[7]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[8]).toEqualJson({
          value: ':, .',
          scopes: ['source.asciidoc']
        });
        expect(tokens[9]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[10]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[11]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[12]).toEqualJson({
          value: '; ,',
          scopes: ['source.asciidoc']
        });
        expect(tokens[13]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[14]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[15]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when having a [role] set on constrained _emphasis_ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]_emphasis_').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on constrained _emphasis_ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]_emphasis_').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
    return describe('Should tokenizes unconstrained __emphasis__ text when', function() {
      it('__emphasis__ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is__emphasis__text').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'this is',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: 'text',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on unconstrained __emphasis__ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]__emphasis__').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on unconstrained _emphasis__ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]__emphasis__').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'emphasis',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '__',
          scopes: ['source.asciidoc', 'markup.emphasis.unconstrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvZW1waGFzaXMtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsaUJBQVQsRUFBNEIsU0FBQSxHQUFBO0FBQzFCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtBQUFBLElBYUEsUUFBQSxDQUFTLG1EQUFULEVBQThELFNBQUEsR0FBQTtBQUU1RCxNQUFBLEVBQUEsQ0FBRyxnQkFBSCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsWUFBQSxNQUFBO0FBQUEsUUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLHlCQUFyQixFQUFWLE1BQUQsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFP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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/emphasis-grammar-spec.coffee
