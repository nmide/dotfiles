(function() {
  module.exports = {
    config: {
      baseColor: {
        description: 'Controls the backround shade--black, brown or white',
        type: 'string',
        "default": 'black',
        "enum": ['black', 'brown', 'white']
      },
      scheme: {
        description: 'controls the color scheme--green or blue',
        type: 'string',
        "default": 'green',
        "enum": ['green', 'blue']
      }
    },
    activate: function() {
      return atom.themes.onDidChangeActiveThemes(function() {
        return require('./settingsManager')();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9kZWFkLXNpbXBsZS1saWdodC1zeW50YXgvbGliL2RlYWQtc2ltcGxlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFNBQUEsRUFDRTtBQUFBLFFBQUEsV0FBQSxFQUFhLHFEQUFiO0FBQUEsUUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLFFBRUEsU0FBQSxFQUFTLE9BRlQ7QUFBQSxRQUdBLE1BQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE9BQW5CLENBSE47T0FERjtBQUFBLE1BS0EsTUFBQSxFQUNFO0FBQUEsUUFBQSxXQUFBLEVBQWEsMENBQWI7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsT0FGVDtBQUFBLFFBR0EsTUFBQSxFQUFNLENBQUMsT0FBRCxFQUFVLE1BQVYsQ0FITjtPQU5GO0tBREY7QUFBQSxJQVlBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUFaLENBQW9DLFNBQUEsR0FBQTtlQUNsQyxPQUFBLENBQVEsbUJBQVIsQ0FBQSxDQUFBLEVBRGtDO01BQUEsQ0FBcEMsRUFEUTtJQUFBLENBWlY7R0FGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/dead-simple-light-syntax/lib/dead-simple.coffee
