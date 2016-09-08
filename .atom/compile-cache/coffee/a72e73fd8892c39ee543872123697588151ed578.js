(function() {
  module.exports = {
    dependenciesInstalled: null,
    activate: function(state) {
      return require('atom-package-deps').install('asciidoc-assistant').then((function(_this) {
        return function() {
          return _this.dependenciesInstalled = true;
        };
      })(this))["catch"](function(error) {
        return console.error(error);
      });
    },
    deactivate: function() {
      return this.dependenciesInstalled = null;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1hc3Npc3RhbnQvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLHFCQUFBLEVBQXVCLElBQXZCO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixPQUFBLENBQVEsbUJBQVIsQ0FBNEIsQ0FBQyxPQUE3QixDQUFxQyxvQkFBckMsQ0FDRSxDQUFDLElBREgsQ0FDUSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNKLEtBQUMsQ0FBQSxxQkFBRCxHQUF5QixLQURyQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRFIsQ0FHRSxDQUFDLE9BQUQsQ0FIRixDQUdTLFNBQUMsS0FBRCxHQUFBO2VBQ0wsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLEVBREs7TUFBQSxDQUhULEVBRFE7SUFBQSxDQUZWO0FBQUEsSUFTQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLHFCQUFELEdBQXlCLEtBRGY7SUFBQSxDQVRaO0dBRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-assistant/lib/main.coffee
