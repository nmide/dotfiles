(function() {
  var calculateTocType, makeBaseDirectory, path, sectionNumbering;

  path = require('path');

  module.exports = {
    makeAttributes: function() {
      var attributes;
      return attributes = {
        defaultAttributes: atom.config.get('asciidoc-preview.defaultAttributes'),
        sectnums: sectionNumbering(),
        skipFrontMatter: atom.config.get('asciidoc-preview.frontMatter') ? '' : 'skip-front-matter',
        showTitle: atom.config.get('asciidoc-preview.showTitle') ? 'showtitle' : 'showtitle!',
        compatMode: atom.config.get('asciidoc-preview.compatMode') ? 'compat-mode=@' : '',
        forceExperimental: atom.config.get('asciidoc-preview.forceExperimental') ? 'experimental' : '',
        tocType: calculateTocType()
      };
    },
    makeOptions: function(filePath) {
      var options;
      return options = {
        opalPwd: window.location.href,
        baseDir: (filePath ? makeBaseDirectory(filePath) : void 0),
        safeMode: atom.config.get('asciidoc-preview.safeMode' || 'safe')
      };
    }
  };

  calculateTocType = function() {
    var tocType;
    tocType = atom.config.get('asciidoc-preview.tocType');
    if (tocType === 'none') {
      return '';
    } else if (tocType === 'auto') {
      return 'toc=toc! toc2!';
    } else {
      return "toc=" + tocType + " toc2!";
    }
  };

  sectionNumbering = function() {
    var sectnumsOption;
    sectnumsOption = atom.config.get('asciidoc-preview.sectionNumbering');
    if (sectnumsOption === 'always-enabled') {
      return 'sectnums';
    } else if (sectnumsOption === 'always-disabled') {
      return 'sectnums!';
    } else if (sectnumsOption === 'enabled-by-default') {
      return 'sectnums=@';
    } else {
      return '';
    }
  };

  makeBaseDirectory = function(filePath) {
    var baseBir;
    baseBir = atom.config.get('asciidoc-preview.baseDir');
    if (baseBir === '{docdir}') {
      return path.dirname(filePath);
    } else if (baseBir !== '-') {
      return baseBir;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9jb25maWd1cmF0aW9uLWJ1aWxkZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJEQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFBZ0IsU0FBQSxHQUFBO0FBQ2QsVUFBQSxVQUFBO2FBQUEsVUFBQSxHQUNFO0FBQUEsUUFBQSxpQkFBQSxFQUFtQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0NBQWhCLENBQW5CO0FBQUEsUUFDQSxRQUFBLEVBQVUsZ0JBQUEsQ0FBQSxDQURWO0FBQUEsUUFFQSxlQUFBLEVBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw4QkFBaEIsQ0FBSCxHQUF1RCxFQUF2RCxHQUErRCxtQkFGaEY7QUFBQSxRQUdBLFNBQUEsRUFBYyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNEJBQWhCLENBQUgsR0FBcUQsV0FBckQsR0FBc0UsWUFIakY7QUFBQSxRQUlBLFVBQUEsRUFBZSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNkJBQWhCLENBQUgsR0FBc0QsZUFBdEQsR0FBMkUsRUFKdkY7QUFBQSxRQUtBLGlCQUFBLEVBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixvQ0FBaEIsQ0FBSCxHQUE2RCxjQUE3RCxHQUFpRixFQUxwRztBQUFBLFFBTUEsT0FBQSxFQUFTLGdCQUFBLENBQUEsQ0FOVDtRQUZZO0lBQUEsQ0FBaEI7QUFBQSxJQVVBLFdBQUEsRUFBYSxTQUFDLFFBQUQsR0FBQTtBQUNYLFVBQUEsT0FBQTthQUFBLE9BQUEsR0FDRTtBQUFBLFFBQUEsT0FBQSxFQUFTLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBekI7QUFBQSxRQUNBLE9BQUEsRUFBUyxDQUErQixRQUE5QixHQUFBLGlCQUFBLENBQWtCLFFBQWxCLENBQUEsR0FBQSxNQUFELENBRFQ7QUFBQSxRQUVBLFFBQUEsRUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMkJBQUEsSUFBK0IsTUFBL0MsQ0FGVjtRQUZTO0lBQUEsQ0FWYjtHQUhGLENBQUE7O0FBQUEsRUFtQkEsZ0JBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2pCLFFBQUEsT0FBQTtBQUFBLElBQUEsT0FBQSxHQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwwQkFBaEIsQ0FBVixDQUFBO0FBQ0EsSUFBQSxJQUFHLE9BQUEsS0FBVyxNQUFkO2FBQ0UsR0FERjtLQUFBLE1BRUssSUFBRyxPQUFBLEtBQVcsTUFBZDthQUdILGlCQUhHO0tBQUEsTUFBQTthQUtGLE1BQUEsR0FBTSxPQUFOLEdBQWMsU0FMWjtLQUpZO0VBQUEsQ0FuQm5CLENBQUE7O0FBQUEsRUE4QkEsZ0JBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2pCLFFBQUEsY0FBQTtBQUFBLElBQUEsY0FBQSxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsbUNBQWhCLENBQWpCLENBQUE7QUFDQSxJQUFBLElBQUcsY0FBQSxLQUFrQixnQkFBckI7YUFDRSxXQURGO0tBQUEsTUFFSyxJQUFHLGNBQUEsS0FBa0IsaUJBQXJCO2FBQ0gsWUFERztLQUFBLE1BRUEsSUFBRyxjQUFBLEtBQWtCLG9CQUFyQjthQUNILGFBREc7S0FBQSxNQUFBO2FBR0gsR0FIRztLQU5ZO0VBQUEsQ0E5Qm5CLENBQUE7O0FBQUEsRUF5Q0EsaUJBQUEsR0FBb0IsU0FBQyxRQUFELEdBQUE7QUFDbEIsUUFBQSxPQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDBCQUFoQixDQUFWLENBQUE7QUFDQSxJQUFBLElBQUcsT0FBQSxLQUFXLFVBQWQ7YUFDRSxJQUFJLENBQUMsT0FBTCxDQUFhLFFBQWIsRUFERjtLQUFBLE1BRUssSUFBRyxPQUFBLEtBQWEsR0FBaEI7YUFDSCxRQURHO0tBSmE7RUFBQSxDQXpDcEIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/configuration-builder.coffee
