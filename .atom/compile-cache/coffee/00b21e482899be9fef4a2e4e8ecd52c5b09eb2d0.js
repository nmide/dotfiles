(function() {
  var CSON, Directory, GrammarHelper, path, _base;

  Directory = require('atom').Directory;

  CSON = require('season');

  path = require('path');

  if ((_base = String.prototype).endsWith == null) {
    _base.endsWith = function(s) {
      return s === '' || this.slice(-s.length) === s;
    };
  }

  GrammarHelper = (function() {
    function GrammarHelper(rootInputDirectory, rootOutputDirectory) {
      this.rootInputDirectory = rootInputDirectory;
      this.rootOutputDirectory = rootOutputDirectory;
    }

    GrammarHelper.prototype.readGrammarFile = function(file) {
      var filepath;
      filepath = path.join(__dirname, this.rootInputDirectory, file);
      return CSON.readFileSync(filepath);
    };

    GrammarHelper.prototype.writeGrammarFile = function(grammar, file) {
      var outputFilepath;
      outputFilepath = path.join(__dirname, this.rootOutputDirectory, file);
      return CSON.writeFileSync(outputFilepath, grammar);
    };

    GrammarHelper.prototype.appendPartialGrammars = function(grammar, partialGrammarFiles) {
      var grammarFile, key, patterns, _i, _len, _ref, _results;
      _results = [];
      for (_i = 0, _len = partialGrammarFiles.length; _i < _len; _i++) {
        grammarFile = partialGrammarFiles[_i];
        _ref = this.readGrammarFile(grammarFile), key = _ref.key, patterns = _ref.patterns;
        if ((key != null) && (patterns != null)) {
          _results.push(grammar.repository[key] = {
            patterns: patterns
          });
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    GrammarHelper.prototype.appendPartialGrammarsDirectory = function(grammar, grammarDirectories) {
      var directory, directoryName, entries, entry, key, patterns, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = grammarDirectories.length; _i < _len; _i++) {
        directoryName = grammarDirectories[_i];
        directory = new Directory(path.join(__dirname, this.rootInputDirectory, directoryName));
        entries = directory.getEntriesSync();
        _results.push((function() {
          var _j, _len1, _ref, _results1;
          _results1 = [];
          for (_j = 0, _len1 = entries.length; _j < _len1; _j++) {
            entry = entries[_j];
            if (entry.isFile() && entry.getBaseName().endsWith('.cson')) {
              _ref = CSON.readFileSync(entry.path), key = _ref.key, patterns = _ref.patterns;
              if ((key != null) && (patterns != null)) {
                _results1.push(grammar.repository[key] = {
                  patterns: patterns
                });
              } else {
                _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    };

    return GrammarHelper;

  })();

  module.exports = GrammarHelper;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9saWIvZ3JhbW1hci1oZWxwZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBOztBQUFBLEVBQUMsWUFBYSxPQUFBLENBQVEsTUFBUixFQUFiLFNBQUQsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOzs7U0FJUSxDQUFBLFdBQVksU0FBQyxDQUFELEdBQUE7YUFBTyxDQUFBLEtBQUssRUFBTCxJQUFXLElBQUUsaUJBQUYsS0FBa0IsRUFBcEM7SUFBQTtHQUpwQjs7QUFBQSxFQU1NO0FBRVMsSUFBQSx1QkFBRSxrQkFBRixFQUF1QixtQkFBdkIsR0FBQTtBQUE2QyxNQUE1QyxJQUFDLENBQUEscUJBQUEsa0JBQTJDLENBQUE7QUFBQSxNQUF2QixJQUFDLENBQUEsc0JBQUEsbUJBQXNCLENBQTdDO0lBQUEsQ0FBYjs7QUFBQSw0QkFFQSxlQUFBLEdBQWlCLFNBQUMsSUFBRCxHQUFBO0FBQ2YsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLElBQUMsQ0FBQSxrQkFBdEIsRUFBMEMsSUFBMUMsQ0FBWCxDQUFBO2FBQ0EsSUFBSSxDQUFDLFlBQUwsQ0FBa0IsUUFBbEIsRUFGZTtJQUFBLENBRmpCLENBQUE7O0FBQUEsNEJBTUEsZ0JBQUEsR0FBa0IsU0FBQyxPQUFELEVBQVUsSUFBVixHQUFBO0FBQ2hCLFVBQUEsY0FBQTtBQUFBLE1BQUEsY0FBQSxHQUFpQixJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBQyxDQUFBLG1CQUF0QixFQUEyQyxJQUEzQyxDQUFqQixDQUFBO2FBQ0EsSUFBSSxDQUFDLGFBQUwsQ0FBbUIsY0FBbkIsRUFBbUMsT0FBbkMsRUFGZ0I7SUFBQSxDQU5sQixDQUFBOztBQUFBLDRCQVVBLHFCQUFBLEdBQXVCLFNBQUMsT0FBRCxFQUFVLG1CQUFWLEdBQUE7QUFDckIsVUFBQSxvREFBQTtBQUFBO1dBQUEsMERBQUE7OENBQUE7QUFDRSxRQUFBLE9BQWtCLElBQUMsQ0FBQSxlQUFELENBQWlCLFdBQWpCLENBQWxCLEVBQUMsV0FBQSxHQUFELEVBQU0sZ0JBQUEsUUFBTixDQUFBO0FBQ0EsUUFBQSxJQUFHLGFBQUEsSUFBUyxrQkFBWjt3QkFDRSxPQUFPLENBQUMsVUFBVyxDQUFBLEdBQUEsQ0FBbkIsR0FDRTtBQUFBLFlBQUEsUUFBQSxFQUFVLFFBQVY7YUFGSjtTQUFBLE1BQUE7Z0NBQUE7U0FGRjtBQUFBO3NCQURxQjtJQUFBLENBVnZCLENBQUE7O0FBQUEsNEJBaUJBLDhCQUFBLEdBQWdDLFNBQUMsT0FBRCxFQUFVLGtCQUFWLEdBQUE7QUFDOUIsVUFBQSwyRUFBQTtBQUFBO1dBQUEseURBQUE7K0NBQUE7QUFDRSxRQUFBLFNBQUEsR0FBZ0IsSUFBQSxTQUFBLENBQVUsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLElBQUMsQ0FBQSxrQkFBdEIsRUFBMEMsYUFBMUMsQ0FBVixDQUFoQixDQUFBO0FBQUEsUUFDQSxPQUFBLEdBQVUsU0FBUyxDQUFDLGNBQVYsQ0FBQSxDQURWLENBQUE7QUFBQTs7QUFFQTtlQUFBLGdEQUFBO2dDQUFBO0FBQ0UsWUFBQSxJQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FBQSxJQUFtQixLQUFLLENBQUMsV0FBTixDQUFBLENBQW1CLENBQUMsUUFBcEIsQ0FBNkIsT0FBN0IsQ0FBdEI7QUFDRSxjQUFBLE9BQWtCLElBQUksQ0FBQyxZQUFMLENBQWtCLEtBQUssQ0FBQyxJQUF4QixDQUFsQixFQUFDLFdBQUEsR0FBRCxFQUFNLGdCQUFBLFFBQU4sQ0FBQTtBQUNBLGNBQUEsSUFBRyxhQUFBLElBQVMsa0JBQVo7K0JBQ0UsT0FBTyxDQUFDLFVBQVcsQ0FBQSxHQUFBLENBQW5CLEdBQ0U7QUFBQSxrQkFBQSxRQUFBLEVBQVUsUUFBVjttQkFGSjtlQUFBLE1BQUE7dUNBQUE7ZUFGRjthQUFBLE1BQUE7cUNBQUE7YUFERjtBQUFBOzthQUZBLENBREY7QUFBQTtzQkFEOEI7SUFBQSxDQWpCaEMsQ0FBQTs7eUJBQUE7O01BUkYsQ0FBQTs7QUFBQSxFQW9DQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQXBDakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/lib/grammar-helper.coffee
