(function() {
  var CSON, CompositeDisposable, GrammarHelper, generator, path;

  CompositeDisposable = require('atom').CompositeDisposable;

  CSON = require('season');

  GrammarHelper = require('./grammar-helper');

  generator = require('./code-block-generator');

  path = require('path');

  module.exports = {
    config: {
      liveReload: {
        title: '[Only on Developer Mode] Grammars live reload',
        type: 'boolean',
        "default": false
      }
    },
    subscriptions: null,
    liveReloadSubscriptions: null,
    activate: function(state) {
      if (!(atom.inDevMode() && !atom.inSpecMode())) {
        return;
      }
      this.subscriptions = new CompositeDisposable;
      this.helper = new GrammarHelper('../grammars/repositories/', '../grammars/');
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'asciidoc-grammar:compile-grammar-and-reload': (function(_this) {
          return function() {
            return _this.compileGrammar();
          };
        })(this),
        'asciidoc-grammar:toggle-live-reload': function() {
          var keyPath;
          keyPath = 'language-asciidoc.liveReload';
          return atom.config.set(keyPath, !atom.config.get(keyPath));
        }
      }));
      return this.subscriptions.add(atom.config.observe('language-asciidoc.liveReload', (function(_this) {
        return function(newValue) {
          var _ref;
          if (!atom.inDevMode()) {
            return;
          }
          if (newValue) {
            _this.compileGrammar();
            _this.liveReloadSubscriptions = new CompositeDisposable;
            return _this.startliveReload();
          } else {
            return (_ref = _this.liveReloadSubscriptions) != null ? _ref.dispose() : void 0;
          }
        };
      })(this)));
    },
    startliveReload: function() {
      if (!(atom.inDevMode() && !atom.inSpecMode() && atom.config.get('language-asciidoc.liveReload'))) {
        return;
      }
      return this.liveReloadSubscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          if (path.extname(editor.getTitle()) === '.cson') {
            return _this.liveReloadSubscriptions.add(editor.buffer.onDidSave(function() {
              return _this.compileGrammar();
            }));
          }
        };
      })(this)));
    },
    compileGrammar: function(debug) {
      var codeAsciidocBlocks, codeMarkdownBlocks, languages, rootGrammar;
      if (!(atom.inDevMode() && !atom.inSpecMode())) {
        return;
      }
      rootGrammar = this.helper.readGrammarFile('asciidoc-grammar.cson');
      rootGrammar.name = 'AsciiDoc';
      rootGrammar.scopeName = 'source.asciidoc';
      rootGrammar.fileTypes = ['ad', 'asc', 'adoc', 'asciidoc', 'adoc.txt'];
      this.helper.appendPartialGrammarsDirectory(rootGrammar, ['partials/', 'inlines/', 'blocks/', 'tables/']);
      languages = this.helper.readGrammarFile('languages.cson');
      codeAsciidocBlocks = generator.makeAsciidocBlocks(languages);
      rootGrammar.repository['source-asciidoctor'] = {
        patterns: codeAsciidocBlocks
      };
      codeMarkdownBlocks = generator.makeMarkdownBlocks(languages);
      rootGrammar.repository['source-markdown'] = {
        patterns: codeMarkdownBlocks
      };
      if (debug) {
        console.log(CSON.stringify(rootGrammar));
      }
      this.helper.writeGrammarFile(rootGrammar, 'language-asciidoc.cson');
      return this.reload();
    },
    reload: function() {
      var updatedPackage;
      atom.grammars.removeGrammarForScopeName('source.asciidoc');
      atom.grammars.removeGrammarForScopeName('source.asciidoc.properties');
      delete atom.packages.loadedPackages['language-asciidoc'];
      updatedPackage = atom.packages.loadPackage('language-asciidoc');
      updatedPackage.loadGrammarsSync();
      atom.workspace.getTextEditors().forEach(function(editor) {
        if (editor.getGrammar().packageName === 'language-asciidoc') {
          return editor.reloadGrammar();
        }
      });
      console.log('AsciiDoc grammars reloaded');
      return {
        deactivate: function() {
          var _ref;
          if ((_ref = this.liveReloadSubscriptions) != null) {
            _ref.dispose();
          }
          return this.subscriptions.dispose();
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseURBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxrQkFBUixDQUZoQixDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSx3QkFBUixDQUhaLENBQUE7O0FBQUEsRUFJQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FKUCxDQUFBOztBQUFBLEVBTUEsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTywrQ0FBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BREY7S0FERjtBQUFBLElBTUEsYUFBQSxFQUFlLElBTmY7QUFBQSxJQU9BLHVCQUFBLEVBQXlCLElBUHpCO0FBQUEsSUFTQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUEsQ0FBQSxDQUFjLElBQUksQ0FBQyxTQUFMLENBQUEsQ0FBQSxJQUFxQixDQUFBLElBQVEsQ0FBQyxVQUFMLENBQUEsQ0FBdkMsQ0FBQTtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBRmpCLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxhQUFBLENBQWMsMkJBQWQsRUFBMkMsY0FBM0Ms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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/lib/main.coffee
