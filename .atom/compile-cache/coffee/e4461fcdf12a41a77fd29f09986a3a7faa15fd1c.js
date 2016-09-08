(function() {
  var filepath, fs, path, setColors;

  fs = require('fs');

  path = require('path');

  filepath = path.join(__dirname, '..', '/styles/colors.less');

  setColors = function(colorObj) {
    return fs.readFile(filepath, function(err, contents) {
      var contentString, key, regexp, value;
      if (err) {
        throw err;
      }
      contentString = contents.toString();
      for (key in colorObj) {
        value = colorObj[key];
        regexp = new RegExp(key + ": [^;]+;");
        contentString = contentString.replace(regexp, "" + key + ": " + value + ";");
      }
      return fs.writeFile(filepath, contentString, function() {
        var theme, _i, _len, _ref, _results;
        _ref = atom.themes.getActiveThemes();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          theme = _ref[_i];
          _results.push(theme.reloadStylesheets());
        }
        return _results;
      });
    });
  };

  module.exports = function() {
    atom.config.onDidChange('dead-simple-light-syntax.baseColor', function() {
      var colors, value;
      value = atom.config.get('dead-simple-light-syntax.baseColor');
      colors = {};
      switch (value) {
        case 'black':
          colors = {
            '@background': '@light-gray',
            '@invisibles': 'white'
          };
          break;
        case 'brown':
          colors = {
            '@background': '@chalk',
            '@invisibles': 'white'
          };
          break;
        case 'white':
          colors = {
            '@background': 'white',
            '@invisibles': 'darken(@background, 5%)'
          };
      }
      return setColors(colors);
    });
    return atom.config.onDidChange('dead-simple-light-syntax.scheme', function() {
      var scheme, value;
      value = atom.config.get('dead-simple-light-syntax.scheme');
      scheme = {};
      switch (value) {
        case 'green':
          scheme = {
            '@keyword': '@green',
            '@special': '@fuscia',
            '@selected': '@sea-glass'
          };
          break;
        case 'blue':
          scheme = {
            '@keyword': '@blue',
            '@special': '@sherbet',
            '@selected': '@pale-blue'
          };
      }
      return setColors(scheme);
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9kZWFkLXNpbXBsZS1saWdodC1zeW50YXgvbGliL3NldHRpbmdzTWFuYWdlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkJBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIscUJBQTNCLENBSFgsQ0FBQTs7QUFBQSxFQUtBLFNBQUEsR0FBWSxTQUFDLFFBQUQsR0FBQTtXQUNWLEVBQUUsQ0FBQyxRQUFILENBQVksUUFBWixFQUFzQixTQUFDLEdBQUQsRUFBTSxRQUFOLEdBQUE7QUFDcEIsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsSUFBYSxHQUFiO0FBQUEsY0FBTSxHQUFOLENBQUE7T0FBQTtBQUFBLE1BQ0EsYUFBQSxHQUFnQixRQUFRLENBQUMsUUFBVCxDQUFBLENBRGhCLENBQUE7QUFFQSxXQUFBLGVBQUE7OEJBQUE7QUFDRSxRQUFBLE1BQUEsR0FBYSxJQUFBLE1BQUEsQ0FBTyxHQUFBLEdBQU0sVUFBYixDQUFiLENBQUE7QUFBQSxRQUNBLGFBQUEsR0FBZ0IsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsTUFBdEIsRUFBOEIsRUFBQSxHQUFHLEdBQUgsR0FBTyxJQUFQLEdBQVcsS0FBWCxHQUFpQixHQUEvQyxDQURoQixDQURGO0FBQUEsT0FGQTthQUtBLEVBQUUsQ0FBQyxTQUFILENBQWEsUUFBYixFQUF1QixhQUF2QixFQUFzQyxTQUFBLEdBQUE7QUFDcEMsWUFBQSwrQkFBQTtBQUFBO0FBQUE7YUFBQSwyQ0FBQTsyQkFBQTtBQUFBLHdCQUFBLEtBQUssQ0FBQyxpQkFBTixDQUFBLEVBQUEsQ0FBQTtBQUFBO3dCQURvQztNQUFBLENBQXRDLEVBTm9CO0lBQUEsQ0FBdEIsRUFEVTtFQUFBLENBTFosQ0FBQTs7QUFBQSxFQWVBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUEsR0FBQTtBQUNmLElBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLG9DQUF4QixFQUE4RCxTQUFBLEdBQUE7QUFDNUQsVUFBQSxhQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9DQUFoQixDQUFSLENBQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxFQURULENBQUE7QUFFQSxjQUFPLEtBQVA7QUFBQSxhQUNPLE9BRFA7QUFFSSxVQUFBLE1BQUEsR0FDRTtBQUFBLFlBQUEsYUFBQSxFQUFlLGFBQWY7QUFBQSxZQUNBLGFBQUEsRUFBZSxPQURmO1dBREYsQ0FGSjtBQUNPO0FBRFAsYUFLTyxPQUxQO0FBTUksVUFBQSxNQUFBLEdBQ0U7QUFBQSxZQUFBLGFBQUEsRUFBZSxRQUFmO0FBQUEsWUFDQSxhQUFBLEVBQWUsT0FEZjtXQURGLENBTko7QUFLTztBQUxQLGFBU08sT0FUUDtBQVVJLFVBQUEsTUFBQSxHQUNFO0FBQUEsWUFBQSxhQUFBLEVBQWUsT0FBZjtBQUFBLFlBQ0EsYUFBQSxFQUFlLHlCQURmO1dBREYsQ0FWSjtBQUFBLE9BRkE7YUFlQSxTQUFBLENBQVUsTUFBVixFQWhCNEQ7SUFBQSxDQUE5RCxDQUFBLENBQUE7V0FrQkEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLGlDQUF4QixFQUEyRCxTQUFBLEdBQUE7QUFDekQsVUFBQSxhQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGlDQUFoQixDQUFSLENBQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxFQURULENBQUE7QUFFQSxjQUFPLEtBQVA7QUFBQSxhQUNPLE9BRFA7QUFFSSxVQUFBLE1BQUEsR0FDRTtBQUFBLFlBQUEsVUFBQSxFQUFZLFFBQVo7QUFBQSxZQUNBLFVBQUEsRUFBWSxTQURaO0FBQUEsWUFFQSxXQUFBLEVBQWEsWUFGYjtXQURGLENBRko7QUFDTztBQURQLGFBTU8sTUFOUDtBQU9JLFVBQUEsTUFBQSxHQUNFO0FBQUEsWUFBQSxVQUFBLEVBQVksT0FBWjtBQUFBLFlBQ0EsVUFBQSxFQUFZLFVBRFo7QUFBQSxZQUVBLFdBQUEsRUFBYSxZQUZiO1dBREYsQ0FQSjtBQUFBLE9BRkE7YUFhQSxTQUFBLENBQVUsTUFBVixFQWR5RDtJQUFBLENBQTNELEVBbkJlO0VBQUEsQ0FmakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/dead-simple-light-syntax/lib/settingsManager.coffee
