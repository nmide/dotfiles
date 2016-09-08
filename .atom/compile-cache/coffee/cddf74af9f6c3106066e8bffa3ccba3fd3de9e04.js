(function() {
  module.exports = {
    config: {
      fontSize: {
        title: 'Font Size',
        description: 'Change the UI font size. Needs to be between 10 and 20.',
        type: ['integer', 'string'],
        minimum: 10,
        maximum: 20,
        "default": 'Auto'
      },
      layoutMode: {
        title: 'Layout Mode',
        description: 'In Auto mode, the UI will automatically adapt based on the window size.',
        type: 'string',
        "default": 'Auto',
        "enum": ['Compact', 'Auto', 'Spacious']
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9vbmUtbGlnaHQtdWktYWR3YWl0YS9saWIvc2V0dGluZ3MuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFFRTtBQUFBLE1BQUEsUUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sV0FBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHlEQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sQ0FBQyxTQUFELEVBQVksUUFBWixDQUZOO0FBQUEsUUFHQSxPQUFBLEVBQVMsRUFIVDtBQUFBLFFBSUEsT0FBQSxFQUFTLEVBSlQ7QUFBQSxRQUtBLFNBQUEsRUFBUyxNQUxUO09BREY7QUFBQSxNQVFBLFVBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGFBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSx5RUFEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47QUFBQSxRQUdBLFNBQUEsRUFBUyxNQUhUO0FBQUEsUUFJQSxNQUFBLEVBQU0sQ0FDSixTQURJLEVBRUosTUFGSSxFQUdKLFVBSEksQ0FKTjtPQVRGO0tBRkY7QUFBQSxJQXFCQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUFaLENBQW9DLFNBQUEsR0FBQTtBQUNsQyxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUixDQUFULENBQUE7ZUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBLEVBRmtDO01BQUEsQ0FBcEMsRUFEUTtJQUFBLENBckJWO0dBREYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/one-light-ui-adwaita/lib/settings.coffee
