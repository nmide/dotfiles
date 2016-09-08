(function() {
  describe('Inline attribute-reference', function() {
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
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar {mylink} foobar').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: 'foobar ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '{mylink}',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: ' foobar',
          scopes: ['source.asciidoc']
        });
      });
      it('is an attribute definition `counter`', function() {
        var partIndex, tokens;
        tokens = grammar.tokenizeLine('foobar {counter:pcount:1} foobar').tokens;
        expect(tokens).toHaveLength(9);
        partIndex = 0;
        expect(tokens[partIndex++]).toEqualJson({
          value: 'foobar ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: '{',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: 'counter',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: 'pcount',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'support.constant.attribute-name.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: '1',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'string.unquoted.attribute-value.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: '}',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ' foobar',
          scopes: ['source.asciidoc']
        });
        return expect(partIndex).toBe(9);
      });
      return it('is a an attribute definition `set`', function() {
        var partIndex, tokens;
        tokens = grammar.tokenizeLine('foobar {set:foo:bar} foobar').tokens;
        expect(tokens).toHaveLength(9);
        partIndex = 0;
        expect(tokens[partIndex++]).toEqualJson({
          value: 'foobar ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: '{',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: 'set',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: 'foo',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'support.constant.attribute-name.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ':',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: 'bar',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc', 'string.unquoted.attribute-value.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: '}',
          scopes: ['source.asciidoc', 'markup.substitution.attribute-reference.asciidoc']
        });
        expect(tokens[partIndex++]).toEqualJson({
          value: ' foobar',
          scopes: ['source.asciidoc']
        });
        return expect(partIndex).toBe(9);
      });
    });
    return describe('Should not tokenizes when', function() {
      it('"{" escaped', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar \\\\{mylink} foobar').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foobar \\\\{mylink} foobar',
          scopes: ['source.asciidoc']
        });
      });
      return it('"}" escaped', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foobar {mylink\\\} foobar').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foobar {mylink\\\} foobar',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvYXR0cmlidXRlLXJlZmVyZW5jZS1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyw0QkFBVCxFQUF1QyxTQUFBLEdBQUE7QUFDckMsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO0FBQUEsSUFhQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO0FBRWhDLE1BQUEsRUFBQSxDQUFHLGdCQUFILEVBQXFCLFNBQUEsR0FBQTtBQUNuQixZQUFBLE1BQUE7QUFBQSxRQUFDLFNBQVUsT0FBTyxDQUFDLFlBQVIsQ0FBcUIsd0JBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsUUFD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/attribute-reference-grammar-spec.coffee
