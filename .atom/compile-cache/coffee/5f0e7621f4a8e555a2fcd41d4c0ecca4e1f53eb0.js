(function() {
  describe('Source open block', function() {
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
      return it('is followed by others grammar parts', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[source,shell]\n--\nls -l\ncd ..\n--\n<1> *Grammars* _definition_\n<2> *CoffeeLint* _rules_');
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toHaveLength(5);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'source',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'markup.heading.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][3]).toEqualJson({
          value: 'shell',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: 'ls -l',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'source.embedded.shell']
        });
        expect(tokens[3]).toHaveLength(1);
        expect(tokens[3][0]).toEqualJson({
          value: 'cd ..',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc', 'source.embedded.shell']
        });
        expect(tokens[4]).toHaveLength(2);
        expect(tokens[4][0]).toEqualJson({
          value: '--',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc']
        });
        expect(tokens[4][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.code.shell.asciidoc']
        });
        expect(tokens[5]).toHaveLength(11);
        expect(tokens[5][0]).toEqualJson({
          value: '<',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.other.symbol.asciidoc']
        });
        expect(tokens[5][1]).toEqualJson({
          value: '1',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.numeric.asciidoc']
        });
        expect(tokens[5][2]).toEqualJson({
          value: '>',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.other.symbol.asciidoc']
        });
        expect(tokens[5][3]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'callout.asciidoc']
        });
        expect(tokens[5][4]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5][5]).toEqualJson({
          value: 'Grammars',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[5][6]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5][7]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'callout.asciidoc']
        });
        expect(tokens[5][8]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5][9]).toEqualJson({
          value: 'definition',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        expect(tokens[5][10]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5]).toHaveLength(11);
        expect(tokens[6][0]).toEqualJson({
          value: '<',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.other.symbol.asciidoc']
        });
        expect(tokens[6][1]).toEqualJson({
          value: '2',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.numeric.asciidoc']
        });
        expect(tokens[6][2]).toEqualJson({
          value: '>',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'constant.other.symbol.asciidoc']
        });
        expect(tokens[6][3]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'callout.asciidoc']
        });
        expect(tokens[6][4]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6][5]).toEqualJson({
          value: 'CoffeeLint',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[6][6]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6][7]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'callout.asciidoc']
        });
        expect(tokens[6][8]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6][9]).toEqualJson({
          value: 'rules',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc']
        });
        return expect(tokens[6][10]).toEqualJson({
          value: '_',
          scopes: ['source.asciidoc', 'callout.asciidoc', 'markup.emphasis.constrained.asciidoc', 'markup.italic.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9zb3VyY2Utb3Blbi1ibG9jay1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxtQkFBVCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTthQUVoQyxFQUFBLENBQUcscUNBQUgsRUFBMEMsU0FBQSxHQUFBO0FBQ3hDLFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxhQUFSLENBQXNCLDZGQUF0QixDQUFULENBQUE7QUFBQSxRQVNBLE1BQUEsQ0FBTyxN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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/source-open-block-grammar-spec.coffee
