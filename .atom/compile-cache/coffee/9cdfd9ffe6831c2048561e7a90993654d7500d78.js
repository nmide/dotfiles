(function() {
  describe('General block macro', function() {
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
      it('reference a gist', function() {
        var tokens;
        tokens = grammar.tokenizeLine('gist::123456[]').tokens;
        expect(tokens).toHaveLength(5);
        expect(tokens[0]).toEqualJson({
          value: 'gist',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: '123456',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        return expect(tokens[4]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
      });
      it('reference an image', function() {
        var tokens;
        tokens = grammar.tokenizeLine('image::filename.png[Caption]').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'image',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'filename.png',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: 'Caption',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
      });
      it('reference a video', function() {
        var tokens;
        tokens = grammar.tokenizeLine('video::http://youtube.com/12345[Cats vs Dogs]').tokens;
        expect(tokens).toHaveLength(6);
        expect(tokens[0]).toEqualJson({
          value: 'video',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: '::',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[2]).toEqualJson({
          value: 'http://youtube.com/12345',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'markup.link.asciidoc']
        });
        expect(tokens[3]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
        expect(tokens[4]).toEqualJson({
          value: 'Cats vs Dogs',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'string.unquoted.asciidoc']
        });
        return expect(tokens[5]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.macro.block.general.asciidoc', 'punctuation.separator.asciidoc']
        });
      });
      return it('not at the line beginning (invalid context)', function() {
        var tokens;
        tokens = grammar.tokenizeLine('foo image::filename.png[Caption]').tokens;
        expect(tokens).toHaveLength(1);
        return expect(tokens[0]).toEqualJson({
          value: 'foo image::filename.png[Caption]',
          scopes: ['source.asciidoc']
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2lubGluZXMvZ2VuZXJhbC1ibG9jay1tYWNyby1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxxQkFBVCxFQUFnQyxTQUFBLEdBQUE7QUFDOUIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBVixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixtQkFBOUIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQUdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7ZUFDSCxPQUFBLEdBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBZCxDQUFrQyxpQkFBbEMsRUFEUDtNQUFBLENBQUwsRUFKUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFTQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FUQSxDQUFBO1dBYUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUVoQyxNQUFBLEVBQUEsQ0FBRyxrQkFBSCxFQUF1QixTQUFBLEdBQUE7QUFDckIsWUFBQSxNQUFBO0FBQUEsUUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLGdCQUFyQixFQUFWLE1BQUQsQ0FBQTtBQUFBLFFBQ0EsTUFB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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/inlines/general-block-macro-grammar-spec.coffee
