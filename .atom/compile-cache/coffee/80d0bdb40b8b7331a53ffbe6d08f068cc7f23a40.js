(function() {
  describe('Admonition paragraph', function() {
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
      it('start with NOTE:', function() {
        var tokens;
        tokens = grammar.tokenizeLine('NOTE: This is a note').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'NOTE',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: 'This is a note',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
      });
      it('start with NOTE: and have several lines', function() {
        var tokens;
        tokens = grammar.tokenizeLines('foobar\n\nNOTE: An admonition paragraph draws the reader\'s attention to\nauxiliary information.\nIts purpose is *determined* by the label\nat the _beginning_ of the paragraph.\n\nfoobar');
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toHaveLength(1);
        expect(tokens[0][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc']
        });
        expect(tokens[2]).toHaveLength(3);
        expect(tokens[2][0]).toEqualJson({
          value: 'NOTE',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2][1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[2][2]).toEqualJson({
          value: 'An admonition paragraph draws the reader\'s attention to',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        expect(tokens[3][0]).toEqualJson({
          value: 'auxiliary information.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[4]).toHaveLength(5);
        expect(tokens[4][0]).toEqualJson({
          value: 'Its purpose is ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[4][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[4][2]).toEqualJson({
          value: 'determined',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[4][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[4][4]).toEqualJson({
          value: ' by the label',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[5]).toHaveLength(5);
        expect(tokens[5][0]).toEqualJson({
          value: 'at the ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[5][1]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5][2]).toEqualJson({
          value: 'beginning',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[5][3]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5][4]).toEqualJson({
          value: ' of the paragraph.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[6]).toHaveLength(1);
        expect(tokens[6][0]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc']
        });
        expect(tokens[7]).toHaveLength(1);
        return expect(tokens[7][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      it('start with TIP:', function() {
        var tokens;
        tokens = grammar.tokenizeLine('TIP: Pro tip...').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'TIP',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: 'Pro tip...',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
      });
      it('start with IMPORTANT:', function() {
        var tokens;
        tokens = grammar.tokenizeLine('IMPORTANT: Don\'t forget...').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'IMPORTANT',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: 'Don\'t forget...',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
      });
      it('start with WARNING:', function() {
        var tokens;
        tokens = grammar.tokenizeLine('WARNING: Watch out for...').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'WARNING',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: 'Watch out for...',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
      });
      return it('start with CAUTION:', function() {
        var tokens;
        tokens = grammar.tokenizeLine('CAUTION: Ensure that...').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'CAUTION',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ': ',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: 'Ensure that...',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
      });
    });
    return describe('Should not tokenizes when', function() {
      return it('beginning with space', function() {
        var tokens;
        tokens = grammar.tokenizeLine(' CAUTION: Ensure that...').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: ' CAUTION: Ensure that...',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9hZG1vbml0aW9uLXBhcmFncmFwaC1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxzQkFBVCxFQUFpQyxTQUFBLEdBQUE7QUFDL0IsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO0FBRWhDLE1BQUEsRUFBQSxDQUFHLGtCQUFILEVBQXVCLFNBQUEsR0FBQTtBQUNyQixZQUFBLE1BQUE7QUFBQSxRQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsc0JBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsUUFD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/admonition-paragraph-grammar-spec.coffee
