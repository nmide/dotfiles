(function() {
  describe('Passthrough macro', function() {
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
      it('as attribute, started at the beginning of the line and without text after.', function() {
        var tokens;
        tokens = grammar.tokenizeLine('pass:q,c[<u>underline *me*</u>]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'pass:',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'q,c',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '<u>underline *me*</u>',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc']
        });
      });
      it('as attribute, in a phrase.', function() {
        var tokens;
        tokens = grammar.tokenizeLine('A pass:o,x[<u>underline *me*</u>] followed by normal content.').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqualJson({
          value: 'A ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'pass:',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'o,x',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '<u>underline *me*</u>',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc']
        });
        return expect(tokens[6]).toEqualJson({
          value: ' followed by normal content.',
          scopes: ['source.asciidoc']
        });
      });
      it('as triple-plus, in a phrase.', function() {
        var tokens;
        tokens = grammar.tokenizeLine('A +++<u>underline *me*</u>+++ followed by normal content.').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'A ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '+++',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'support.constant.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '<u>underline *me*</u>',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '+++',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'support.constant.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' followed by normal content.',
          scopes: ['source.asciidoc']
        });
      });
      return it('as double-dollar, in a phrase.', function() {
        var tokens;
        tokens = grammar.tokenizeLine('A $$<u>underline *me*</u>$$ followed by normal content.').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'A ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '$$',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'support.constant.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '<u>underline *me*</u>',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '$$',
          scopes: ['source.asciidoc', 'markup.macro.inline.passthrough.asciidoc', 'support.constant.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' followed by normal content.',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvcGFzc3Rocm91Z2gtbWFjcm8tZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsbUJBQVQsRUFBOEIsU0FBQSxHQUFBO0FBQzVCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7QUFFaEMsTUFBQSxFQUFBLENBQUcsNEVBQUgsRUFBaUYsU0FBQSxHQUFBO0FBQy9FLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixpQ0FBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEs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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/passthrough-macro-grammar-spec.coffee
