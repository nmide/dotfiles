(function() {
  describe('Titles', function() {
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
    describe('asciidoc headers', function() {
      var asciidocHeadersChecker;
      asciidocHeadersChecker = function(level) {
        var equalsSigns, marker, tokens;
        equalsSigns = level + 1;
        marker = Array(equalsSigns + 1).join('=');
        tokens = grammar.tokenizeLine("" + marker + " Heading " + level).tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: "" + marker,
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc", 'markup.heading.marker.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: " ",
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc", 'markup.heading.space.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: "Heading " + level,
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc"]
        });
      };
      return it('tokenizes AsciiDoc-style headings', function() {
        var level, _i, _results;
        _results = [];
        for (level = _i = 0; _i <= 5; level = ++_i) {
          _results.push(asciidocHeadersChecker(level));
        }
        return _results;
      });
    });
    return describe('markdown headers', function() {
      var markdownHeadersChecker;
      markdownHeadersChecker = function(level) {
        var equalsSigns, marker, tokens;
        equalsSigns = level + 1;
        marker = Array(equalsSigns + 1).join('#');
        tokens = grammar.tokenizeLine("" + marker + " Heading " + level).tokens;
        expect(tokens).toHaveLength(3);
        expect(tokens[0]).toEqualJson({
          value: "" + marker,
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc", 'markup.heading.marker.asciidoc']
        });
        expect(tokens[1]).toEqualJson({
          value: " ",
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc", 'markup.heading.space.asciidoc']
        });
        return expect(tokens[2]).toEqualJson({
          value: "Heading " + level,
          scopes: ['source.asciidoc', "markup.heading.heading-" + level + ".asciidoc"]
        });
      };
      return it('tokenizes Markdown-style headings', function() {
        var level, _i, _results;
        _results = [];
        for (level = _i = 0; _i <= 5; level = ++_i) {
          _results.push(markdownHeadersChecker(level));
        }
        return _results;
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3BhcnRpYWxzL3RpdGxlcy1ncmFtbWFyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBRUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxRQUFULEVBQW1CLFNBQUEsR0FBQTtBQUNqQixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWFBLFFBQUEsQ0FBUyxrQkFBVCxFQUE2QixTQUFBLEdBQUE7QUFFM0IsVUFBQSxzQkFBQTtBQUFBLE1BQUEsc0JBQUEsR0FBeUIsU0FBQyxLQUFELEdBQUE7QUFDdkIsWUFBQSwyQkFBQTtBQUFBLFFBQUEsV0FBQSxHQUFjLEtBQUEsR0FBUSxDQUF0QixDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsS0FBQSxD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/partials/titles-grammar-spec.coffee
