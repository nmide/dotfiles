(function() {
  describe('Quotes with Markdown style', function() {
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
      it('include inlines element', function() {
        var tokens;
        tokens = grammar.tokenizeLines('> I\'ve got Markdown in my AsciiDoc!\n>\n> *strong*\n> Yep. AsciiDoc and Markdown share a lot of common syntax already.');
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toHaveLength(2);
        expect(tokens[0][0]).toEqualJson({
          value: '> ',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[0][1]).toEqualJson({
          value: 'I\'ve got Markdown in my AsciiDoc!',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[1]).toHaveLength(1);
        expect(tokens[1][0]).toEqualJson({
          value: '>',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[2]).toHaveLength(4);
        expect(tokens[2][0]).toEqualJson({
          value: '> ',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[2][1]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2][2]).toEqualJson({
          value: 'strong',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc']
        });
        expect(tokens[2][3]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc', 'markup.strong.constrained.asciidoc', 'markup.bold.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        return expect(tokens[3][0]).toEqualJson({
          value: '> Yep. AsciiDoc and Markdown share a lot of common syntax already.',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
      });
      return it('contains multi-lines', function() {
        var tokens;
        tokens = grammar.tokenizeLines('foobar\n> I don\'t like it, and I\'m sorry I ever had anything to do with it.\n> Erwin Schrödinger, Sorry\nfoobar foobar\nfoobar\n\nfoobar');
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toHaveLength(1);
        expect(tokens[0][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toHaveLength(2);
        expect(tokens[1][0]).toEqualJson({
          value: '> ',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[1][1]).toEqualJson({
          value: 'I don\'t like it, and I\'m sorry I ever had anything to do with it.',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[2]).toHaveLength(1);
        expect(tokens[2][0]).toEqualJson({
          value: '> Erwin Schrödinger, Sorry',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[3]).toHaveLength(1);
        expect(tokens[3][0]).toEqualJson({
          value: 'foobar foobar',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[4]).toHaveLength(1);
        expect(tokens[4][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.italic.quotes.asciidoc']
        });
        expect(tokens[5]).toHaveLength(1);
        expect(tokens[5][0]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc']
        });
        expect(tokens[6]).toHaveLength(1);
        return expect(tokens[6][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9xdW90ZS1tYXJrZG93bi1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyw0QkFBVCxFQUF1QyxTQUFBLEdBQUE7QUFDckMsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLEVBQUEsQ0FBRyx5QkFBSCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0IseUhBQXRCLENBQVQsQ0FBQTtBQUFBLFFBTUEsTUFBQSxDQUFP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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/quote-markdown-grammar-spec.coffee
