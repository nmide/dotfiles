(function() {
  describe('mark text', function() {
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
    describe('Should tokenizes constrained mark text', function() {
      it('when constrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is #mark# text').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'this is ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' text',
          scopes: ['source.asciidoc']
        });
      });
      it('when constrained mark at the beginning of the line', function() {
        var tokens;
        tokens = grammar.tokenizeLine('#mark text# from the start.').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'mark text',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: ' from the start.',
          scopes: ['source.asciidoc']
        });
      });
      it('when constrained mark is escaped', function() {
        var tokens;
        tokens = grammar.tokenizeLine('\\#mark text#').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: '\\#mark text#',
          scopes: ['source.asciidoc']
        });
      });
      it('when constrained mark in a *bulleted list', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* #mark text# followed by normal text').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'mark text',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' followed by normal text',
          scopes: ['source.asciidoc']
        });
      });
      it('when constrained mark text within special characters', function() {
        var tokens;
        tokens = grammar.tokenizeLine('a#non-mark#a, !#mark#?, \'#mark#:, .#mark#; ,#mark#').tokens;
        expect(tokens).toHaveLength(16);
        expect(tokens[0]).toEqualJson({
          value: 'a#non-mark#a, !',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '?, \'',
          scopes: ['source.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[7]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[8]).toEqualJson({
          value: ':, .',
          scopes: ['source.asciidoc']
        });
        expect(tokens[9]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[10]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[11]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[12]).toEqualJson({
          value: '; ,',
          scopes: ['source.asciidoc']
        });
        expect(tokens[13]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[14]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        return expect(tokens[15]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when text is "this is \\#mark\\# text"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is #mark# text').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'this is ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ' text',
          scopes: ['source.asciidoc']
        });
      });
      it('when text is "* text\\#"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* text#').tokens;
        expect(tokens).toHaveLength(2);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        return expect(tokens[1]).toEqualJson({
          value: ' text#',
          scopes: ['source.asciidoc']
        });
      });
      it('when text is "\\#mark text\\#"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('#mark text#').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'mark text',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when text is "\\#mark\\#text\\#"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('#mark#text#').tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'mark#text',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when text is "\\#mark\\# text \\#mark\\# text"', function() {
        var tokens;
        tokens = grammar.tokenizeLine('#mark# text #mark# text').tokens;
        expect(tokens).toHaveLength(8);
        expect(tokens[0]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: ' text ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[5]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[6]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[7]).toEqualJson({
          value: ' text',
          scopes: ['source.asciidoc']
        });
      });
      it('when text is "* \\#mark\\# text" (list context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* #mark# text').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ' text',
          scopes: ['source.asciidoc']
        });
      });
      it('when text is "* \\#mark\\#" (list context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('* #mark#').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: ' ',
          scopes: ['source.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when having a [role] set on constrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]#mark#').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on constrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]#mark#').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '#',
          scopes: ['source.asciidoc', 'markup.mark.constrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
    return describe('Should tokenizes unconstrained math text', function() {
      it('when unconstrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is##mark##text').tokens;
        expect(tokens[0]).toEqualJson({
          value: 'this is',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: 'text',
          scopes: ['source.asciidoc']
        });
      });
      it('when unconstrained mark text with asterisks', function() {
        var tokens;
        tokens = grammar.tokenizeLine('this is##mark#text##').tokens;
        expect(tokens[0]).toEqualJson({
          value: 'this is',
          scopes: ['source.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark#text',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.highlight.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      it('when unconstrained mark is double escaped', function() {
        var tokens;
        tokens = grammar.tokenizeLine('\\\\##mark text##').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: '\\\\##mark text##',
          scopes: ['source.asciidoc']
        });
      });
      it('when having a [role] set on unconstrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role]##mark##').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role]',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
      return it('when having [role1 role2] set on unconstrained mark text', function() {
        var tokens;
        tokens = grammar.tokenizeLine('[role1 role2]##mark##').tokens;
        expect(tokens).toHaveLength(4);
        expect(tokens[0]).toEqualJson({
          value: '[role1 role2]',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.meta.attribute-list.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'mark',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc']
        });
        return expect(tokens[3]).toEqualJson({
          value: '##',
          scopes: ['source.asciidoc', 'markup.mark.unconstrained.asciidoc', 'markup.mark.asciidoc', 'punctuation.definition.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvbWFyay1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxXQUFULEVBQXNCLFNBQUEsR0FBQTtBQUNwQixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLFFBQUEsQ0FBUyx3Q0FBVCxFQUFtRCxTQUFBLEdBQUE7QUFFakQsTUFBQSxFQUFBLENBQUcsNEJBQUgsRUFBaUMsU0FBQSxHQUFBO0FBQy9CLFlBQUEsTUFBQTtBQUFBLFFBQUMsU0FBVSxPQUFPLENBQUMsWUFBUixDQUFxQixxQkFBckIsRUFBVixNQUFELENBQUE7QUFBQSxRQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxZQUFmLENBQTRCLENBQTVCLENBREEsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLE1BQU8sQ0FBQSxDQUFBLENBQWQsQ0FBaUIsQ0FBQyxXQUFsQixDQUE4QjtBQUFBLFVBQUEsS0FBQSxFQUFPLFVBQVA7QUFBQSxVQUFtQixNQUFBLEVBQVEsQ0FBQyxpQkFBRCxDQUEzQjtTQUE5QixDQUZBLENBQUE7QUFBQSxR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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/mark-grammar-spec.coffee
