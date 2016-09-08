(function() {
  var $, $$$, AsciiDocPreviewView, CompositeDisposable, Disposable, Emitter, File, ScrollView, fs, mustache, opn, path, renderer, _, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Emitter = _ref.Emitter, Disposable = _ref.Disposable, CompositeDisposable = _ref.CompositeDisposable, File = _ref.File;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, $$$ = _ref1.$$$, ScrollView = _ref1.ScrollView;

  path = require('path');

  fs = require('fs-plus');

  _ = require('underscore-plus');

  mustache = require('mustache');

  opn = require('opn');

  renderer = require('./renderer');

  module.exports = AsciiDocPreviewView = (function(_super) {
    __extends(AsciiDocPreviewView, _super);

    AsciiDocPreviewView.content = function() {
      return this.div({
        "class": 'asciidoc-preview native-key-bindings',
        tabindex: -1
      });
    };

    function AsciiDocPreviewView(_arg) {
      this.editorId = _arg.editorId, this.filePath = _arg.filePath;
      AsciiDocPreviewView.__super__.constructor.apply(this, arguments);
      this.emitter = new Emitter;
      this.disposables = new CompositeDisposable;
      this.loaded = false;
    }

    AsciiDocPreviewView.prototype.attached = function() {
      if (this.isAttached) {
        return;
      }
      this.isAttached = true;
      if (this.editorId != null) {
        return this.resolveEditor(this.editorId);
      } else if (atom.workspace != null) {
        return this.subscribeToFilePath(this.filePath);
      } else {
        return this.disposables.add(atom.packages.onDidActivateInitialPackages((function(_this) {
          return function() {
            return _this.subscribeToFilePath(_this.filePath);
          };
        })(this)));
      }
    };

    AsciiDocPreviewView.prototype.serialize = function() {
      var _ref2;
      return {
        deserializer: 'AsciiDocPreviewView',
        filePath: (_ref2 = this.getPath()) != null ? _ref2 : this.filePath,
        editorId: this.editorId
      };
    };

    AsciiDocPreviewView.prototype.destroy = function() {
      return this.disposables.dispose();
    };

    AsciiDocPreviewView.prototype.onDidChangeTitle = function(callback) {
      return this.emitter.on('did-change-title', callback);
    };

    AsciiDocPreviewView.prototype.onDidChangeModified = function(callback) {
      return new Disposable;
    };

    AsciiDocPreviewView.prototype.onDidChangeAsciidoc = function(callback) {
      return this.emitter.on('did-change-asciidoc', callback);
    };

    AsciiDocPreviewView.prototype.subscribeToFilePath = function(filePath) {
      this.file = new File(filePath);
      this.emitter.emit('did-change-title');
      this.handleEvents();
      return this.renderAsciiDoc();
    };

    AsciiDocPreviewView.prototype.resolveEditor = function(editorId) {
      var resolve;
      resolve = (function(_this) {
        return function() {
          var _ref2, _ref3;
          _this.editor = _this.editorForId(editorId);
          if (_this.editor != null) {
            if (_this.editor != null) {
              _this.emitter.emit('did-change-title');
            }
            _this.handleEvents();
            return _this.renderAsciiDoc();
          } else {
            return (_ref2 = atom.workspace) != null ? (_ref3 = _ref2.paneForItem(_this)) != null ? _ref3.destroyItem(_this) : void 0 : void 0;
          }
        };
      })(this);
      if (atom.workspace != null) {
        return resolve();
      } else {
        return this.disposables.add(atom.packages.onDidActivateInitialPackages(resolve));
      }
    };

    AsciiDocPreviewView.prototype.editorForId = function(editorId) {
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

    AsciiDocPreviewView.prototype.handleEvents = function() {
      var buffer, changeHandler, renderOnChange;
      this.disposables.add(atom.grammars.onDidAddGrammar((function(_this) {
        return function() {
          return _.debounce((function() {
            return _this.renderAsciiDoc();
          }), 250);
        };
      })(this)));
      this.disposables.add(atom.grammars.onDidUpdateGrammar(_.debounce(((function(_this) {
        return function() {
          return _this.renderAsciiDoc();
        };
      })(this)), 250)));
      this.disposables.add(atom.commands.add(this.element, {
        'core:move-up': (function(_this) {
          return function() {
            return _this.scrollUp();
          };
        })(this),
        'core:move-down': (function(_this) {
          return function() {
            return _this.scrollDown();
          };
        })(this),
        'core:save-as': (function(_this) {
          return function(event) {
            event.stopPropagation();
            return _this.saveAs();
          };
        })(this),
        'core:copy': (function(_this) {
          return function(event) {
            if (_this.copyToClipboard()) {
              return event.stopPropagation();
            }
          };
        })(this),
        'asciidoc-preview:zoom-in': (function(_this) {
          return function() {
            var zoomLevel;
            zoomLevel = parseFloat(_this.css('zoom')) || 1;
            return _this.css('zoom', zoomLevel + .1);
          };
        })(this),
        'asciidoc-preview:zoom-out': (function(_this) {
          return function() {
            var zoomLevel;
            zoomLevel = parseFloat(_this.css('zoom')) || 1;
            return _this.css('zoom', zoomLevel - .1);
          };
        })(this),
        'asciidoc-preview:reset-zoom': (function(_this) {
          return function() {
            return _this.css('zoom', 1);
          };
        })(this)
      }));
      changeHandler = (function(_this) {
        return function() {
          var pane;
          _this.renderAsciiDoc();
          pane = atom.workspace.paneForItem(_this);
          if ((pane != null) && pane !== atom.workspace.getActivePane()) {
            return pane.activateItem(_this);
          }
        };
      })(this);
      renderOnChange = function() {
        var saveOnly;
        saveOnly = atom.config.get('asciidoc-preview.renderOnSaveOnly');
        if (!saveOnly) {
          return changeHandler();
        }
      };
      if (this.file != null) {
        this.disposables.add(this.file.onDidChange(changeHandler));
      } else if (this.editor != null) {
        this.disposables.add(this.editor.onDidChangePath((function(_this) {
          return function() {
            return _this.emitter.emit('did-change-title');
          };
        })(this)));
        buffer = this.editor.getBuffer();
        this.disposables.add(buffer.onDidStopChanging(renderOnChange));
        this.disposables.add(buffer.onDidSave(changeHandler));
        this.disposables.add(buffer.onDidReload(renderOnChange));
      }
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.showTitle', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.compatMode', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.safeMode', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.defaultAttributes', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.tocType', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.frontMatter', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.sectionNumbering', changeHandler));
      this.disposables.add(atom.config.onDidChange('asciidoc-preview.forceExperimental', changeHandler));
      return this.disposables.add(atom.config.onDidChange('asciidoc-preview.baseDir', changeHandler));
    };

    AsciiDocPreviewView.prototype.renderAsciiDoc = function() {
      if (!this.loaded) {
        this.showLoading();
      }
      return this.getAsciiDocSource().then((function(_this) {
        return function(source) {
          if (source != null) {
            return _this.renderAsciiDocText(source);
          }
        };
      })(this));
    };

    AsciiDocPreviewView.prototype.getAsciiDocSource = function() {
      var _ref2;
      if ((_ref2 = this.file) != null ? _ref2.getPath() : void 0) {
        return this.file.read();
      } else if (this.editor != null) {
        return Promise.resolve(this.editor.getText());
      } else {
        return Promise.resolve(null);
      }
    };

    AsciiDocPreviewView.prototype.renderAsciiDocText = function(text) {
      return renderer.toHtml(text, this.getPath()).then((function(_this) {
        return function(html) {
          _this.loading = false;
          _this.html(html);
          _this.enableAnchorScroll(html, function(top) {
            return _this.scrollTop(top);
          });
          _this.emitter.emit('did-change-asciidoc');
          return _this.originalTrigger('asciidoc-preview:asciidoc-changed');
        };
      })(this));
    };

    AsciiDocPreviewView.prototype.enableAnchorScroll = function(html, callback) {
      var hrefLink, link, linkElement, target, top, _i, _len, _ref2, _results;
      html = $(html);
      _ref2 = html.find('a');
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        linkElement = _ref2[_i];
        link = $(linkElement);
        if (hrefLink = link.attr('href')) {
          if (!hrefLink.match(/^#/)) {
            continue;
          }
          if (target = $(hrefLink.replace(/(\/|:|\.|\[|\]|,|\)|\()/g, '\\$1'))) {
            if (!target.offset()) {
              continue;
            }
            top = target.offset().top - 43;
            _results.push((function(top) {
              return link.on('click', function(e) {
                top = top;
                return callback(top);
              });
            })(top));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    AsciiDocPreviewView.prototype.getTitle = function() {
      if (this.file != null) {
        return "" + (path.basename(this.getPath())) + " Preview";
      } else if (this.editor != null) {
        return "" + (this.editor.getTitle()) + " Preview";
      } else {
        return 'AsciiDoc Preview';
      }
    };

    AsciiDocPreviewView.prototype.getIconName = function() {
      return 'eye';
    };

    AsciiDocPreviewView.prototype.getURI = function() {
      if (this.file != null) {
        return "asciidoc-preview://" + (this.getPath());
      } else {
        return "asciidoc-preview://editor/" + this.editorId;
      }
    };

    AsciiDocPreviewView.prototype.getPath = function() {
      if (this.file != null) {
        return this.file.getPath();
      } else if (this.editor != null) {
        return this.editor.getPath();
      }
    };

    AsciiDocPreviewView.prototype.showLoading = function() {
      this.loading = true;
      if (this.firstloadingdone == null) {
        this.firstloadingdone = true;
        return this.html($$$(function() {
          return this.div({
            "class": 'asciidoc-spinner'
          }, 'Loading AsciiDoc\u2026');
        }));
      }
    };

    AsciiDocPreviewView.prototype.copyToClipboard = function() {
      var selectedNode, selectedText, selection;
      if (this.loading) {
        return false;
      }
      selection = window.getSelection();
      selectedText = selection.toString();
      selectedNode = selection.baseNode;
      if (selectedText && (selectedNode != null) && $.contains(this[0], selectedNode)) {
        return false;
      }
      atom.clipboard.write(this[0].innerHTML);
      return true;
    };

    AsciiDocPreviewView.prototype.saveAs = function() {
      var filePath, htmlFilePath, packPath, projectPath, templatePath;
      if (this.loading) {
        return;
      }
      filePath = this.getPath();
      if (filePath) {
        filePath += '.html';
      } else {
        filePath = 'untitled.adoc.html';
        if (projectPath = atom.project.getPaths()[0]) {
          filePath = path.join(projectPath, filePath);
        }
      }
      if (htmlFilePath = atom.showSaveDialogSync(filePath)) {
        packPath = atom.packages.resolvePackagePath('asciidoc-preview');
        templatePath = path.join(packPath, 'templates', 'default.html');
        return this.getAsciiDocSource().then((function(_this) {
          return function(source) {
            return renderer.toRawHtml(source, _this.getPath());
          };
        })(this)).then(function(html) {
          var model;
          return model = {
            content: html,
            style: fs.readFileSync(path.join(packPath, 'node_modules/asciidoctor.js/dist/css/asciidoctor.css'), 'utf8'),
            title: $(this.html).find('h1').text() || path.basename(htmlFilePath, '.html')
          };
        }).then(function(model) {
          var template;
          template = fs.readFileSync(templatePath, 'utf8');
          return mustache.to_html(template, model);
        }).then(function(htmlContent) {
          return fs.writeFileSync(htmlFilePath, htmlContent);
        }).then(function() {
          if (atom.config.get('asciidoc-preview.saveAsHtml.openInEditor')) {
            atom.workspace.open(htmlFilePath);
          }
          if (atom.config.get('asciidoc-preview.saveAsHtml.openInBrowser')) {
            return opn(filePath)["catch"](function(error) {
              atom.notifications.addError(error.toString(), {
                detail: (error != null ? error.stack : void 0) || '',
                dismissable: true
              });
              return console.error(error);
            });
          }
        });
      }
    };

    return AsciiDocPreviewView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9hc2NpaWRvYy1wcmV2aWV3LXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBJQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFtRCxPQUFBLENBQVEsTUFBUixDQUFuRCxFQUFDLGVBQUEsT0FBRCxFQUFVLGtCQUFBLFVBQVYsRUFBc0IsMkJBQUEsbUJBQXRCLEVBQTJDLFlBQUEsSUFBM0MsQ0FBQTs7QUFBQSxFQUNBLFFBQXVCLE9BQUEsQ0FBUSxzQkFBUixDQUF2QixFQUFDLFVBQUEsQ0FBRCxFQUFJLFlBQUEsR0FBSixFQUFTLG1CQUFBLFVBRFQsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FITCxDQUFBOztBQUFBLEVBSUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUpKLENBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVIsQ0FMWCxDQUFBOztBQUFBLEVBTUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxLQUFSLENBTk4sQ0FBQTs7QUFBQSxFQU9BLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQVBYLENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osMENBQUEsQ0FBQTs7QUFBQSxJQUFBLG1CQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxzQ0FBUDtBQUFBLFFBQStDLFFBQUEsRUFBVSxDQUFBLENBQXpEO09BQUwsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFHYSxJQUFB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

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/asciidoc-preview-view.coffee
