(function() {
  describe('Superscript', function() {
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
      it('simple phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('^superscript^ is good').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'superscript',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' is good',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on ^superscript^ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]^superscript^').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.meta.super.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'superscript',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on ^superscript^ text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]^superscript^').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.meta.super.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'superscript',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '^',
          scopes: ['source.asciidoc', 'markup.superscript.asciidoc', 'markup.super.superscript.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvc3VwZXJzY3JpcHQtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7QUFDdEIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLEVBQUEsQ0FBRyxlQUFILEVBQW9CLFNBQUEsR0FBQTtBQUNsQixZQUFBLE1BQUE7QUFBQSxRQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsdUJBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsUUFDQSxNQUFBLENBQU8sTUFB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/superscript-grammar-spec.coffee
