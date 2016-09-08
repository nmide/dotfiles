(function() {
  describe('Should tokenizes block attribute for section title when', function() {
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
    it('use "abstract" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[abstract]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'abstract',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "preface" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[preface]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'preface',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "colophon" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[colophon]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'colophon',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "dedication" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[dedication]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'dedication',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "glossary" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[glossary]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'glossary',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "bibliography" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[bibliography]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'bibliography',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "synopsis" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[synopsis]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'synopsis',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "appendix" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[appendix]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'appendix',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "index" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[index]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'index',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "sect1" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[sect1]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'sect1',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "sect2" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[sect2]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'sect2',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "sect3" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[sect3]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'sect3',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    it('use "sect4" keyword', function() {
      var tokens;
      tokens = grammar.tokenizeLine('[sect4]').tokens;
      expect(tokens).toHaveLength(3);
      expect(tokens[0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toEqualJson({
        value: 'sect4',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      return expect(tokens[2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
    });
    return it('simple section with text', function() {
      var tokens;
      tokens = grammar.tokenizeLines('[sect1]\nThis is an section.');
      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toHaveLength(3);
      expect(tokens[0][0]).toEqualJson({
        value: '[',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[0][1]).toEqualJson({
        value: 'sect1',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
      });
      expect(tokens[0][2]).toEqualJson({
        value: ']',
        scopes: ['source.asciidoc', 'markup.heading.block-attribute.asciidoc']
      });
      expect(tokens[1]).toHaveLength(1);
      return expect(tokens[1][0]).toEqualJson({
        value: 'This is an section.',
        scopes: ['source.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL2Jsb2NrLWF0dHJpYnV0ZS1zZWN0aW9uLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLHlEQUFULEVBQW9FLFNBQUEsR0FBQTtBQUNsRSxRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWFBLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsVUFBQSxNQUFBO0FBQUEsTUFBQyxTQUFVLE9BQU8sQ0FBQyxZQUFSLENBQXFCLFlBQXJCLEVBQVYsTUFBRCxDQUFBO0FBQUEsTUFDQSxNQUFBLENBQU8sTUFBUCxDQUFjLENBQUMsWUFBZixDQUE0QixD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/block-attribute-section-grammar-spec.coffee
