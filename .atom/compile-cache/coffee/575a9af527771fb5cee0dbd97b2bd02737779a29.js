(function() {
  describe('`monospace`', function() {
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
    describe('Should tokenizes constrained `monospace` when', function() {
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('`Text in backticks` renders exactly as entered, in `monospace`.').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'Text in backticks',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: ' renders exactly as entered, in ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'monospace',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc']
        });
      });
      it('is not in valid context', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Text in back`ticks` renders exactly as entered, in mono`spaced`.').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'Text in back`ticks` renders exactly as entered, in mono`spaced`.',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on constrained `monospace` text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]`monospace`').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'monospace',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on constrained `monospace` text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]`monospace`').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'monospace',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '`',
          scopes: ['source.asciidoc', 'markup.monospace.constrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
    return describe('Should tokenizes unconstrained `monospace` when', function() {
      it('is in a phrase', function() {
        var tokens;
        tokens = grammar.tokenizeLine('Text in back``ticks`` renders exactly as entered, in mono``space``.').tokens;
        expect(tokens).toHaveLength(9);
        expect(tokens[0]).toEqualJson({
          value: 'Text in back',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'ticks',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: ' renders exactly as entered, in mono',
          scopes: ['source.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: 'space',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        expect(tokens[7]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[8]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on unconstrained ``monospace`` text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]``monospace``').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'monospace',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on unconstrained ``monospace`` text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]``monospace``').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'monospace',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '``',
          scopes: ['source.asciidoc', 'markup.monospace.unconstrained.asciidoc', 'markup.raw.monospace.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvbW9ub3NwYWNlLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLGFBQVQsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBU0EsRUFBQSxDQUFHLG9CQUFILEVBQXlCLFNBQUEsR0FBQTtBQUN2QixNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxXQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLGlCQUEvQixFQUZ1QjtJQUFBLENBQXpCLENBVEEsQ0FBQTtBQUFBLElBYUEsUUFBQSxDQUFTLCtDQUFULEVBQTBELFNBQUEsR0FBQTtBQUV4RCxNQUFBLEVBQUEsQ0FBRyxnQkFBSCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsWUFBQSxNQUFBO0FBQUEsUUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLGlFQUFyQixFQUFWLE1BQUQsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxDQUFP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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/monospace-grammar-spec.coffee
