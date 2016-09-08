(function() {
  describe('Should tokenizes callout in code block when', function() {
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
    return it('contains simple callout', function() {
      var tokens;
      tokens = grammar.tokenizeLines('[source, js]\n----\nvar http = require(\'http\'); <1>\nhttp.createServer(function (req, res) { <2>\n  res.end(\'Hello World\n\'); <3>\n}).listen(1337, \'127.0.0.1\');\n----');
      expect(tokens).toHaveLength(8);
      expect(tokens[0]).toHaveLength(5);
      expect(tokens[0][0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'markup.heading.asciidoc']
      });
      expect(tokens[0][1]).toEqualJson({
        value: 'source',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      expect(tokens[0][2]).toEqualJson({
        value: ',',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'markup.heading.asciidoc', 'punctuation.separator.asciidoc']
      });
      expect(tokens[0][3]).toEqualJson({
        value: ' js',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'markup.heading.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[0][4]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'markup.heading.asciidoc']
      });
      expect(tokens[1]).toHaveLength(1);
      expect(tokens[1][0]).toEqualJson({
        value: '----',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc']
      });
      expect(tokens[2]).toHaveLength(5);
      expect(tokens[2][0]).toEqualJson({
        value: 'var http = require(\'http\');',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js']
      });
      expect(tokens[2][1]).toEqualJson({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc']
      });
      expect(tokens[2][2]).toEqualJson({
        value: '<',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[2][3]).toEqualJson({
        value: '1',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.numeric.asciidoc']
      });
      expect(tokens[2][4]).toEqualJson({
        value: '>',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[3]).toHaveLength(5);
      expect(tokens[3][0]).toEqualJson({
        value: 'http.createServer(function (req, res) {',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js']
      });
      expect(tokens[2][1]).toEqualJson({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc']
      });
      expect(tokens[3][2]).toEqualJson({
        value: '<',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[3][3]).toEqualJson({
        value: '2',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.numeric.asciidoc']
      });
      expect(tokens[3][4]).toEqualJson({
        value: '>',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[4]).toHaveLength(1);
      expect(tokens[4][0]).toEqualJson({
        value: '  res.end(\'Hello World',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js']
      });
      expect(tokens[5]).toHaveLength(5);
      expect(tokens[5][0]).toEqualJson({
        value: '\');',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js']
      });
      expect(tokens[2][1]).toEqualJson({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc']
      });
      expect(tokens[5][2]).toEqualJson({
        value: '<',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[5][3]).toEqualJson({
        value: '3',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.numeric.asciidoc']
      });
      expect(tokens[5][4]).toEqualJson({
        value: '>',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js', 'callout.source.code.asciidoc', 'constant.other.symbol.asciidoc']
      });
      expect(tokens[6]).toHaveLength(1);
      expect(tokens[6][0]).toEqualJson({
        value: '}).listen(1337, \'127.0.0.1\');',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc', 'source.embedded.js']
      });
      expect(tokens[7]).toHaveLength(2);
      expect(tokens[7][0]).toEqualJson({
        value: '----',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc']
      });
      return expect(tokens[7][1]).toEqualJson({
        value: '',
        scopes: ['source.asciidoc', 'markup.code.js.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2Jsb2NrLWNhbGxvdXQtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsNkNBQVQsRUFBd0QsU0FBQSxHQUFBO0FBQ3RELFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtXQWFBLEVBQUEsQ0FBRyx5QkFBSCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0IsOEtBQXRCLENBQVQsQ0FBQTtBQUFBLE1BU0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLFlBQWYsQ0FBNEIsQ0FBNUIsQ0FUQSxDQUFB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/block-callout-grammar-spec.coffee
