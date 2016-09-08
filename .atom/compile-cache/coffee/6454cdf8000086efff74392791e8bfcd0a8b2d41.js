(function() {
  describe('Admonition block', function() {
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
      return it('contains section title and bulleted list', function() {
        var numLine, tokens;
        tokens = grammar.tokenizeLines('[IMPORTANT]\n.Feeding the Werewolves\n====\nWhile werewolves are hardy community members, keep in mind the following dietary concerns:\n\n* They are allergic to cinnamon.\n* More than two glasses of orange juice in 24 hours makes them howl in harmony with alarms and sirens.\n* Celery makes them sad.\n====\nfoobar');
        expect(tokens).toHaveLength(10);
        numLine = 0;
        expect(tokens[numLine]).toHaveLength(3);
        expect(tokens[numLine][0]).toEqualJson({
          value: '[',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: 'IMPORTANT',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.meta.attribute-list.asciidoc', 'entity.name.function.asciidoc']
        });
        expect(tokens[numLine][2]).toEqualJson({
          value: ']',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: 'Feeding the Werewolves',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.heading.blocktitle.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: '====',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: 'While werewolves are hardy community members, keep in mind the following dietary concerns:',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: ' They are allergic to cinnamon.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: ' More than two glasses of orange juice in 24 hours makes them howl in harmony with alarms and sirens.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '*',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc', 'markup.list.asciidoc', 'markup.list.bullet.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: ' Celery makes them sad.',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '====',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: '',
          scopes: ['source.asciidoc', 'markup.admonition.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
        numLine++;
        return expect(numLine).toBe(10);
      });
    });
    return describe('Should not tokenizes when', function() {
      return it('beginning with space', function() {
        var numLine, tokens;
        tokens = grammar.tokenizeLines(' [IMPORTANT]\n.Feeding the Werewolves\n====\nWhile werewolves are hardy community members, keep in mind the following dietary concerns:\n...\n====\nfoobar');
        expect(tokens).toHaveLength(7);
        numLine = 0;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: ' [IMPORTANT]',
          scopes: ['source.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(2);
        expect(tokens[numLine][0]).toEqualJson({
          value: '.',
          scopes: ['source.asciidoc']
        });
        expect(tokens[numLine][1]).toEqualJson({
          value: 'Feeding the Werewolves',
          scopes: ['source.asciidoc', 'markup.heading.blocktitle.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: '====',
          scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: 'While werewolves are hardy community members, keep in mind the following dietary concerns:',
          scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: '...',
          scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: '====',
          scopes: ['source.asciidoc', 'markup.block.example.asciidoc']
        });
        numLine++;
        expect(tokens[numLine]).toHaveLength(1);
        expect(tokens[numLine][0]).toEqualJson({
          value: 'foobar',
          scopes: ['source.asciidoc']
        });
        numLine++;
        return expect(numLine).toBe(7);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2Jsb2Nrcy9hZG1vbml0aW9uLWJsb2NrLWdyYW1tYXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLGtCQUFULEVBQTZCLFNBQUEsR0FBQTtBQUMzQixRQUFBLE9BQUE7QUFBQSxJQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG1CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FBQSxDQUFBO2FBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtlQUNILE9BQUEsR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFkLENBQWtDLGlCQUFsQyxFQURQO01BQUEsQ0FBTCxFQUpTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVNBLEVBQUEsQ0FBRyxvQkFBSCxFQUF5QixTQUFBLEdBQUE7QUFDdkIsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLENBQUMsV0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxNQUFBLENBQU8sT0FBTyxDQUFDLFNBQWYsQ0FBeUIsQ0FBQyxJQUExQixDQUErQixpQkFBL0IsRUFGdUI7SUFBQSxDQUF6QixDQVRBLENBQUE7QUFBQSxJQWlCQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO2FBRWhDLEVBQUEsQ0FBRywwQ0FBSCxFQUErQyxTQUFBLEdBQUE7QUFDN0MsWUFBQSxlQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBTyxDQUFDLGFBQVIsQ0FBc0IsNFRBQXRCLENBQVQsQ0FBQTtBQUFBLFFBWUEsTUFBQSxD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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/blocks/admonition-block-grammar-spec.coffee
