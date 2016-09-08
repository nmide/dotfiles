(function() {
  describe('Should tokenizes text link when', function() {
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
    describe('URL pattern', function() {
      it('is a simple url with http', function() {
        var tokens;
        tokens = grammar.tokenizeLine('http://www.docbook.org/[DocBook.org]').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'http://www.docbook.org/',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'DocBook.org',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('is a simple url with http in phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on http://foobar.com now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'Go on',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'http://foobar.com',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple url with https', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on https://foobar.com now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'Go on',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'https://foobar.com',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple url with file', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on file://foobar.txt now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'Go on',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'file://foobar.txt',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple url with ftp', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on ftp://foobar.txt now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'Go on',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'ftp://foobar.txt',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple url with irc', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on irc://foobar now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'Go on',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'irc://foobar',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple url in a bullet list', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* https://foobar.com now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'https://foobar.com',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      return it('contains attribute reference', function() {
        var tokens;
        tokens = grammar.tokenizeLine('http://foo{uri-repo}bar.com now').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'http://foo',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'bar.com',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
    });
    describe('"link:" & "mailto:" macro', function() {
      it('have optional link text and attributes', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on link:url[optional link text, optional target attribute, optional role attribute] now').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: 'Go on ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'link',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'url',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'optional link text, optional target attribute, optional role attribute',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('is a simple mailto', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on mailto:doc.writer@example.com[] now').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'Go on ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'mailto',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'doc.writer@example.com',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '[]',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      it('contains attribute reference', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on link:http://{uri-repo}[label] now').tokens;
        expect(tokens).toHaveLength(9);
        expect(tokens[0]).toEqualJson({
          value: 'Go on ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'link',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'http://',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.link.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: 'label',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[7]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        return expect(tokens[8]).toEqualJson({
          value: ' now',
          scopes: ['source.asciidoc']
        });
      });
      return it('is a simple url with https started with "link:" with missing square brackets ending (invalid context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Go on link:https://foobar.com now').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'Go on link:https://foobar.com now',
          scopes: ['source.asciidoc']
        });
      });
    });
    describe('email pattern', function() {
      return it('is a email', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo doc.writer@example.com bar').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'doc.writer@example.com',
          scopes: ['source.asciidoc', 'markup.link.email.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
    });
    return describe('pure attribute reference link', function() {
      it('start at the beginning of the line', function() {
        var tokens;
        tokens = grammar.tokenizeLine('{uri-repo}[Asciidoctor]').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('start with "["', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[{uri-repo}[Asciidoctor]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('start with "("', function() {
        var tokens;
        tokens = grammar.tokenizeLine('({uri-repo}[Asciidoctor]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: '(',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('start with "<"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('<{uri-repo}[Asciidoctor]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: '<',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('start with ">"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('>{uri-repo}[Asciidoctor]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: '>',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
      });
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo {uri-repo}[Asciidoctor] bar').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqualJson({
          value: 'foo',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '{uri-repo}',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: 'Asciidoctor',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.other.url.asciidoc']
        });
        return expect(tokens[6]).toEqualJson({
          value: ' bar',
          scopes: ['source.asciidoc']
        });
      });
      return it('attribute reference doesn\'t contains "uri-" (invalid context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo {foo}[bar] bar').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'foo ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{foo}',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: '[bar] bar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvbGluay1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxpQ0FBVCxFQUE0QyxTQUFBLEdBQUE7QUFDMUMsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxRQUFBLENBQVMsYUFBVCxFQUF3QixTQUFBLEdBQUE7QUFFdEIsTUFBQSxFQUFBLENBQUcsMkJBQUgsRUFBZ0MsU0FBQSxHQUFBO0FBQzlCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixzQ0FBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxNQUFQ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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/link-grammar-spec.coffee
