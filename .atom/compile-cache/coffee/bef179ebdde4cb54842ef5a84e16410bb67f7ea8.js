(function() {
  describe('Should tokenizes standard table when', function() {
    var debug, grammar;
    grammar = null;
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-asciidoc');
      });
      return runs(function() {
        return grammar = atom.grammars.grammarForScopeName('source.asciidoc');
      });
    });
    debug = function(tokens) {
      return console.log(JSON.stringify(tokens, null, ' '));
    };
    it('parses the grammar', function() {
      expect(grammar).toBeDefined();
      return expect(grammar.scopeName).toBe('source.asciidoc');
    });
    return it('contains several lines', function() {
      var tokens;
      tokens = grammar.tokenizeLines('|===\n |1      >s|2   |3        |4\n^|5 2.2+^.^|6      .3+<.>m|7\n^|8\n |9     2+>|10\n|===');
      expect(tokens).toHaveLength(6);
      expect(tokens[0]).toHaveLength(1);
      expect(tokens[0][0]).toEqualJson({
        value: '|===',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.delimiter.asciidoc']
      });
      expect(tokens[1]).toHaveLength(10);
      expect(tokens[1][0]).toEqualJson({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[1][1]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[1][2]).toEqualJson({
        value: '1      ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[1][3]).toEqualJson({
        value: '>s',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[1][4]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[1][5]).toEqualJson({
        value: '2   ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[1][6]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[1][7]).toEqualJson({
        value: '3        ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[1][8]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[1][9]).toEqualJson({
        value: '4',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[2]).toHaveLength(9);
      expect(tokens[2][0]).toEqualJson({
        value: '^',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[2][1]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[2][2]).toEqualJson({
        value: '5 ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[2][3]).toEqualJson({
        value: '2.2+^.^',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[2][4]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[2][5]).toEqualJson({
        value: '6      ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[2][6]).toEqualJson({
        value: '.3+<.>m',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[2][7]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[2][8]).toEqualJson({
        value: '7',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[3]).toHaveLength(3);
      expect(tokens[3][0]).toEqualJson({
        value: '^',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[3][1]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[3][2]).toEqualJson({
        value: '8',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[4]).toHaveLength(6);
      expect(tokens[4][0]).toEqualJson({
        value: ' ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[4][1]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[4][2]).toEqualJson({
        value: '9     ',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[4][3]).toEqualJson({
        value: '2+>',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.meta.attribute-list.asciidoc']
      });
      expect(tokens[4][4]).toEqualJson({
        value: '|',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc', 'markup.table.cell.delimiter.asciidoc']
      });
      expect(tokens[4][5]).toEqualJson({
        value: '10',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.content.asciidoc']
      });
      expect(tokens[5]).toHaveLength(1);
      return expect(tokens[5][0]).toEqualJson({
        value: '|===',
        scopes: ['source.asciidoc', 'markup.table.asciidoc', 'markup.table.delimiter.asciidoc']
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL3RhYmxlcy9wc3YtdGFibGUtZ3JhbW1hci1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsc0NBQVQsRUFBaUQsU0FBQSxHQUFBO0FBQy9DLFFBQUEsY0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQVYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQUFBLENBQUE7YUFHQSxJQUFBLENBQUssU0FBQSxHQUFBO2VBQ0gsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQWQsQ0FBa0MsaUJBQWxDLEVBRFA7TUFBQSxDQUFMLEVBSlM7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBVUEsS0FBQSxHQUFRLFNBQUMsTUFBRCxHQUFBO2FBQ04sT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWYsRUFBdUIsSUFBdkIsRUFBNkIsR0FBN0IsQ0FBWixFQURNO0lBQUEsQ0FWUixDQUFBO0FBQUEsSUFhQSxFQUFBLENBQUcsb0JBQUgsRUFBeUIsU0FBQSxHQUFBO0FBQ3ZCLE1BQUEsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQUEsQ0FBQSxDQUFBO2FBQ0EsTUFBQSxDQUFPLE9BQU8sQ0FBQyxTQUFmLENBQXlCLENBQUMsSUFBMUIsQ0FBK0IsaUJBQS9CLEVBRnVCO0lBQUEsQ0FBekIsQ0FiQSxDQUFBO1dBaUJBLEVBQUEsQ0FBRyx3QkFBSCxFQUE2QixTQUFBLEdBQUE7QUFDM0Is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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/tables/psv-table-grammar-spec.coffee
