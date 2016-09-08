(function() {
  module.exports = {
    config: {
      accentColor: {
        description: 'Set a color that will influence accents in the theme',
        type: 'color',
        "default": '#d2372b'
      },
      hexColor: {
        description: 'Set an accent color by hex value (cannot be shorthand, use #rrggbb)',
        type: 'string',
        "default": '#d2372b'
      },
      fontSize: {
        description: 'Set the global font size for this theme. A bit finicky at the moment, can sometimes take a few reloads to see changes.',
        type: 'integer',
        "default": 12,
        minimum: 8,
        maximum: 24
      },
      useSyntax: {
        description: 'Override the gutter, background, and selection colours',
        type: 'boolean',
        "default": 'true'
      },
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9mdXNpb24tdWkvbGliL2FjY2VudHMtdWkuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNJO0FBQUEsUUFBQSxXQUFBLEVBQWEsc0RBQWI7QUFBQSxRQUNBLElBQUEsRUFBTSxPQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsU0FGVDtPQURKO0FBQUEsTUFJQSxRQUFBLEVBQ0k7QUFBQSxRQUFBLFdBQUEsRUFBYSxxRUFBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxTQUZUO09BTEo7QUFBQSxNQVFBLFFBQUEsRUFDSTtBQUFBLFFBQUEsV0FBQSxFQUFhLHdIQUFiO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLEVBRlQ7QUFBQSxRQUdBLE9BQUEsRUFBUyxDQUhUO0FBQUEsUUFJQSxPQUFBLEVBQVMsRUFKVDtPQVRKO0FBQUEsTUFjQSxTQUFBLEVBQ0k7QUFBQSxRQUFBLFdBQUEsRUFBYSx3REFBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxNQUZUO09BZko7QUFBQSxNQWtCQSxTQUFBLEVBQ0k7QUFBQSxRQUFBLFdBQUEsRUFBYSxvQ0FBYjtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxPQUZUO09BbkJKO0tBREY7QUFBQSxJQXdCQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUFaLENBQW9DLFNBQUEsR0FBQTtBQUNsQyxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUixDQUFULENBQUE7ZUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBLEVBRmtDO01BQUEsQ0FBcEMsRUFEUTtJQUFBLENBeEJWO0dBRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/fusion-ui/lib/accents-ui.coffee
