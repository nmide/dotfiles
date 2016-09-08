(function() {
  describe('Image/icon macro', function() {
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
      it('reference a relative path to an image', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo image:filename.png[Alt Text] bar').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'image',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'filename.png',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'Alt Text',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
      it('reference a url to an image', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo image:http://example.com/images/filename.png[Alt Text] bar').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'image',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'http://example.com/images/filename.png',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'Alt Text',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
      return it('reference an icon', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo icon:github[large] bar').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'icon',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'github',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'large',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.image.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvaW1hZ2UtbWFjcm8tZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsa0JBQVQsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLFFBQUEsQ0FBUyx1QkFBVCxFQUFrQyxTQUFBLEdBQUE7QUFFaEMsTUFBQSxFQUFBLENBQUcsdUNBQUgsRUFBNEMsU0FBQSxHQUFBO0FBQzFDLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixzQ0FBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxN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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/image-macro-grammar-spec.coffee
