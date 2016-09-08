(function() {
  describe('Should tokenizes block attribute for explicit paragraph when', function() {
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
    it('use "normal" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[normal]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'normal',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "literal" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[literal]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.block.literal.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'literal',
        scopes: ['source.asciidoc', 'markup.block.literal.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.block.literal.asciidoc']
      });
    });
    it('use "listing" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[listing]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.block.listing.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'listing',
        scopes: ['source.asciidoc', 'markup.block.listing.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.block.listing.asciidoc']
      });
    });
    it('use "TIP" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[TIP]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'TIP',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
    });
    it('use "NOTE" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[NOTE]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'NOTE',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
    });
    it('use "IMPORTANT" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[IMPORTANT]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'IMPORTANT',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
    });
    it('use "WARNING" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[WARNING]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'WARNING',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
    });
    it('use "CAUTION" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[CAUTION]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'CAUTION',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
      });
    });
    it('use "partintro" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[partintro]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'partintro',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "comment" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[comment]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'comment.block.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'comment',
        scopes: ['source.asciidoc', 'comment.block.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'comment.block.asciidoc']
      });
    });
    it('use "example" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[example]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'example',
        scopes: ['source.asciidoc', 'markup.block.example.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
      });
    });
    it('use "sidebar" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[sidebar]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'sidebar',
        scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.block.sidebar.asciidoc']
      });
    });
    it('use "source" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[source]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'source',
        scopes: ['source.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.asciidoc']
      });
    });
    it('use "music" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[music]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'music',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "latex" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[latex]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'latex',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    return it('use "graphviz" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[graphviz]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'graphviz',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2Jsb2NrLWF0dHJpYnV0ZS1leHBsaWNpdC1wYXJhZ3JhcGgtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsOERBQVQsRUFBeUUsU0FBQSxHQUFBO0FBQ3ZFLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtBQUFBLElBYUEsRUFBQSxDQUFHLHNCQUFILEVBQTJCLFNBQUEsR0FBQTtBQUN6QixVQUFBLE1BQUE7QUFBQSxNQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsVUFBckIsRUFBVixNQUFELENBQUE7QUFBQSxNQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZ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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/block-attribute-explicit-paragraph-grammar-spec.coffee
