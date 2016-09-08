(function() {
  var AsciiDocPreviewView, CompositeDisposable, fs, isAsciiDocPreviewView, path, pdfconverter, renderer, url,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  CompositeDisposable = require('atom').CompositeDisposable;

  url = require('url');

  path = require('path');

  fs = require('fs-plus');

  pdfconverter = require('./pdf-converter');

  AsciiDocPreviewView = null;

  renderer = null;

  isAsciiDocPreviewView = function(object) {
    if (AsciiDocPreviewView == null) {
      AsciiDocPreviewView = require('./asciidoc-preview-view');
    }
    return object instanceof AsciiDocPreviewView;
  };

  module.exports = {
    subscriptions: null,
    activate: function() {
      var extension, fileExtensions, previewFile, _i, _len;
      this.subscriptions = new CompositeDisposable;
      if (parseFloat(atom.getVersion()) < 1.7) {
        atom.deserializers.add({
          name: 'AsciiDocPreviewView',
          deserialize: module.exports.createAsciiDocPreviewView.bind(module.exports)
        });
      }
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'asciidoc-preview:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this),
        'asciidoc-preview:toggle-show-title': function() {
          var keyPath;
          keyPath = 'asciidoc-preview.showTitle';
          return atom.config.set(keyPath, !atom.config.get(keyPath));
        },
        'asciidoc-preview:toggle-compat-mode': function() {
          var keyPath;
          keyPath = 'asciidoc-preview.compatMode';
          return atom.config.set(keyPath, !atom.config.get(keyPath));
        },
        'asciidoc-preview:set-toc-none': function() {
          return atom.config.set('asciidoc-preview.tocType', 'none');
        },
        'asciidoc-preview:set-toc-preamble': function() {
          return atom.config.set('asciidoc-preview.tocType', 'preamble');
        },
        'asciidoc-preview:set-toc-macro': function() {
          return atom.config.set('asciidoc-preview.tocType', 'macro');
        },
        'asciidoc-preview:set-section-numbering-enabled-by-default': function() {
          return atom.config.set('asciidoc-preview.sectionNumbering', 'enabled-by-default');
        },
        'asciidoc-preview:set-section-numbering-always-enabled': function() {
          return atom.config.set('asciidoc-preview.sectionNumbering', 'always-enabled');
        },
        'asciidoc-preview:set-section-numbering-always-disabled': function() {
          return atom.config.set('asciidoc-preview.sectionNumbering', 'always-disabled');
        },
        'asciidoc-preview:set-section-numbering-not-specified': function() {
          return atom.config.set('asciidoc-preview.sectionNumbering', 'not-specified');
        },
        'asciidoc-preview:toggle-skip-front-matter': function() {
          var keyPath;
          keyPath = 'asciidoc-preview.skipFrontMatter';
          return atom.config.set(keyPath, !atom.config.get(keyPath));
        },
        'asciidoc-preview:toggle-render-on-save-only': function() {
          var keyPath;
          keyPath = 'asciidoc-preview.renderOnSaveOnly';
          return atom.config.set(keyPath, !atom.config.get(keyPath));
        }
      }));
      previewFile = this.previewFile.bind(this);
      fileExtensions = ['adoc', 'asciidoc', 'ad', 'asc', 'txt'];
      for (_i = 0, _len = fileExtensions.length; _i < _len; _i++) {
        extension = fileExtensions[_i];
        this.subscriptions.add(atom.commands.add(".tree-view .file .name[data-name$=\\." + extension + "]", 'asciidoc-preview:preview-file', previewFile));
        this.subscriptions.add(atom.commands.add(".tree-view .file .name[data-name$=\\." + extension + "]", 'asciidoc-preview:export-pdf', pdfconverter.convert));
      }
      return atom.workspace.addOpener((function(_this) {
        return function(uriToOpen) {
          var error, host, pathname, protocol, _ref;
          try {
            _ref = url.parse(uriToOpen), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
          } catch (_error) {
            error = _error;
            return;
          }
          if (protocol !== 'asciidoc-preview:') {
            return;
          }
          try {
            if (pathname) {
              pathname = decodeURI(pathname);
            }
          } catch (_error) {
            error = _error;
            return;
          }
          if (host === 'editor') {
            return _this.createAsciiDocPreviewView({
              editorId: pathname.substring(1)
            });
          } else {
            return _this.createAsciiDocPreviewView({
              filePath: pathname
            });
          }
        };
      })(this));
    },
    createAsciiDocPreviewView: function(state) {
      if (state.editorId || fs.isFileSync(state.filePath)) {
        if (AsciiDocPreviewView == null) {
          AsciiDocPreviewView = require('./asciidoc-preview-view');
        }
        return new AsciiDocPreviewView(state);
      }
    },
    toggle: function() {
      var editor, grammars, _ref, _ref1;
      if (isAsciiDocPreviewView(atom.workspace.getActivePaneItem())) {
        atom.workspace.destroyActivePaneItem();
        return;
      }
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      grammars = (_ref = atom.config.get('asciidoc-preview.grammars')) != null ? _ref : [];
      if (_ref1 = editor.getGrammar().scopeName, __indexOf.call(grammars, _ref1) < 0) {
        return;
      }
      if (!this.removePreviewForEditor(editor)) {
        return this.addPreviewForEditor(editor);
      }
    },
    uriForEditor: function(editor) {
      return "asciidoc-preview://editor/" + editor.id;
    },
    removePreviewForEditor: function(editor) {
      var previewPane, uri;
      uri = this.uriForEditor(editor);
      previewPane = atom.workspace.paneForURI(uri);
      if (previewPane != null) {
        previewPane.destroyItem(previewPane.itemForURI(uri));
        return true;
      } else {
        return false;
      }
    },
    addPreviewForEditor: function(editor) {
      var options, previousActivePane, uri;
      uri = this.uriForEditor(editor);
      previousActivePane = atom.workspace.getActivePane();
      options = {
        searchAllPanes: true,
        split: atom.config.get('asciidoc-preview.openInPane')
      };
      return atom.workspace.open(uri, options).then(function(asciidocPreviewView) {
        if (isAsciiDocPreviewView(asciidocPreviewView)) {
          return previousActivePane.activate();
        }
      });
    },
    previewFile: function(_arg) {
      var editor, filePath, target, _i, _len, _ref;
      target = _arg.target;
      filePath = target.dataset.path;
      if (!filePath) {
        return;
      }
      _ref = atom.workspace.getTextEditors();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        editor = _ref[_i];
        if (!(editor.getPath() === filePath)) {
          continue;
        }
        this.addPreviewForEditor(editor);
        return;
      }
      return atom.workspace.open("asciidoc-preview://" + (encodeURI(filePath)), {
        searchAllPanes: true
      });
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzR0FBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUhMLENBQUE7O0FBQUEsRUFJQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBSmYsQ0FBQTs7QUFBQSxFQU1BLG1CQUFBLEdBQXNCLElBTnRCLENBQUE7O0FBQUEsRUFPQSxRQUFBLEdBQVcsSUFQWCxDQUFBOztBQUFBLEVBU0EscUJBQUEsR0FBd0IsU0FBQyxNQUFELEdBQUE7O01BQ3RCLHNCQUF1QixPQUFBLENBQVEseUJBQVI7S0FBdkI7V0FDQSxNQUFBLFlBQWtCLG9CQUZJO0VBQUEsQ0FUeEIsQ0FBQTs7QUFBQSxFQWFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLGFBQUEsRUFBZSxJQUFmO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxnREFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQUFBO0FBRUEsTUFBQSxJQUFHLFVBQUEsQ0FBVyxJQUFJLENBQUMsVUFBTCxDQUFBLENBQVgsQ0FBQSxHQUFnQyxHQUFuQztBQUNFLFFBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUNFO0FBQUEsVUFBQSxJQUFBLEVBQU0scUJBQU47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

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/main.coffee
