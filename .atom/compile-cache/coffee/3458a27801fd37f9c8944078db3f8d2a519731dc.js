(function() {
  var scopeForFenceName;

  scopeForFenceName = require('../lib/highlights-helper').scopeForFenceName;

  describe('Highlights helper', function() {
    return it('should return grammar name "source.shell" when fence name is "bash"', function() {
      var scope;
      scope = scopeForFenceName('bash');
      return expect(scope).toBe('source.shell');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L3NwZWMvaGlnaGxpZ2h0cy1oZWxwZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUJBQUE7O0FBQUEsRUFBQyxvQkFBcUIsT0FBQSxDQUFRLDBCQUFSLEVBQXJCLGlCQUFELENBQUE7O0FBQUEsRUFFQSxRQUFBLENBQVMsbUJBQVQsRUFBOEIsU0FBQSxHQUFBO1dBRTVCLEVBQUEsQ0FBRyxxRUFBSCxFQUEwRSxTQUFBLEdBQUE7QUFDeEUsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsaUJBQUEsQ0FBa0IsTUFBbEIsQ0FBUixDQUFBO2FBQ0EsTUFBQSxDQUFPLEtBQVAsQ0FBYSxDQUFDLElBQWQsQ0FBbUIsY0FBbkIsRUFGd0U7SUFBQSxDQUExRSxFQUY0QjtFQUFBLENBQTlCLENBRkEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/spec/highlights-helper-spec.coffee
