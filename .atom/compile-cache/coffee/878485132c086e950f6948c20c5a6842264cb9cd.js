(function() {
  describe('Properties grammar', function() {
    var debug, grammar;
    grammar = null;
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-asciidoc');
      });
      return runs(function() {
        return grammar = atom.grammars.grammarForScopeName('source.asciidoc.properties');
      });
    });
    debug = function(tokens) {
      return console.log(JSON.stringify(tokens, null, ' '));
    };
    it('load the "properties" config grammar', function() {
      expect(grammar).toBeTruthy();
      return expect(grammar.scopeName).toBe('source.asciidoc.properties');
    });
    describe('Should parse "section" when', function() {
      it('was a simple word', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[foobar]').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqual({
          value: '[',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: 'foobar',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.asciidoc.properties']
        });
        return expect(tokens[2]).toEqual({
          value: ']',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
      });
      it('have a subsection separate by a dot', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[foo.bar]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqual({
          value: '[',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: 'foo',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: '.',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: 'bar',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.subsection.asciidoc.properties']
        });
        return expect(tokens[4]).toEqual({
          value: ']',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
      });
      return it('have a subsection with double-quote', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[foo "bar"]').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqual({
          value: '[',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: 'foo',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: '"',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.subsection.asciidoc.properties', 'punctuation.definition.section.subsection.begin.asciidoc.properties']
        });
        expect(tokens[4]).toEqual({
          value: 'bar',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.subsection.asciidoc.properties']
        });
        expect(tokens[5]).toEqual({
          value: '"',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties', 'entity.name.section.subsection.asciidoc.properties', 'punctuation.definition.section.subsection.end.asciidoc.properties']
        });
        return expect(tokens[6]).toEqual({
          value: ']',
          scopes: ['source.asciidoc.properties', 'meta.section.asciidoc.properties']
        });
      });
    });
    describe('Should parse "comment" when', function() {
      it('start by a hash', function() {
        var tokens;
        tokens = grammar.tokenizeLine('# comment').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqual({
          value: '#',
          scopes: ['source.asciidoc.properties', 'comment.line.number-sign.asciidoc.properties', 'punctuation.definition.comment.asciidoc.properties']
        });
        return expect(tokens[1]).toEqual({
          value: ' comment',
          scopes: ['source.asciidoc.properties', 'comment.line.number-sign.asciidoc.properties']
        });
      });
      return it('start by a ;', function() {
        var tokens;
        tokens = grammar.tokenizeLine('; comment').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqual({
          value: ';',
          scopes: ['source.asciidoc.properties', 'comment.line.number-sign.asciidoc.properties', 'punctuation.definition.comment.asciidoc.properties']
        });
        return expect(tokens[1]).toEqual({
          value: ' comment',
          scopes: ['source.asciidoc.properties', 'comment.line.number-sign.asciidoc.properties']
        });
      });
    });
    return describe('Should parse "value pair" when', function() {
      it('have a simple value', function() {
        var tokens;
        tokens = grammar.tokenizeLine('name = foobar').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqual({
          value: 'name',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.definition.entity.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: '=',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.separator.key-value.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        return expect(tokens[4]).toEqual({
          value: 'foobar',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
      });
      it('have a value embedded in double quote', function() {
        var tokens;
        tokens = grammar.tokenizeLine('name = "foobar"').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqual({
          value: 'name',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.definition.entity.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: '=',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.separator.key-value.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[4]).toEqual({
          value: '"',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'string.quoted.double.asciidoc.properties', 'punctuation.definition.string.begin.asciidoc.properties']
        });
        expect(tokens[5]).toEqual({
          value: 'foobar',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'string.quoted.double.asciidoc.properties']
        });
        return expect(tokens[6]).toEqual({
          value: '"',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'string.quoted.double.asciidoc.properties', 'punctuation.definition.string.end.asciidoc.properties']
        });
      });
      it('have a boolean value', function() {
        var tokens;
        tokens = grammar.tokenizeLine('name = true').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqual({
          value: 'name',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.definition.entity.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: '=',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.separator.key-value.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        return expect(tokens[4]).toEqual({
          value: 'true',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'constant.language.boolean.asciidoc.properties']
        });
      });
      return it('have a value contains escaped double quote', function() {
        var tokens;
        tokens = grammar.tokenizeLine('name = \\"foobar\\"').tokens;
        expect(tokens).toHaveLength(7);
        expect(tokens[0]).toEqual({
          value: 'name',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.definition.entity.asciidoc.properties']
        });
        expect(tokens[1]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[2]).toEqual({
          value: '=',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'punctuation.separator.key-value.asciidoc.properties']
        });
        expect(tokens[3]).toEqual({
          value: ' ',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        expect(tokens[4]).toEqual({
          value: '\\"',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'constant.character.escape.asciidoc.properties']
        });
        expect(tokens[5]).toEqual({
          value: 'foobar',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties']
        });
        return expect(tokens[6]).toEqual({
          value: '\\"',
          scopes: ['source.asciidoc.properties', 'meta.value-pair.section-item.asciidoc.properties', 'constant.character.escape.asciidoc.properties']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2xhbmd1YWdlLXByb3BlcnRpZXMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTtBQUM3QixRQUFBLGNBQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLDRCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVVBLEtBQUEsR0FBUSxTQUFDLE1BQUQsR0FBQTthQUNOLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLEVBQXVCLElBQXZCLEVBQTZCLEdBQTdCLENBQVosRUFETTtJQUFBLENBVlIsQ0FBQTtBQUFBLElBYUEsRUFBQSxDQUFHLHNDQUFILEVBQTJDLFNBQUEsR0FBQTtBQUN6QyxNQUFBLE1BQUEsQ0FBTyxPQUFQLENBQWUsQ0FBQyxVQUFoQixDQUFBLENBQUEsQ0FBQTthQUNBLE1BQUEsQ0FBTyxPQUFPLENBQUMsU0FBZixDQUF5QixDQUFDLElBQTFCLENBQStCLDRCQUEvQixFQUZ5QztJQUFBLENBQTNDLENBYkEsQ0FBQTtBQUFBLElBaUJBLFFBQUEsQ0FBUyw2QkFBVCxFQUF3QyxTQUFBLEdBQUE7QUFDdEMs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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/language-properties-spec.coffee
