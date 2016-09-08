(function() {
  module.exports = {
    config: {
      debugMode: {
        description: 'Log certain details to the console',
        type: 'boolean',
        "default": 'false'
      }
    },
    activate: function(state) {
      return atom.themes.onDidChangeActiveThemes(function() {
        var Config;
        Config = require('./config');
        return Config.apply();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9mdXNpb24tdWkvbGliL2Z1c2lvbi11aS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxTQUFBLEVBQ0k7QUFBQSxRQUFBLFdBQUEsRUFBYSxvQ0FBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxPQUZUO09BREo7S0FERjtBQUFBLElBTUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBWixDQUFvQyxTQUFBLEdBQUE7QUFDbEMsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVIsQ0FBVCxDQUFBO2VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZrQztNQUFBLENBQXBDLEVBRFE7SUFBQSxDQU5WO0dBRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/fusion-ui/lib/fusion-ui.coffee
