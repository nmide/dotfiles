(function() {
  var GrammarHelper;

  GrammarHelper = require('../lib/grammar-helper');

  describe('Grammar helper', function() {
    var helper;
    helper = new GrammarHelper('../spec/fixtures/grammars/', '../spec/output/');
    it('should create a grammar object when read a grammar file', function() {
      var fileContent;
      fileContent = helper.readGrammarFile('sample01.cson');
      return expect(fileContent).toEqualJson({
        key: 'test',
        patterns: ['foo', 'bar']
      });
    });
    return it('should append file content to existing grammar when read a partial grammar file', function() {
      var grammar, partialGrammarFiles;
      grammar = {
        repository: {}
      };
      partialGrammarFiles = ['sample01.cson'];
      helper.appendPartialGrammars(grammar, partialGrammarFiles);
      return expect(grammar).toEqualJson({
        repository: {
          test: {
            patterns: ['foo', 'bar']
          }
        }
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2dyYW1tYXItaGVscGVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGFBQUE7O0FBQUEsRUFBQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSx1QkFBUixDQUFoQixDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLGdCQUFULEVBQTJCLFNBQUEsR0FBQTtBQUV6QixRQUFBLE1BQUE7QUFBQSxJQUFBLE1BQUEsR0FBYSxJQUFBLGFBQUEsQ0FBYyw0QkFBZCxFQUE0QyxpQkFBNUMsQ0FBYixDQUFBO0FBQUEsSUFFQSxFQUFBLENBQUcseURBQUgsRUFBOEQsU0FBQSxHQUFBO0FBQzVELFVBQUEsV0FBQTtBQUFBLE1BQUEsV0FBQSxHQUFjLE1BQU0sQ0FBQyxlQUFQLENBQXVCLGVBQXZCLENBQWQsQ0FBQTthQUVBLE1BQUEsQ0FBTyxXQUFQLENBQW1CLENBQUMsV0FBcEIsQ0FBZ0M7QUFBQSxRQUFBLEdBQUEsRUFBSyxNQUFMO0FBQUEsUUFBYSxRQUFBLEVBQVUsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUF2QjtPQUFoQyxFQUg0RDtJQUFBLENBQTlELENBRkEsQ0FBQTtXQU9BLEVBQUEsQ0FBRyxpRkFBSCxFQUFzRixTQUFBLEdBQUE7QUFDcEYsVUFBQSw0QkFBQTtBQUFBLE1BQUEsT0FBQSxHQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksRUFBWjtPQURGLENBQUE7QUFBQSxNQUdBLG1CQUFBLEdBQXNCLENBQ3BCLGVBRG9CLENBSHRCLENBQUE7QUFBQSxNQU9BLE1BQU0sQ0FBQyxxQkFBUCxDQUE2QixPQUE3QixFQUFzQyxtQkFBdEMsQ0FQQSxDQUFBO2FBU0EsTUFBQSxDQUFPLE9BQVAsQ0FBZSxDQUFDLFdBQWhCLENBQTRCO0FBQUEsUUFBQSxVQUFBLEVBQVk7QUFBQSxVQUFBLElBQUEsRUFBTTtBQUFBLFlBQUEsUUFBQSxFQUFVLENBQUMsS0FBRCxFQUFRLEtBQVIsQ0FBVjtXQUFOO1NBQVo7T0FBNUIsRUFWb0Y7SUFBQSxDQUF0RixFQVR5QjtFQUFBLENBQTNCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/grammar-helper-spec.coffee
