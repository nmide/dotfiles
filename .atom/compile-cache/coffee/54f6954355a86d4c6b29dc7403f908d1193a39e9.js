(function() {
  var CSON, firstCharsEqual, path, _;

  _ = require('lodash');

  path = require('path');

  CSON = require('season');

  module.exports = {
    selector: '.source.asciidoc',
    disableForSelector: '.source.asciidoc .comment.block.asciidoc .comment.inline.asciidoc',
    inclusionPriority: 1,
    excludeLowerPriority: true,
    filterSuggestions: true,
    attributes: {},
    getSuggestions: function(_arg) {
      var activatedManually, bufferPosition, editor, prefix, scopeDescriptor, scopes;
      editor = _arg.editor, bufferPosition = _arg.bufferPosition, scopeDescriptor = _arg.scopeDescriptor, prefix = _arg.prefix, activatedManually = _arg.activatedManually;
      scopes = scopeDescriptor.getScopesArray();
      if (this.isAttributeReferenceScope(scopes, editor, bufferPosition)) {
        return new Promise((function(_this) {
          return function(resolve, reject) {
            var localAttributes, suggestions;
            localAttributes = _this.extractLocalAttributes(editor);
            suggestions = _.chain(_this.attributes).map(function(attribute, key) {
              var suggestion;
              return suggestion = {
                type: 'variable',
                text: key,
                displayText: key,
                rightLabel: 'asciidoc',
                description: attribute.description || key,
                descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog'
              };
            }).concat(localAttributes).filter(function(attribute) {
              if (prefix.match(/^[\w]/)) {
                return firstCharsEqual(attribute.text, prefix);
              } else {
                return true;
              }
            }).sortBy(function(attribute) {
              return attribute.text.toLowerCase();
            }).value();
            return resolve(suggestions);
          };
        })(this));
      } else {
        return Promise.resolve([]);
      }
    },
    extractLocalAttributes: function(editor) {
      var currentRow, pattern, textLines;
      pattern = /^:([\w\-]+)(?:!)?:/;
      textLines = editor.getBuffer().getLines();
      currentRow = editor.getCursorScreenPosition().row;
      return _.chain(textLines).take(currentRow).filter(function(line) {
        return pattern.test(line);
      }).map(function(rawAttribute) {
        return pattern.exec(rawAttribute)[1];
      }).uniq().map(function(attribute) {
        var suggestion;
        return suggestion = {
          type: 'variable',
          text: attribute,
          displayText: attribute,
          rightLabel: 'local',
          description: 'Local attribute',
          descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#using-attributes-set-assign-and-reference'
        };
      }).value();
    },
    isAttributeReferenceScope: function(scopes, editor, bufferPosition) {
      var beginPattern, endPattern, line, matchPrefix;
      line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
      beginPattern = /^\{.*/g;
      endPattern = /^.*\}$/g;
      matchPrefix = beginPattern.test(line) && !endPattern.test(line);
      return scopes.includes('markup.substitution.attribute-reference.asciidoc') && matchPrefix;
    },
    loadCompletions: function() {
      var completionsFilePath;
      completionsFilePath = path.resolve(__dirname, '..', 'completions', 'attribute-completions.json');
      return new Promise(function(resolve, reject) {
        return CSON.readFile(completionsFilePath, function(error, data) {
          if (error != null) {
            return reject(error);
          } else {
            return resolve(data);
          }
        });
      }).then((function(_this) {
        return function(data) {
          return _this.attributes = data.attributes, data;
        };
      })(this));
    }
  };

  firstCharsEqual = function(str1, str2) {
    return str1[0].toLowerCase() === str2[0].toLowerCase();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdXRvY29tcGxldGUtYXNjaWlkb2MvbGliL2NvbXBsZXRpb24tcHJvdmlkZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FGUCxDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLGtCQUFWO0FBQUEsSUFDQSxrQkFBQSxFQUFvQixtRUFEcEI7QUFBQSxJQU1BLGlCQUFBLEVBQW1CLENBTm5CO0FBQUEsSUFPQSxvQkFBQSxFQUFzQixJQVB0QjtBQUFBLElBU0EsaUJBQUEsRUFBbUIsSUFUbkI7QUFBQSxJQVdBLFVBQUEsRUFBWSxFQVhaO0FBQUEsSUFhQSxjQUFBLEVBQWdCLFNBQUMsSUFBRCxHQUFBO0FBRWQsVUFBQSwwRUFBQTtBQUFBLE1BRmdCLGNBQUEsUUFBUSxzQkFBQSxnQkFBZ0IsdUJBQUEsaUJBQWlCLGNBQUEsUUFBUSx5QkFBQSxpQkFFakUsQ0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLGVBQWUsQ0FBQyxjQUFoQixDQUFBLENBQVQsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFDLENBQUEseUJBQUQsQ0FBMkIsTUFBM0IsRUFBbUMsTUFBbkMsRUFBMkMsY0FBM0MsQ0FBSDtlQUNNLElBQUEsT0FBQSxDQUFRLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxPQUFELEVBQVUsTUFBVixHQUFBO0FBRVYsZ0JBQUEsNEJBQUE7QUFBQSxZQUFBLGVBQUEsR0FBa0Is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

//# sourceURL=/home/nick/.atom/packages/autocomplete-asciidoc/lib/completion-provider.coffee
