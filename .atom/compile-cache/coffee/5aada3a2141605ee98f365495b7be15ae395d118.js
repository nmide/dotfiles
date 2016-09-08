(function() {
  var CompositeDisposable, HtmlPreviewView, url;

  url = require('url');

  CompositeDisposable = require('atom').CompositeDisposable;

  HtmlPreviewView = require('./atom-html-preview-view');

  module.exports = {
    config: {
      triggerOnSave: {
        type: 'boolean',
        description: 'Watch will trigger on save.',
        "default": false
      },
      preserveWhiteSpaces: {
        type: 'boolean',
        description: 'Preserve white spaces and line endings.',
        "default": false
      },
      fileEndings: {
        type: 'array',
        title: 'Preserve file endings',
        description: 'File endings to preserve',
        "default": ["c", "h"],
        items: {
          type: 'string'
        }
      },
      scrollToCursor: {
        type: 'boolean',
        description: 'Attempts to scroll the webview to the section of your HTML you are editing based on your cursor\'s position.',
        "default": false
      },
      enableMathJax: {
        type: 'boolean',
        description: 'Enable MathJax inline rendering \\f$ \\pi \\f$',
        "default": false
      }
    },
    htmlPreviewView: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          return _this.subscriptions.add(editor.onDidSave(function() {
            if ((typeof htmlPreviewView !== "undefined" && htmlPreviewView !== null) && htmlPreviewView instanceof HtmlPreviewView) {
              return htmlPreviewView.renderHTML();
            }
          }));
        };
      })(this)));
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'atom-html-preview:toggle': (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      return atom.workspace.addOpener(function(uriToOpen) {
        var error, host, pathname, protocol, _ref;
        try {
          _ref = url.parse(uriToOpen), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
        } catch (_error) {
          error = _error;
          return;
        }
        if (protocol !== 'html-preview:') {
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
          this.htmlPreviewView = new HtmlPreviewView({
            editorId: pathname.substring(1)
          });
        } else {
          this.htmlPreviewView = new HtmlPreviewView({
            filePath: pathname
          });
        }
        return htmlPreviewView;
      });
    },
    toggle: function() {
      var editor, previewPane, previousActivePane, uri;
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      uri = "html-preview://editor/" + editor.id;
      previewPane = atom.workspace.paneForURI(uri);
      if (previewPane) {
        previewPane.destroyItem(previewPane.itemForURI(uri));
        return;
      }
      previousActivePane = atom.workspace.getActivePane();
      return atom.workspace.open(uri, {
        split: 'right',
        searchAllPanes: true
      }).done(function(htmlPreviewView) {
        if (htmlPreviewView instanceof HtmlPreviewView) {
          htmlPreviewView.renderHTML();
          return previousActivePane.activate();
        }
      });
    },
    deactivate: function() {
      return this.subscriptions.dispose();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdG9tLWh0bWwtcHJldmlldy9saWIvYXRvbS1odG1sLXByZXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUF3QixPQUFBLENBQVEsS0FBUixDQUF4QixDQUFBOztBQUFBLEVBQ0Msc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQURELENBQUE7O0FBQUEsRUFHQSxlQUFBLEdBQXdCLE9BQUEsQ0FBUSwwQkFBUixDQUh4QixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxhQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxXQUFBLEVBQWEsNkJBRGI7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BREY7QUFBQSxNQUlBLG1CQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxXQUFBLEVBQWEseUNBRGI7QUFBQSxRQUVBLFNBQUEsRUFBUyxLQUZUO09BTEY7QUFBQSxNQVFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLE9BQU47QUFBQSxRQUNBLEtBQUEsRUFBTyx1QkFEUDtBQUFBLFFBRUEsV0FBQSxFQUFhLDBCQUZiO0FBQUEsUUFHQSxTQUFBLEVBQVMsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUhUO0FBQUEsUUFJQSxLQUFBLEVBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxRQUFOO1NBTEY7T0FURjtBQUFBLE1BZUEsY0FBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsV0FBQSxFQUFhLDhHQURiO0FBQUEsUUFFQSxTQUFBLEVBQVMsS0FGVDtPQWhC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

//# sourceURL=/home/nick/.atom/packages/atom-html-preview/lib/atom-html-preview.coffee
