(function() {
  describe('Source block', function() {
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
      it('is followed by others grammar parts', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[source,shell]\n----\nls -l\ncd ..\n----\n<1> *Grammars* _definition_\n<2> *CoffeeLint* _rules_');
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
          value: '----',
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
          value: '----',
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
      return it('contains substitutions in additional attributes', function() {
        var tokens;
        tokens = grammar.tokenizeLines('[source,java,subs="{markup-in-source}"]\n----\nSystem.out.println("Hello *strong* text").\n----');
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toHaveLength(9);
        expect(tokens[0][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'source',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[0][2]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][3]).toEqualJson({
          value: 'java',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][4]).toEqualJson({
          value: ',',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[0][5]).toEqualJson({
          value: 'subs="',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][6]).toEqualJson({
          value: '{markup-in-source}',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[0][7]).toEqualJson({
          value: '"',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[0][8]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'markup.heading.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '----',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: 'System.out.println("Hello *strong* text").',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc', 'source.embedded.java']
        });
        expect(tokens[3]).toHaveLength(2);
        expect(tokens[3][0]).toEqualJson({
          value: '----',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc']
        });
        return expect(tokens[3][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.code.java.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9zb3VyY2UtYmxvY2stZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsY0FBVCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLEVBQUEsQ0FBRyxxQ0FBSCxFQUEwQyxTQUFBLEdBQUE7QUFDeEMsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0IsaUdBQXRCLENBQVQsQ0FBQTtBQUFBLFFBU0EsTUFBQSxDQUFPLE1B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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/source-block-grammar-spec.coffee
