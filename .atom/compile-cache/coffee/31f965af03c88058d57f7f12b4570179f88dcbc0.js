(function() {
  describe('asciidoc-assistant', function() {
    var mainModule;
    mainModule = null;
    return beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('asciidoc-assistant').then(function(pack) {
          mainModule = pack.mainModule;
        });
      });
      return describe('when the asciidoc-assistant package is activated', function() {
        return it('activates successfully', function() {
          expect(mainModule).toBeDefined();
          expect(mainModule).toBeTruthy();
          expect(mainModule.activate).toBeDefined();
          return expect(mainModule.deactivate).toBeDefined();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1hc3Npc3RhbnQvc3BlYy9tYWluLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxFQUFBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7QUFFN0IsUUFBQSxVQUFBO0FBQUEsSUFBQSxVQUFBLEdBQWEsSUFBYixDQUFBO1dBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUVULE1BQUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsb0JBQTlCLENBQ0UsQ0FBQyxJQURILENBQ1EsU0FBQyxJQUFELEdBQUE7QUFDSixVQUFBLFVBQUEsR0FBYSxJQUFJLENBQUMsVUFBbEIsQ0FESTtRQUFBLENBRFIsRUFEYztNQUFBLENBQWhCLENBQUEsQ0FBQTthQU1BLFFBQUEsQ0FBUyxrREFBVCxFQUE2RCxTQUFBLEdBQUE7ZUFFM0QsRUFBQSxDQUFHLHdCQUFILEVBQTZCLFNBQUEsR0FBQTtBQUMzQixVQUFBLE1BQUEsQ0FBTyxVQUFQLENBQWtCLENBQUMsV0FBbkIsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxVQUFQLENBQWtCLENBQUMsVUFBbkIsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLE1BQUEsQ0FBTyxVQUFVLENBQUMsUUFBbEIsQ0FBMkIsQ0FBQyxXQUE1QixDQUFBLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sVUFBVSxDQUFDLFVBQWxCLENBQTZCLENBQUMsV0FBOUIsQ0FBQSxFQUoyQjtRQUFBLENBQTdCLEVBRjJEO01BQUEsQ0FBN0QsRUFSUztJQUFBLENBQVgsRUFKNkI7RUFBQSxDQUEvQixDQUFBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/asciidoc-assistant/spec/main-spec.coffee
