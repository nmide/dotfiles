(function() {
  describe('Should tokenizes block attribute when', function() {
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
    it('contains many attributes', function() {
      var i, tokens;
      tokens = grammar.tokenizeLine('[foo, aaa, bbb, ccc, ddd, eee]').tokens;
      expect(tokens).toHaveLength(13);
      i = 0;
      expect(tokens[i++]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: 'foo',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' aaa',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' bbb',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' ccc',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' ddd',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' eee',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      return expect(i).toBe(13);
    });
    return it('contains keyword', function() {
      var i, tokens;
      tokens = grammar.tokenizeLine('[appendix, aaa, bbb, ccc, ddd, eee]').tokens;
      expect(tokens).toHaveLength(13);
      i = 0;
      expect(tokens[i++]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: 'appendix',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' aaa',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' bbb',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' ccc',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' ddd',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ' eee',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[i++]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      return expect(i).toBe(13);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2Jsb2NrLWF0dHJpYnV0ZS1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyx1Q0FBVCxFQUFrRCxTQUFBLEdBQUE7QUFDaEQsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxFQUFBLENBQUcsMEJBQUgsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLFVBQUEsU0FBQTtBQUFBLE1BQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixnQ0FBckIsRUFBVixNQUFELENBQUE7QUFBQSxNQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFmLENBQTRCLEVBQTVCLENB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/block-attribute-grammar-spec.coffee
