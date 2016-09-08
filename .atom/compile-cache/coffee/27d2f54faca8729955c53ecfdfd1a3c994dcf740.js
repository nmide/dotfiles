(function() {
  describe('Attributes', function() {
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
      describe('single-line', function() {
        it('simple attributes not following with text', function() {
          var tokens;
          tokens = grammar.tokenizeLine(':sectanchors:').tokens;
          expect(tokens).toHaveLength(3);
          expect(tokens[0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          expect(tokens[1]).toEqualJson({
            value: 'sectanchors',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          return expect(tokens[2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
        });
        it('following with text', function() {
          var tokens;
          tokens = grammar.tokenizeLine(':icons: font').tokens;
          expect(tokens).toHaveLength(4);
          expect(tokens[0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          expect(tokens[1]).toEqualJson({
            value: 'icons',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          expect(tokens[2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          return expect(tokens[3]).toEqualJson({
            value: ' font',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
        });
        it('contains negate', function() {
          var tokens;
          tokens = grammar.tokenizeLine(':!compat-mode:').tokens;
          expect(tokens).toHaveLength(3);
          expect(tokens[0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          expect(tokens[1]).toEqualJson({
            value: '!compat-mode',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          return expect(tokens[2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
        });
        return it('contains an URL', function() {
          var tokens;
          tokens = grammar.tokenizeLine(':homepage: http://asciidoctor.org').tokens;
          expect(tokens).toHaveLength(5);
          expect(tokens[0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          expect(tokens[1]).toEqualJson({
            value: 'homepage',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          expect(tokens[2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.asciidoc']
          });
          expect(tokens[3]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          return expect(tokens[4]).toEqualJson({
            value: 'http://asciidoctor.org',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
          });
        });
      });
      return describe('multi-lines', function() {
        it('contains link', function() {
          var tokens;
          tokens = grammar.tokenizeLines(':description: foo bar +\n  foo link:http://asciidoctor.org[AsciiDoctor] bar +\n  text and text');
          expect(tokens).toHaveLength(3);
          expect(tokens[0]).toHaveLength(6);
          expect(tokens[0][0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][1]).toEqualJson({
            value: 'description',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          expect(tokens[0][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][3]).toEqualJson({
            value: ' foo bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][4]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][5]).toEqualJson({
            value: '+',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'variable.line-break.asciidoc']
          });
          expect(tokens[1]).toHaveLength(10);
          expect(tokens[1][0]).toEqualJson({
            value: '  foo ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][1]).toEqualJson({
            value: 'link',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
          });
          expect(tokens[1][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][3]).toEqualJson({
            value: 'http://asciidoctor.org',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
          });
          expect(tokens[1][4]).toEqualJson({
            value: '[',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][5]).toEqualJson({
            value: 'AsciiDoctor',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
          });
          expect(tokens[1][6]).toEqualJson({
            value: ']',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][7]).toEqualJson({
            value: ' bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][8]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][9]).toEqualJson({
            value: '+',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'variable.line-break.asciidoc']
          });
          expect(tokens[2]).toHaveLength(1);
          return expect(tokens[2][0]).toEqualJson({
            value: '  text and text',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
        });
        it('contains line-break backslash', function() {
          var tokens;
          tokens = grammar.tokenizeLines(':description: foo bar \\\n  foo link:http://asciidoctor.org[AsciiDoctor] bar \\\n  text and text');
          expect(tokens).toHaveLength(3);
          expect(tokens[0]).toHaveLength(6);
          expect(tokens[0][0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][1]).toEqualJson({
            value: 'description',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          expect(tokens[0][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][3]).toEqualJson({
            value: ' foo bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][4]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][5]).toEqualJson({
            value: '\\',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'variable.line-break.asciidoc']
          });
          expect(tokens[1]).toHaveLength(10);
          expect(tokens[1][0]).toEqualJson({
            value: '  foo ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][1]).toEqualJson({
            value: 'link',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
          });
          expect(tokens[1][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][3]).toEqualJson({
            value: 'http://asciidoctor.org',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
          });
          expect(tokens[1][4]).toEqualJson({
            value: '[',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][5]).toEqualJson({
            value: 'AsciiDoctor',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
          });
          expect(tokens[1][6]).toEqualJson({
            value: ']',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][7]).toEqualJson({
            value: ' bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][8]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][9]).toEqualJson({
            value: '\\',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'variable.line-break.asciidoc']
          });
          expect(tokens[2]).toHaveLength(1);
          return expect(tokens[2][0]).toEqualJson({
            value: '  text and text',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
        });
        return it('contains hard-break backslash', function() {
          var tokens;
          tokens = grammar.tokenizeLines(':description: foo bar + \\\n  foo link:http://asciidoctor.org[AsciiDoctor] bar + \\\n  text and text');
          expect(tokens).toHaveLength(3);
          expect(tokens[0]).toHaveLength(6);
          expect(tokens[0][0]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][1]).toEqualJson({
            value: 'description',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'support.constant.attribute-name.asciidoc']
          });
          expect(tokens[0][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'punctuation.separator.attribute-entry.asciidoc']
          });
          expect(tokens[0][3]).toEqualJson({
            value: ' foo bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][4]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[0][5]).toEqualJson({
            value: '+ \\',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'constant.other.symbol.hard-break.asciidoc']
          });
          expect(tokens[1]).toHaveLength(10);
          expect(tokens[1][0]).toEqualJson({
            value: '  foo ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][1]).toEqualJson({
            value: 'link',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
          });
          expect(tokens[1][2]).toEqualJson({
            value: ':',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][3]).toEqualJson({
            value: 'http://asciidoctor.org',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
          });
          expect(tokens[1][4]).toEqualJson({
            value: '[',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][5]).toEqualJson({
            value: 'AsciiDoctor',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
          });
          expect(tokens[1][6]).toEqualJson({
            value: ']',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'markup.other.url.asciidoc']
          });
          expect(tokens[1][7]).toEqualJson({
            value: ' bar',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][8]).toEqualJson({
            value: ' ',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
          expect(tokens[1][9]).toEqualJson({
            value: '+ \\',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc', 'constant.other.symbol.hard-break.asciidoc']
          });
          expect(tokens[2]).toHaveLength(1);
          return expect(tokens[2][0]).toEqualJson({
            value: '  text and text',
            scopes: ['source.asciidoc', 'meta.definition.attribute-entry.asciidoc', 'string.unquoted.attribute-value.asciidoc']
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2F0dHJpYnV0ZXMtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsWUFBVCxFQUF1QixTQUFBLEdBQUE7QUFDckIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLFFBQUEsQ0FBUyxhQUFULEVBQXdCLFNBQUEsR0FBQTtBQUV0QixRQUFBLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBLEdBQUE7QUFDOUMsY0FBQSxNQUFBO0FBQUEsVUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLGVB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/attributes-grammar-spec.coffee
