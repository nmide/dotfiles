(function() {
  var path;

  path = require('path');

  module.exports = {
    createGrammar: function() {
      return new Promise(function(resolve, reject) {
        var grammarPath;
        grammarPath = path.join(__dirname, 'asciidoc-fake-grammar.cson');
        return atom.grammars.readGrammar(grammarPath, function(error, grammar) {
          if (error != null) {
            return reject(error);
          } else {
            return resolve(grammar);
          }
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvc3BlYy9maXh0dXJlcy9mYWtlLWFzY2lpZG9jLWdyYW1tYXItYnVpbGRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsSUFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxhQUFBLEVBQWUsU0FBQSxHQUFBO2FBQ1QsSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBQ1YsWUFBQSxXQUFBO0FBQUEsUUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLDRCQUFyQixDQUFkLENBQUE7ZUFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQWQsQ0FBMEIsV0FBMUIsRUFBdUMsU0FBQyxLQUFELEVBQVEsT0FBUixHQUFBO0FBQ3JDLFVBQUEsSUFBRyxhQUFIO21CQUFlLE1BQUEsQ0FBTyxLQUFQLEVBQWY7V0FBQSxNQUFBO21CQUFpQyxPQUFBLENBQVEsT0FBUixFQUFqQztXQURxQztRQUFBLENBQXZDLEVBRlU7TUFBQSxDQUFSLEVBRFM7SUFBQSxDQUFmO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/spec/fixtures/fake-asciidoc-grammar-builder.coffee
