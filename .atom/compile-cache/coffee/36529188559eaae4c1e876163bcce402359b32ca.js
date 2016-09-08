(function() {
  describe('Labeled list', function() {
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
    describe('Should tokenizes labeled list when', function() {
      it('line ending with ::', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar::').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[1]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
      });
      it('line ending with :::', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar:::').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[1]).toEqualJson({
          value: ':::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
      });
      it('line ending with ::::', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar::::').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[1]).toEqualJson({
          value: '::::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
      });
      it('line ending with ;;', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar;;').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[1]).toEqualJson({
          value: ';;',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
      });
      it('contains :: following by text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar:: foobar').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      it('contains ::: following by text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar::: foobar').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ':::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      it('contains :::: following by textcontains :: following by text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar:::: foobar').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '::::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      it('contains ;; following by text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar;; foobar').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ';;',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
      });
      return it('contains attribute reference and url', function() {
        var tokenIndex, tokens;
        tokens = grammar.tokenizeLine('{uri-asciidoctorjs-npm}[asciidoctor.js]:: the main npm package for Asciidoctor.js').tokens;
        expect(tokens).toHaveLength(7);
        tokenIndex = 0;
        expect(tokens[tokenIndex++]).toEqualJson({
          value: '{uri-asciidoctorjs-npm}',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.other.url.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: 'asciidoctor.js',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.other.url.asciidoc', 'string.unquoted.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.other.url.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc', 'markup.heading.list.asciidoc']
        });
        expect(tokens[tokenIndex++]).toEqualJson({
          value: 'the main npm package for Asciidoctor.js',
          scopes: ['source.asciidoc']
        });
        return expect(tokenIndex).toBe(7);
      });
    });
    return describe('Should not tokenize when', function() {
      it('title ending with space', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar ::').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foobar ::',
          scopes: ['source.asciidoc']
        });
      });
      it('contains only one :', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar:').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foobar:',
          scopes: ['source.asciidoc']
        });
      });
      return it('following by test without space', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar:foobar').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foobar:foobar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2xpc3QtbGFiZWxlZC1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWFBLFFBQUEsQ0FBUyxvQ0FBVCxFQUErQyxTQUFBLEdBQUE7QUFFN0MsTUFBQSxFQUFBLENBQUcscUJBQUgsRUFBMEIsU0FBQSxHQUFBO0FBQ3hCLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixVQUFyQixFQUFWLE1BQUQsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/list-labeled-grammar-spec.coffee
