(function() {
  var completionProvider;

  completionProvider = require('./completion-provider');

  module.exports = {
    subscriptions: null,
    activate: function(state) {
      return completionProvider.loadCompletions();
    },
    provide: function() {
      return completionProvider;
    },
    deactivate: function() {
      var _ref;
      return (_ref = this.subscriptions) != null ? _ref.dispose() : void 0;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdXRvY29tcGxldGUtYXNjaWlkb2MvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHVCQUFSLENBQXJCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxhQUFBLEVBQWUsSUFBZjtBQUFBLElBRUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1Isa0JBQWtCLENBQUMsZUFBbkIsQ0FBQSxFQURRO0lBQUEsQ0FGVjtBQUFBLElBS0EsT0FBQSxFQUFTLFNBQUEsR0FBQTthQUNQLG1CQURPO0lBQUEsQ0FMVDtBQUFBLElBUUEsVUFBQSxFQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsSUFBQTt1REFBYyxDQUFFLE9BQWhCLENBQUEsV0FEVTtJQUFBLENBUlo7R0FKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/autocomplete-asciidoc/lib/main.coffee
