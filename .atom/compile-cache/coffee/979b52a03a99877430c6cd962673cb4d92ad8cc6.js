(function() {
  var SymbolsTreeView;

  SymbolsTreeView = require('./symbols-tree-view');

  module.exports = {
    config: {
      autoToggle: {
        type: 'boolean',
        "default": false,
        description: 'If this option is enabled then symbols-tree-view will auto open when you open files.'
      },
      scrollAnimation: {
        type: 'boolean',
        "default": true,
        description: 'If this option is enabled then when you click the item in symbols-tree it will scroll to the destination gradually.'
      },
      autoHide: {
        type: 'boolean',
        "default": false,
        description: 'If this option is enabled then symbols-tree-view is always hidden unless mouse hover over it.'
      },
      zAutoHideTypes: {
        title: 'AutoHideTypes',
        type: 'string',
        description: 'Here you can specify a list of types that will be hidden by default (ex: "variable class")',
        "default": ''
      },
      sortByNameScopes: {
        type: 'string',
        description: 'Here you can specify a list of scopes that will be sorted by name (ex: "text.html.php")',
        "default": ''
      },
      defaultWidth: {
        type: 'number',
        description: 'Width of the panel (needs Atom restart)',
        "default": 200
      }
    },
    symbolsTreeView: null,
    activate: function(state) {
      this.symbolsTreeView = new SymbolsTreeView(state.symbolsTreeViewState);
      atom.commands.add('atom-workspace', {
        'symbols-tree-view:toggle': (function(_this) {
          return function() {
            return _this.symbolsTreeView.toggle();
          };
        })(this)
      });
      atom.commands.add('atom-workspace', {
        'symbols-tree-view:show': (function(_this) {
          return function() {
            return _this.symbolsTreeView.showView();
          };
        })(this)
      });
      atom.commands.add('atom-workspace', {
        'symbols-tree-view:hide': (function(_this) {
          return function() {
            return _this.symbolsTreeView.hideView();
          };
        })(this)
      });
      atom.config.observe('tree-view.showOnRightSide', (function(_this) {
        return function(value) {
          if (_this.symbolsTreeView.hasParent()) {
            _this.symbolsTreeView.remove();
            _this.symbolsTreeView.populate();
            return _this.symbolsTreeView.attach();
          }
        };
      })(this));
      return atom.config.observe("symbols-tree-view.autoToggle", (function(_this) {
        return function(enabled) {
          if (enabled) {
            if (!_this.symbolsTreeView.hasParent()) {
              return _this.symbolsTreeView.toggle();
            }
          } else {
            if (_this.symbolsTreeView.hasParent()) {
              return _this.symbolsTreeView.toggle();
            }
          }
        };
      })(this));
    },
    deactivate: function() {
      return this.symbolsTreeView.destroy();
    },
    serialize: function() {
      return {
        symbolsTreeViewState: this.symbolsTreeView.serialize()
      };
    },
    getProvider: function() {
      var view;
      view = this.symbolsTreeView;
      return {
        providerName: 'symbols-tree-view',
        getSuggestionForWord: (function(_this) {
          return function(textEditor, text, range) {
            return {
              range: range,
              callback: function() {
                return view.focusClickedTag.bind(view)(textEditor, text);
              }
            };
          };
        })(this)
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9zeW1ib2xzLXRyZWUtdmlldy9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZUFBQTs7QUFBQSxFQUFBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHFCQUFSLENBQWxCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsc0ZBRmI7T0FERjtBQUFBLE1BSUEsZUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7QUFBQSxRQUVBLFdBQUEsRUFBYSxxSEFGYjtPQUxGO0FBQUEsTUFRQSxRQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLCtGQUZiO09BVEY7QUFBQSxNQVlBLGNBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGVBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxXQUFBLEVBQWEsNEZBRmI7QUFBQSxRQUdBLFNBQUEsRUFBUyxFQUhUO09BYkY7QUFBQSxNQWlCQSxnQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsV0FBQSxFQUFhLHlGQURiO0FBQUEsUUFFQSxTQUFBLEVBQVMsRUFGVDtPQWxCRjtBQUFBLE1BcUJBLFlBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFdBQUEsRUFBYSx5Q0FEYjtBQUFBLFFB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

//# sourceURL=/home/nick/.atom/packages/symbols-tree-view/lib/main.coffee
