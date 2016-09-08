(function() {
  var $, $$$, AtomHtmlPreviewView, CompositeDisposable, Disposable, ScrollView, fs, os, path, scrollInjectScript, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  fs = require('fs');

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, $$$ = _ref1.$$$, ScrollView = _ref1.ScrollView;

  path = require('path');

  os = require('os');

  scrollInjectScript = "<script>\n(function () {\n  var scriptTag = document.scripts[document.scripts.length - 1];\n  document.addEventListener('DOMContentLoaded',()=>{\n    var elem = document.createElement(\"span\")\n    try {\n      // Scroll to this current script tag\n      elem.style.width = 100\n      // Center the scrollY\n      elem.style.height = \"20vh\"\n      elem.style.marginTop = \"-20vh\"\n      elem.style.marginLeft = -100\n      elem.style.display = \"block\"\n      var par = scriptTag.parentNode\n      par.insertBefore(elem, scriptTag)\n      elem.scrollIntoView()\n    } catch (error) {}\n    try { elem.remove() } catch (error) {}\n    try { scriptTag.remove() } catch (error) {}\n  }, false)\n})();\n</script>";

  module.exports = AtomHtmlPreviewView = (function(_super) {
    __extends(AtomHtmlPreviewView, _super);

    atom.deserializers.add(AtomHtmlPreviewView);

    AtomHtmlPreviewView.prototype.editorSub = null;

    AtomHtmlPreviewView.prototype.onDidChangeTitle = function() {
      return new Disposable();
    };

    AtomHtmlPreviewView.prototype.onDidChangeModified = function() {
      return new Disposable();
    };

    AtomHtmlPreviewView.deserialize = function(state) {
      return new AtomHtmlPreviewView(state);
    };

    AtomHtmlPreviewView.content = function() {
      return this.div({
        "class": 'atom-html-preview native-key-bindings',
        tabindex: -1
      }, (function(_this) {
        return function() {
          var style;
          style = 'z-index: 2; padding: 2em;';
          _this.div({
            "class": 'show-error',
            style: style
          });
          return _this.div({
            "class": 'show-loading',
            style: style
          }, "Loading HTML");
        };
      })(this));
    };

    function AtomHtmlPreviewView(_arg) {
      var filePath, handles;
      this.editorId = _arg.editorId, filePath = _arg.filePath;
      this.handleEvents = __bind(this.handleEvents, this);
      AtomHtmlPreviewView.__super__.constructor.apply(this, arguments);
      if (this.editorId != null) {
        this.resolveEditor(this.editorId);
        this.tmpPath = this.getPath();
      } else {
        if (atom.workspace != null) {
          this.subscribeToFilePath(filePath);
        } else {
          atom.packages.onDidActivatePackage((function(_this) {
            return function() {
              return _this.subscribeToFilePath(filePath);
            };
          })(this));
        }
      }
      handles = $("atom-pane-resize-handle");
      handles.on('mousedown', (function(_this) {
        return function() {
          return _this.onStartedResize();
        };
      })(this));
    }

    AtomHtmlPreviewView.prototype.onStartedResize = function() {
      this.css({
        'pointer-events': 'none'
      });
      return document.addEventListener('mouseup', this.onStoppedResizing.bind(this));
    };

    AtomHtmlPreviewView.prototype.onStoppedResizing = function() {
      this.css({
        'pointer-events': 'all'
      });
      return document.removeEventListener('mouseup', this.onStoppedResizing);
    };

    AtomHtmlPreviewView.prototype.serialize = function() {
      return {
        deserializer: 'AtomHtmlPreviewView',
        filePath: this.getPath(),
        editorId: this.editorId
      };
    };

    AtomHtmlPreviewView.prototype.destroy = function() {
      if (typeof editorSub !== "undefined" && editorSub !== null) {
        return this.editorSub.dispose();
      }
    };

    AtomHtmlPreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.trigger('title-changed');
      this.handleEvents();
      return this.renderHTML();
    };

    AtomHtmlPreviewView.prototype.resolveEditor = function(editorId) {
      var resolve;
      resolve = (function(_this) {
        return function() {
          var _ref2, _ref3;
          _this.editor = _this.editorForId(editorId);
          if (_this.editor != null) {
            if (_this.editor != null) {
              _this.trigger('title-changed');
            }
            return _this.handleEvents();
          } else {
            return (_ref2 = atom.workspace) != null ? (_ref3 = _ref2.paneForItem(_this)) != null ? _ref3.destroyItem(_this) : void 0 : void 0;
          }
        };
      })(this);
      if (atom.workspace != null) {
        return resolve();
      } else {
        return atom.packages.onDidActivatePackage((function(_this) {
          return function() {
            resolve();
            return _this.renderHTML();
          };
        })(this));
      }
    };

    AtomHtmlPreviewView.prototype.editorForId = function(editorId) {
      var editor, _i, _len, _ref2, _ref3;
      _ref2 = atom.workspace.getTextEditors();
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        editor = _ref2[_i];
        if (((_ref3 = editor.id) != null ? _ref3.toString() : void 0) === editorId.toString()) {
          return editor;
        }
      }
      return null;
    };

    AtomHtmlPreviewView.prototype.handleEvents = function() {
      var changeHandler, contextMenuClientX, contextMenuClientY;
      contextMenuClientX = 0;
      contextMenuClientY = 0;
      this.on('contextmenu', function(event) {
        contextMenuClientY = event.clientY;
        return contextMenuClientX = event.clientX;
      });
      atom.commands.add(this.element, {
        'atom-html-preview:open-devtools': (function(_this) {
          return function() {
            return _this.webview.openDevTools();
          };
        })(this),
        'atom-html-preview:inspect': (function(_this) {
          return function() {
            return _this.webview.inspectElement(contextMenuClientX, contextMenuClientY);
          };
        })(this),
        'atom-html-preview:print': (function(_this) {
          return function() {
            return _this.webview.print();
          };
        })(this)
      });
      changeHandler = (function(_this) {
        return function() {
          var pane;
          _this.renderHTML();
          pane = atom.workspace.paneForURI(_this.getURI());
          if ((pane != null) && pane !== atom.workspace.getActivePane()) {
            return pane.activateItem(_this);
          }
        };
      })(this);
      this.editorSub = new CompositeDisposable;
      if (this.editor != null) {
        if (atom.config.get("atom-html-preview.triggerOnSave")) {
          this.editorSub.add(this.editor.onDidSave(changeHandler));
        } else {
          this.editorSub.add(this.editor.onDidStopChanging(changeHandler));
        }
        return this.editorSub.add(this.editor.onDidChangePath((function(_this) {
          return function() {
            return _this.trigger('title-changed');
          };
        })(this)));
      }
    };

    AtomHtmlPreviewView.prototype.renderHTML = function() {
      this.showLoading();
      if (this.editor != null) {
        if (!atom.config.get("atom-html-preview.triggerOnSave") && (this.editor.getPath() != null)) {
          return this.save(this.renderHTMLCode);
        } else {
          return this.renderHTMLCode();
        }
      }
    };

    AtomHtmlPreviewView.prototype.save = function(callback) {
      var column, editorText, error, fileEnding, findTagBefore, firstSelection, lastTagRE, offset, out, outPath, row, tagIndex, tagRE, _ref2;
      outPath = path.resolve(path.join(os.tmpdir(), this.editor.getTitle() + ".html"));
      out = "";
      fileEnding = this.editor.getTitle().split(".").pop();
      if (atom.config.get("atom-html-preview.enableMathJax")) {
        out += "<script type=\"text/x-mathjax-config\">\nMathJax.Hub.Config({\ntex2jax: {inlineMath: [['\\\\f$','\\\\f$']]},\nmenuSettings: {zoom: 'Click'}\n});\n</script>\n<script type=\"text/javascript\"\nsrc=\"http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML\">\n</script>";
      }
      if (atom.config.get("atom-html-preview.preserveWhiteSpaces") && __indexOf.call(atom.config.get("atom-html-preview.fileEndings"), fileEnding) >= 0) {
        out += "<style type=\"text/css\">\nbody { white-space: pre; }\n</style>";
      } else {
        out += "<base href=\"" + this.getPath() + "\">";
      }
      editorText = this.editor.getText();
      firstSelection = this.editor.getSelections()[0];
      _ref2 = firstSelection.getBufferRange().start, row = _ref2.row, column = _ref2.column;
      if (atom.config.get("atom-html-preview.scrollToCursor")) {
        try {
          offset = this._getOffset(editorText, row, column);
          tagRE = /<((\/[\$\w\-])|br|input|link)\/?>/.source;
          lastTagRE = RegExp("" + tagRE + "(?![\\s\\S]*" + tagRE + ")", "i");
          findTagBefore = function(beforeIndex) {
            var matchedClosingTag;
            matchedClosingTag = editorText.slice(0, beforeIndex).match(lastTagRE);
            if (matchedClosingTag) {
              return matchedClosingTag.index + matchedClosingTag[0].length;
            } else {
              return -1;
            }
          };
          tagIndex = findTagBefore(offset);
          if (tagIndex > -1) {
            editorText = "" + (editorText.slice(0, tagIndex)) + "\n" + scrollInjectScript + "\n" + (editorText.slice(tagIndex));
          }
        } catch (_error) {
          error = _error;
          return -1;
        }
      }
      out += editorText;
      this.tmpPath = outPath;
      return fs.writeFile(outPath, out, (function(_this) {
        return function() {
          try {
            return _this.renderHTMLCode();
          } catch (_error) {
            error = _error;
            return _this.showError(error);
          }
        };
      })(this));
    };

    AtomHtmlPreviewView.prototype.renderHTMLCode = function() {
      var error, webview;
      if (this.webview == null) {
        webview = document.createElement("webview");
        webview.setAttribute("sandbox", "allow-scripts allow-same-origin");
        webview.setAttribute("style", "height: 100%");
        this.webview = webview;
        this.append($(webview));
      }
      this.webview.src = this.tmpPath;
      try {
        this.find('.show-error').hide();
        this.find('.show-loading').hide();
        this.webview.reload();
      } catch (_error) {
        error = _error;
        null;
      }
      return atom.commands.dispatch('atom-html-preview', 'html-changed');
    };

    AtomHtmlPreviewView.prototype._getOffset = function(text, row, column) {
      var line_re, match, match_index, offset;
      if (column == null) {
        column = 0;
      }
      line_re = /\n/g;
      match_index = null;
      while (row--) {
        if (match = line_re.exec(text)) {
          match_index = match.index;
        } else {
          return -1;
        }
      }
      offset = match_index + column;
      if (offset < text.length) {
        return offset;
      } else {
        return -1;
      }
    };

    AtomHtmlPreviewView.prototype.getTitle = function() {
      if (this.editor != null) {
        return "" + (this.editor.getTitle()) + " Preview";
      } else {
        return "HTML Preview";
      }
    };

    AtomHtmlPreviewView.prototype.getURI = function() {
      return "html-preview://editor/" + this.editorId;
    };

    AtomHtmlPreviewView.prototype.getPath = function() {
      if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    AtomHtmlPreviewView.prototype.showError = function(result) {
      var failureMessage;
      failureMessage = result != null ? result.message : void 0;
      return this.find('.show-error').html($$$(function() {
        this.h2('Previewing HTML Failed');
        if (failureMessage != null) {
          return this.h3(failureMessage);
        }
      })).show();
    };

    AtomHtmlPreviewView.prototype.showLoading = function() {
      return this.find('.show-loading').show();
    };

    return AtomHtmlPreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdG9tLWh0bWwtcHJldmlldy9saWIvYXRvbS1odG1sLXByZXZpZXctdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUhBQUE7SUFBQTs7O3lKQUFBOztBQUFBLEVBQUEsRUFBQSxHQUF3QixPQUFBLENBQVEsSUFBUixDQUF4QixDQUFBOztBQUFBLEVBQ0EsT0FBb0MsT0FBQSxDQUFRLE1BQVIsQ0FBcEMsRUFBQywyQkFBQSxtQkFBRCxFQUFzQixrQkFBQSxVQUR0QixDQUFBOztBQUFBLEVBRUEsUUFBd0IsT0FBQSxDQUFRLHNCQUFSLENBQXhCLEVBQUMsVUFBQSxDQUFELEVBQUksWUFBQSxHQUFKLEVBQVMsbUJBQUEsVUFGVCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUF3QixPQUFBLENBQVEsTUFBUixDQUh4QixDQUFBOztBQUFBLEVBSUEsRUFBQSxHQUF3QixPQUFBLENBQVEsSUFBUixDQUp4QixDQUFBOztBQUFBLEVBTUEsa0JBQUEsR0FBcUIsMnNCQU5yQixDQUFBOztBQUFBLEVBK0JBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwwQ0FBQSxDQUFBOztBQUFBLElBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFuQixDQUF1QixtQkFBdkIsQ0FBQSxDQUFBOztBQUFBLGtDQUVBLFNBQUEsR0FBc0IsSUFGdEIsQ0FBQTs7QUFBQSxrQ0FHQSxnQkFBQSxHQUFzQixTQUFBLEdBQUE7YUFBTyxJQUFBLFVBQUEsQ0FBQSxFQUFQO0lBQUEsQ0FIdEIsQ0FBQTs7QUFBQSxrQ0FJQSxtQkFBQSxHQUFzQixTQUFBLEdBQUE7YUFBTyxJQUFBLFVBQUEsQ0FBQSxFQUFQO0lBQUEsQ0FKdEIsQ0FBQTs7QUFBQSxJQU1BLG1CQUFDLENBQUEsV0FBRCxHQUFjLFNBQUMsS0FB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

//# sourceURL=/home/nick/.atom/packages/atom-html-preview/lib/atom-html-preview-view.coffee
