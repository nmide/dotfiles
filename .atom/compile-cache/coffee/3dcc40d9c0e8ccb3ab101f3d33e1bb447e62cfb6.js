(function() {
  var $, Point, Range, SymbolsContextMenu, SymbolsTreeView, TagGenerator, TagParser, TreeView, View, jQuery, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), Point = _ref.Point, Range = _ref.Range;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, jQuery = _ref1.jQuery, View = _ref1.View;

  TreeView = require('./tree-view').TreeView;

  TagGenerator = require('./tag-generator');

  TagParser = require('./tag-parser');

  SymbolsContextMenu = require('./symbols-context-menu');

  module.exports = SymbolsTreeView = (function(_super) {
    __extends(SymbolsTreeView, _super);

    function SymbolsTreeView() {
      return SymbolsTreeView.__super__.constructor.apply(this, arguments);
    }

    SymbolsTreeView.content = function() {
      return this.div({
        "class": 'symbols-tree-view tool-panel focusable-panel'
      });
    };

    SymbolsTreeView.prototype.initialize = function() {
      this.treeView = new TreeView;
      this.append(this.treeView);
      this.cachedStatus = {};
      this.contextMenu = new SymbolsContextMenu;
      this.autoHideTypes = atom.config.get('symbols-tree-view.zAutoHideTypes');
      this.treeView.onSelect((function(_this) {
        return function(_arg) {
          var bottom, desiredScrollCenter, desiredScrollTop, done, editor, from, height, item, left, node, screenPosition, screenRange, step, to, top, width, _ref2;
          node = _arg.node, item = _arg.item;
          if (item.position.row >= 0 && (editor = atom.workspace.getActiveTextEditor())) {
            screenPosition = editor.screenPositionForBufferPosition(item.position);
            screenRange = new Range(screenPosition, screenPosition);
            _ref2 = editor.pixelRectForScreenRange(screenRange), top = _ref2.top, left = _ref2.left, height = _ref2.height, width = _ref2.width;
            bottom = top + height;
            desiredScrollCenter = top + height / 2;
            if (!((editor.getScrollTop() < desiredScrollCenter && desiredScrollCenter < editor.getScrollBottom()))) {
              desiredScrollTop = desiredScrollCenter - editor.getHeight() / 2;
            }
            from = {
              top: editor.getScrollTop()
            };
            to = {
              top: desiredScrollTop
            };
            step = function(now) {
              return editor.setScrollTop(now);
            };
            done = function() {
              editor.scrollToBufferPosition(item.position, {
                center: true
              });
              editor.setCursorBufferPosition(item.position);
              return editor.moveToFirstCharacterOfLine();
            };
            return jQuery(from).animate(to, {
              duration: _this.animationDuration,
              step: step,
              done: done
            });
          }
        };
      })(this));
      atom.config.observe('symbols-tree-view.scrollAnimation', (function(_this) {
        return function(enabled) {
          return _this.animationDuration = enabled ? 300 : 0;
        };
      })(this));
      this.minimalWidth = 5;
      this.originalWidth = atom.config.get('symbols-tree-view.defaultWidth');
      return atom.config.observe('symbols-tree-view.autoHide', (function(_this) {
        return function(autoHide) {
          if (!autoHide) {
            return _this.width(_this.originalWidth);
          } else {
            return _this.width(_this.minimalWidth);
          }
        };
      })(this));
    };

    SymbolsTreeView.prototype.getEditor = function() {
      return atom.workspace.getActiveTextEditor();
    };

    SymbolsTreeView.prototype.getScopeName = function() {
      var _ref2, _ref3;
      return (_ref2 = atom.workspace.getActiveTextEditor()) != null ? (_ref3 = _ref2.getGrammar()) != null ? _ref3.scopeName : void 0 : void 0;
    };

    SymbolsTreeView.prototype.populate = function() {
      var editor, filePath;
      if (!(editor = this.getEditor())) {
        return this.hide();
      } else {
        filePath = editor.getPath();
        this.generateTags(filePath);
        this.show();
        this.onEditorSave = editor.onDidSave((function(_this) {
          return function(state) {
            filePath = editor.getPath();
            return _this.generateTags(filePath);
          };
        })(this));
        return this.onChangeRow = editor.onDidChangeCursorPosition((function(_this) {
          return function(_arg) {
            var newBufferPosition, oldBufferPosition;
            oldBufferPosition = _arg.oldBufferPosition, newBufferPosition = _arg.newBufferPosition;
            if (oldBufferPosition.row !== newBufferPosition.row) {
              return _this.focusCurrentCursorTag();
            }
          };
        })(this));
      }
    };

    SymbolsTreeView.prototype.focusCurrentCursorTag = function() {
      var editor, row, tag;
      if (editor = this.getEditor()) {
        row = editor.getCursorBufferPosition().row;
        tag = this.parser.getNearestTag(row);
        return this.treeView.select(tag);
      }
    };

    SymbolsTreeView.prototype.focusClickedTag = function(editor, text) {
      var t, tag;
      console.log("clicked: " + text);
      if (editor = this.getEditor()) {
        tag = ((function() {
          var _i, _len, _ref2, _results;
          _ref2 = this.parser.tags;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            t = _ref2[_i];
            if (t.name === text) {
              _results.push(t);
            }
          }
          return _results;
        }).call(this))[0];
        this.treeView.select(tag);
        return jQuery('.list-item.list-selectable-item.selected').click();
      }
    };

    SymbolsTreeView.prototype.updateContextMenu = function(types) {
      var editor, toggleSortByName, toggleTypeVisible, type, visible, _i, _j, _len, _len1, _ref2, _ref3, _ref4, _ref5;
      this.contextMenu.clear();
      editor = (_ref2 = this.getEditor()) != null ? _ref2.id : void 0;
      toggleTypeVisible = (function(_this) {
        return function(type) {
          _this.treeView.toggleTypeVisible(type);
          return _this.nowTypeStatus[type] = !_this.nowTypeStatus[type];
        };
      })(this);
      toggleSortByName = (function(_this) {
        return function() {
          var type, visible, _ref3;
          _this.nowSortStatus[0] = !_this.nowSortStatus[0];
          if (_this.nowSortStatus[0]) {
            _this.treeView.sortByName();
          } else {
            _this.treeView.sortByRow();
          }
          _ref3 = _this.nowTypeStatus;
          for (type in _ref3) {
            visible = _ref3[type];
            if (!visible) {
              _this.treeView.toggleTypeVisible(type);
            }
          }
          return _this.focusCurrentCursorTag();
        };
      })(this);
      if (this.cachedStatus[editor]) {
        _ref3 = this.cachedStatus[editor], this.nowTypeStatus = _ref3.nowTypeStatus, this.nowSortStatus = _ref3.nowSortStatus;
        _ref4 = this.nowTypeStatus;
        for (type in _ref4) {
          visible = _ref4[type];
          if (!visible) {
            this.treeView.toggleTypeVisible(type);
          }
        }
        if (this.nowSortStatus[0]) {
          this.treeView.sortByName();
        }
      } else {
        this.cachedStatus[editor] = {
          nowTypeStatus: {},
          nowSortStatus: [false]
        };
        for (_i = 0, _len = types.length; _i < _len; _i++) {
          type = types[_i];
          this.cachedStatus[editor].nowTypeStatus[type] = true;
        }
        this.sortByNameScopes = atom.config.get('symbols-tree-view.sortByNameScopes');
        if (this.sortByNameScopes.indexOf(this.getScopeName()) !== -1) {
          this.cachedStatus[editor].nowSortStatus[0] = true;
          this.treeView.sortByName();
        }
        _ref5 = this.cachedStatus[editor], this.nowTypeStatus = _ref5.nowTypeStatus, this.nowSortStatus = _ref5.nowSortStatus;
      }
      for (_j = 0, _len1 = types.length; _j < _len1; _j++) {
        type = types[_j];
        this.contextMenu.addMenu(type, this.nowTypeStatus[type], toggleTypeVisible);
      }
      this.contextMenu.addSeparator();
      return this.contextMenu.addMenu('sort by name', this.nowSortStatus[0], toggleSortByName);
    };

    SymbolsTreeView.prototype.generateTags = function(filePath) {
      return new TagGenerator(filePath, this.getScopeName()).generate().done((function(_this) {
        return function(tags) {
          var root, type, types, _i, _len, _ref2, _results;
          _this.parser = new TagParser(tags, _this.getScopeName());
          _ref2 = _this.parser.parse(), root = _ref2.root, types = _ref2.types;
          _this.treeView.setRoot(root);
          _this.updateContextMenu(types);
          _this.focusCurrentCursorTag();
          if (_this.autoHideTypes) {
            _results = [];
            for (_i = 0, _len = types.length; _i < _len; _i++) {
              type = types[_i];
              if (_this.autoHideTypes.indexOf(type) !== -1) {
                _this.treeView.toggleTypeVisible(type);
                _results.push(_this.contextMenu.toggle(type));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        };
      })(this));
    };

    SymbolsTreeView.prototype.serialize = function() {};

    SymbolsTreeView.prototype.destroy = function() {
      return this.element.remove();
    };

    SymbolsTreeView.prototype.attach = function() {
      if (atom.config.get('tree-view.showOnRightSide')) {
        this.panel = atom.workspace.addLeftPanel({
          item: this
        });
      } else {
        this.panel = atom.workspace.addRightPanel({
          item: this
        });
      }
      this.contextMenu.attach();
      return this.contextMenu.hide();
    };

    SymbolsTreeView.prototype.attached = function() {
      this.onChangeEditor = atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(editor) {
          _this.removeEventForEditor();
          return _this.populate();
        };
      })(this));
      this.onChangeAutoHide = atom.config.observe('symbols-tree-view.autoHide', (function(_this) {
        return function(autoHide) {
          if (!autoHide) {
            return _this.off('mouseenter mouseleave');
          } else {
            _this.mouseenter(function(event) {
              _this.stop();
              return _this.animate({
                width: _this.originalWidth
              }, {
                duration: _this.animationDuration
              });
            });
            return _this.mouseleave(function(event) {
              _this.stop();
              if (atom.config.get('tree-view.showOnRightSide')) {
                if (event.offsetX > 0) {
                  return _this.animate({
                    width: _this.minimalWidth
                  }, {
                    duration: _this.animationDuration
                  });
                }
              } else {
                if (event.offsetX <= 0) {
                  return _this.animate({
                    width: _this.minimalWidth
                  }, {
                    duration: _this.animationDuration
                  });
                }
              }
            });
          }
        };
      })(this));
      return this.on("contextmenu", (function(_this) {
        return function(event) {
          var left;
          left = event.pageX;
          if (left + _this.contextMenu.width() > atom.getSize().width) {
            left = left - _this.contextMenu.width();
          }
          _this.contextMenu.css({
            left: left,
            top: event.pageY
          });
          _this.contextMenu.show();
          return false;
        };
      })(this));
    };

    SymbolsTreeView.prototype.removeEventForEditor = function() {
      var _ref2, _ref3;
      if ((_ref2 = this.onEditorSave) != null) {
        _ref2.dispose();
      }
      return (_ref3 = this.onChangeRow) != null ? _ref3.dispose() : void 0;
    };

    SymbolsTreeView.prototype.detached = function() {
      var _ref2, _ref3;
      if ((_ref2 = this.onChangeEditor) != null) {
        _ref2.dispose();
      }
      if ((_ref3 = this.onChangeAutoHide) != null) {
        _ref3.dispose();
      }
      this.removeEventForEditor();
      return this.off("contextmenu");
    };

    SymbolsTreeView.prototype.remove = function() {
      SymbolsTreeView.__super__.remove.apply(this, arguments);
      return this.panel.destroy();
    };

    SymbolsTreeView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.remove();
      } else {
        this.populate();
        return this.attach();
      }
    };

    SymbolsTreeView.prototype.showView = function() {
      if (!this.hasParent()) {
        this.populate();
        return this.attach();
      }
    };

    SymbolsTreeView.prototype.hideView = function() {
      if (this.hasParent()) {
        return this.remove();
      }
    };

    return SymbolsTreeView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9zeW1ib2xzLXRyZWUtdmlldy9saWIvc3ltYm9scy10cmVlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtIQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFpQixPQUFBLENBQVEsTUFBUixDQUFqQixFQUFDLGFBQUEsS0FBRCxFQUFRLGFBQUEsS0FBUixDQUFBOztBQUFBLEVBQ0EsUUFBb0IsT0FBQSxDQUFRLHNCQUFSLENBQXBCLEVBQUMsVUFBQSxDQUFELEVBQUksZUFBQSxNQUFKLEVBQVksYUFBQSxJQURaLENBQUE7O0FBQUEsRUFFQyxXQUFZLE9BQUEsQ0FBUSxhQUFSLEVBQVosUUFGRCxDQUFBOztBQUFBLEVBR0EsWUFBQSxHQUFlLE9BQUEsQ0FBUSxpQkFBUixDQUhmLENBQUE7O0FBQUEsRUFJQSxTQUFBLEdBQVksT0FBQSxDQUFRLGNBQVIsQ0FKWixDQUFBOztBQUFBLEVBS0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBTHJCLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ0osc0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsZUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sOENBQVA7T0FBTCxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDhCQUdBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksR0FBQSxDQUFBLFFBQVosQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxJQUFDLENBQUEsUUFBVCxDQURBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxZQUFELEdBQWdCLEVBSGhCLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxXQUFELEdBQWUsR0FBQSxDQUFBLGtCQUpmLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrQ0FBaEIsQ0FMakIsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUNqQixjQUFBLHFKQUFBO0FBQUEsVUFEbUIsWUFBQSxNQUFNLFlBQUEsSUFDekIsQ0FBQTtBQUFBLFVBQUEsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsSUFBcUIsQ0FBckIsSUFBMkIsQ0FBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLENBQVQsQ0FBOUI7QUFDRSxZQUFBLGNBQUEsR0FBaUIsTUFBTSxDQUFDLCtCQUFQLENBQXVDLElBQUksQ0FBQyxRQUE1QyxDQUFqQixDQUFBO0FBQUEsWUFDQSxXQUFBLEdBQWtCLElBQUEsS0FBQSxDQUFNLGNBQU4sRUFBc0IsY0FBdEIsQ0FEbEIsQ0FBQTtBQUFBLFlBRUEsUUFBNkIsTUFBTSxDQUFDLHVCQUFQLENBQStCLFdBQS9CLENBQTdCLEVBQUMsWUFBQSxHQUFELEVBQU0sYUFBQSxJQUFOLEVBQVksZUFBQSxNQUFaLEVBQW9CLGNBQUEsS0FGcEIsQ0FBQTtBQUFBLFlBR0EsTUFBQSxHQUFTLEdBQUEsR0FBTSxNQUhmLENBQUE7QUFBQSxZQUlBLG1CQUFBLEdBQXNCLEdBQUEsR0FBTSxNQUFBLEdBQVMsQ0FKckMsQ0FBQTtBQUtBLFlBQUEsSUFBQSxDQUFBLENBQU8sQ0FBQSxNQUFNLENBQUMsWUFBUCxDQUFBLENBQUEsR0FBd0IsbUJBQXhCLElBQXdCLG1CQUF4QixHQUE4QyxNQUFNLENBQUMsZUFBUCxDQUFBLENBQTlDLENBQVAsQ0FBQTtBQUNFLGNBQUEsZ0JBQUEsR0FBb0IsbUJBQUEsR0FBc0IsTUFBTSxDQUFDLFNBQVAsQ0FBQSxDQUFBLEdBQXFCLENBQS9ELENBREY7YUFMQTtBQUFBLFlBUUEsSUFBQSxHQUFPO0FBQUEsY0FBQyxHQUFBLEVBQUssTUFBTSxDQUFDLFlBQVAsQ0FBQSxDQUFOO2FBUlAsQ0FBQTtBQUFBLFlBU0EsRUFBQSxHQUFLO0FBQUEsY0FBQyxHQUFBLEVBQUssZ0JBQU47YUFUTCxDQUFBO0FBQUEsWUFXQSxJQUFBLEdBQU8sU0FBQyxHQUFELEdBQUE7cUJBQ0wsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsR0FBcEIsRUFESztZQUFBLENBWFAsQ0FBQTtBQUFBLFlBY0EsSUFBQSxHQUFPLFNBQUEsR0FBQTtBQUNMLGNBQUEsTUFBTSxDQUFDLHNCQUFQLENBQThCLElBQUksQ0FBQyxRQUFuQyxFQUE2QztBQUFBLGdCQUFBLE1BQUEsRUFBUSxJQUFSO2VBQTdDLENBQUEsQ0FBQTtBQUFBLGNBQ0EsTUFBTSxDQUFDLHVCQUFQLENBQStCLElBQUksQ0FBQyxRQUFwQyxDQURBLENBQUE7cUJBRUEsTUFBTSxDQUFDLDBCQUFQLENBQUEsRUFISztZQUFBLENBZFAsQ0FBQTttQkFtQkEsTUFBQSxDQUFPLElBQVAsQ0FBWSxDQUFDLE9BQWIsQ0FBcUIsRUFBckIsRUFBeUI7QUFBQSxjQUFBLFFBQUEsRUFBVSxLQUFDLENBQUEsaUJBQVg7QUFBQSxjQUE4QixJQUFBLEVBQU0sSUFBcEM7QUFBQSxjQUEwQyxJQUFBLEVBQU0sSUFBaEQ7YUFBekIsRUFwQkY7V0FEaUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQixDQVBBLENBQUE7QUFBQSxNQThCQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsbUNBQXBCLEVBQXlELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE9BQUQsR0FBQTtpQkFDdkQsS0FBQyxDQUFBLGlCQUFELEdBQXdCLE9BQUgsR0FBZ0IsR0FBaEIsR0FBeUIsRUFEUztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXpELENBOUJBLENBQUE7QUFBQSxNQWlDQSxJQUFDLENBQUEsWUFBRCxHQUFnQixDQWpDaEIsQ0FBQTtBQUFBLE1Ba0NBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixnQ0FBaEIsQ0FsQ2pCLENBQUE7YUFtQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDRCQUFwQixFQUFrRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxRQUFELEdBQUE7QUFDaEQsVUFBQSxJQUFBLENBQUEsUUFBQTttQkFDRSxLQUFDLENBQUEsS0FBRCxDQUFPLEtBQUMsQ0FBQSxhQUFSLEVBREY7V0FBQSxNQUFBO21CQUdFLEtBQUMsQ0FBQSxLQUFELENBQU8sS0FBQyxDQUFBLFlBQVIsRUFIRjtXQURnRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxELEVBcENVO0lBQUEsQ0FIWixDQUFBOztBQUFBLDhCQTZDQSxTQUFBLEdBQVcsU0FBQSxHQUFBO2FBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBZixDQUFBLEVBQUg7SUFBQSxDQTdDWCxDQUFBOztBQUFBLDhCQThDQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQUcsVUFBQSxZQUFBO2tIQUFrRCxDQUFFLDRCQUF2RDtJQUFBLENBOUNkLENBQUE7O0FBQUEsOEJBZ0RBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFBLENBQUEsQ0FBTyxNQUFBLEdBQVMsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFULENBQVA7ZUFDRSxJQUFDLENBQUEsSUFBRCxDQUFBLEVBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxRQUFBLEdBQVcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFYLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxZQUFELENBQWMsUUFBZCxDQURBLENBQUE7QUFBQSxRQUVBLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FGQSxDQUFBO0FBQUEsUUFJQSxJQUFDLENBQUEsWUFBRCxHQUFnQixNQUFNLENBQUMsU0FBUCxDQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsS0FBRCxHQUFBO0FBQy9CLFlBQUEsUUFBQSxHQUFXLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBWCxDQUFBO21CQUNBLEtBQUMsQ0FBQSxZQUFELENBQWMsUUFBZCxFQUYrQjtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpCLENBSmhCLENBQUE7ZUFRQSxJQUFDLENBQUEsV0FBRCxHQUFlLE1BQU0sQ0FBQyx5QkFBUCxDQUFpQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsSUFBRCxHQUFBO0FBQzlDLGdCQUFBLG9DQUFBO0FBQUEsWUFEZ0QseUJBQUEsbUJBQW1CLHlCQUFBLGlCQUNuRSxDQUFBO0FBQUEsWUFBQSxJQUFHLGlCQUFpQixDQUFDLEdBQWxCLEtBQXlCLGlCQUFpQixDQUFDLEdBQTlDO3FCQUNFLEtBQUMsQ0FBQSxxQkFBRCxDQUFBLEVBREY7YUFEOEM7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQyxFQVhqQjtPQURRO0lBQUEsQ0FoRFYsQ0FBQTs7QUFBQSw4QkFnRUEscUJBQUEsR0FBdUIsU0FBQSxHQUFBO0FBQ3JCLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLElBQUcsTUFBQSxHQUFTLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBWjtBQUNFLFFBQUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyx1QkFBUCxDQUFBLENBQWdDLENBQUMsR0FBdkMsQ0FBQTtBQUFBLFFBQ0EsR0FBQSxHQUFNLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFBUixDQUFzQixHQUF0QixDQUROLENBQUE7ZUFFQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBaUIsR0FBakIsRUFIRjtPQURxQjtJQUFBLENBaEV2QixDQUFBOztBQUFBLDhCQXNFQSxlQUFBLEdBQWlCLFNBQUMsTUFBRCxFQUFTLElBQVQsR0FBQTtBQUNmLFVBQUEsTUFBQTtBQUFBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBYSxXQUFBLEdBQVcsSUFBeEIsQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFHLE1BQUEsR0FBUyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQVo7QUFDRSxRQUFBLEdBQUEsR0FBTzs7QUFBQztBQUFBO2VBQUEsNENBQUE7MEJBQUE7Z0JBQTZCLENBQUMsQ0FBQyxJQUFGLEtBQVU7QUFBdkMsNEJBQUEsRUFBQTthQUFBO0FBQUE7O3FCQUFELENBQThDLENBQUEsQ0FBQSxDQUFyRCxDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBaUIsR0FBakIsQ0FEQSxDQUFBO2VBR0EsTUFBQSxDQUFPLDBDQUFQLENBQWtELENBQUMsS0FBbkQsQ0FBQSxFQUpGO09BRmU7SUFBQSxDQXRFakIsQ0FBQTs7QUFBQSw4QkE4RUEsaUJBQUEsR0FBbUIsU0FBQyxLQUFELEdBQUE7QUFDakIsVUFBQSwyR0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxNQUFBLDZDQUFxQixDQUFFLFdBRHZCLENBQUE7QUFBQSxNQUdBLGlCQUFBLEdBQW9CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUNsQixVQUFBLEtBQUMsQ0FBQSxRQUFRLENBQUMsaUJBQVYsQ0FBNEIsSUFBNUIsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxhQUFjLENBQUEsSUFBQSxDQUFmLEdBQXVCLENBQUEsS0FBRSxDQUFBLGFBQWMsQ0FBQSxJQUFBLEVBRnJCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FIcEIsQ0FBQTtBQUFBLE1BT0EsZ0JBQUEsR0FBbUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqQixjQUFBLG9CQUFBO0FBQUEsVUFBQSxLQUFDLENBQUEsYUFBYyxDQUFBLENBQUEsQ0FBZixHQUFvQixDQUFBLEtBQUUsQ0FBQSxhQUFjLENBQUEsQ0FBQSxDQUFwQyxDQUFBO0FBQ0EsVUFBQSxJQUFHLEtBQUMsQ0FBQSxhQUFjLENBQUEsQ0FBQSxDQUFsQjtBQUNFLFlBQUEsS0FBQyxDQUFBLFFBQVEsQ0FBQyxVQUFWLENBQUEsQ0FBQSxDQURGO1dBQUEsTUFBQTtBQUdFLFlBQUEsS0FBQyxDQUFBLFFBQVEsQ0FBQyxTQUFWLENBQUEsQ0FBQSxDQUhGO1dBREE7QUFLQTtBQUFBLGVBQUEsYUFBQTtrQ0FBQTtBQUNFLFlBQUEsSUFBQSxDQUFBLE9BQUE7QUFBQSxjQUFBLEtBQUMsQ0FBQSxRQUFRLENBQUMsaUJBQVYsQ0FBNEIsSUFBNUIsQ0FBQSxDQUFBO2FBREY7QUFBQSxXQUxBO2lCQU9BLEtBQUMsQ0FBQSxxQkFBRCxDQUFBLEVBUmlCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FQbkIsQ0FBQTtBQWlCQSxNQUFBLElBQUcsSUFBQyxDQUFBLFlBQWEsQ0FBQSxNQUFBLENBQWpCO0FBQ0UsUUFBQSxRQUFtQyxJQUFDLENBQUEsWUFBYSxDQUFBLE1BQUEsQ0FBakQsRUFBQyxJQUFDLENBQUEsc0JBQUEsYUFBRixFQUFpQixJQUFDLENBQUEsc0JBQUEsYUFBbEIsQ0FBQTtBQUNBO0FBQUEsYUFBQSxhQUFBO2dDQUFBO0FBQ0UsVUFBQSxJQUFBLENBQUEsT0FBQTtBQUFBLFlBQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxpQkFBVixDQUE0QixJQUE1QixDQUFBLENBQUE7V0FERjtBQUFBLFNBREE7QUFHQSxRQUFBLElBQTBCLElBQUMsQ0FBQSxhQUFjLENBQUEsQ0FBQSxDQUF6QztBQUFBLFVBQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFWLENBQUEsQ0FBQSxDQUFBO1NBSkY7T0FBQSxNQUFBO0FBTUUsUUFBQSxJQUFDLENBQUEsWUFBYSxDQUFBLE1BQUEsQ0FBZCxHQUF3QjtBQUFBLFVBQUMsYUFBQSxFQUFlLEVBQWhCO0FBQUEsVUFBb0IsYUFBQSxFQUFlLENBQUMsS0FBRCxDQUFuQztTQUF4QixDQUFBO0FBQ0EsYUFBQSw0Q0FBQTsyQkFBQTtBQUFBLFVBQUEsSUFBQyxDQUFBLFlBQWEsQ0FBQSxNQUFBLENBQU8sQ0FBQyxhQUFjLENBQUEsSUFBQSxDQUFwQyxHQUE0QyxJQUE1QyxDQUFBO0FBQUEsU0FEQTtBQUFBLFFBRUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixvQ0FBaEIsQ0FGcEIsQ0FBQTtBQUdBLFFBQUEsSUFBRyxJQUFDLENBQUEsZ0JBQWdCLENBQUMsT0FBbEIsQ0FBMEIsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUExQixDQUFBLEtBQThDLENBQUEsQ0FBakQ7QUFDRSxVQUFBLElBQUMsQ0FBQSxZQUFhLENBQUEsTUFBQSxDQUFPLENBQUMsYUFBYyxDQUFBLENBQUEsQ0FBcEMsR0FBeUMsSUFBekMsQ0FBQTtBQUFBLFVBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxVQUFWLENBQUEsQ0FEQSxDQURGO1NBSEE7QUFBQSxRQU1BLFFBQW1DLElBQUMsQ0FBQSxZQUFhLENBQUEsTUFBQSxDQUFqRCxFQUFDLElBQUMsQ0FBQSxzQkFBQSxhQUFGLEVBQWlCLElBQUMsQ0FBQSxzQkFBQSxhQU5sQixDQU5GO09BakJBO0FBK0JBLFdBQUEsOENBQUE7eUJBQUE7QUFBQSxRQUFBLElBQUMsQ0FBQSxXQUFXLENBQUMsT0FBYixDQUFxQixJQUFyQixFQUEyQixJQUFDLENBQUEsYUFBYyxDQUFBLElBQUEsQ0FBMUMsRUFBaUQsaUJBQWpELENBQUEsQ0FBQTtBQUFBLE9BL0JBO0FBQUEsTUFnQ0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxZQUFiLENBQUEsQ0FoQ0EsQ0FBQTthQWlDQSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUMsSUFBQyxDQUFBLGFBQWMsQ0FBQSxDQUFBLENBQXBELEVBQXdELGdCQUF4RCxFQWxDaUI7SUFBQSxDQTlFbkIsQ0FBQTs7QUFBQSw4QkFrSEEsWUFBQSxHQUFjLFNBQUMsUUFBRCxHQUFBO2FBQ1IsSUFBQSxZQUFBLENBQWEsUUFBYixFQUF1QixJQUFDLENBQUEsWUFBRCxDQUFBLENBQXZCLENBQXVDLENBQUMsUUFBeEMsQ0FBQSxDQUFrRCxDQUFDLElBQW5ELENBQXdELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUMxRCxjQUFBLDRDQUFBO0FBQUEsVUFBQSxLQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsU0FBQSxDQUFVLElBQVYsRUFBZ0IsS0FBQyxDQUFBLFlBQUQsQ0FBQSxDQUFoQixDQUFkLENBQUE7QUFBQSxVQUNBLFFBQWdCLEtBQUMsQ0FBQSxNQUFNLENBQUMsS0FBUixDQUFBLENBQWhCLEVBQUMsYUFBQSxJQUFELEVBQU8sY0FBQSxLQURQLENBQUE7QUFBQSxVQUVBLEtBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFrQixJQUFsQixDQUZBLENBQUE7QUFBQSxVQUdBLEtBQUMsQ0FBQSxpQkFBRCxDQUFtQixLQUFuQixDQUhBLENBQUE7QUFBQSxVQUlBLEtBQUMsQ0FBQSxxQkFBRCxDQUFBLENBSkEsQ0FBQTtBQU1BLFVBQUEsSUFBSSxLQUFDLENBQUEsYUFBTDtBQUNFO2lCQUFBLDRDQUFBOytCQUFBO0FBQ0UsY0FBQSxJQUFHLEtBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUF1QixJQUF2QixDQUFBLEtBQWdDLENBQUEsQ0FBbkM7QUFDRSxnQkFBQSxLQUFDLENBQUEsUUFBUSxDQUFDLGlCQUFWLENBQTRCLElBQTVCLENBQUEsQ0FBQTtBQUFBLDhCQUNBLEtBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixDQUFvQixJQUFwQixFQURBLENBREY7ZUFBQSxNQUFBO3NDQUFBO2VBREY7QUFBQTs0QkFERjtXQVAwRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELEVBRFE7SUFBQSxDQWxIZCxDQUFBOztBQUFBLDhCQWtJQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBbElYLENBQUE7O0FBQUEsOEJBcUlBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBQSxFQURPO0lBQUEsQ0FySVQsQ0FBQTs7QUFBQSw4QkF3SUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMkJBQWhCLENBQUg7QUFDRSxRQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFmLENBQTRCO0FBQUEsVUFBQSxJQUFBLEVBQU0sSUFBTjtTQUE1QixDQUFULENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBZixDQUE2QjtBQUFBLFVBQUEsSUFBQSxFQUFNLElBQU47U0FBN0IsQ0FBVCxDQUhGO09BQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBYixDQUFBLENBSkEsQ0FBQTthQUtBLElBQUMsQ0FBQSxXQUFXLENBQUMsSUFBYixDQUFBLEVBTk07SUFBQSxDQXhJUixDQUFBOztBQUFBLDhCQWdKQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUFmLENBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLE1BQUQsR0FBQTtBQUN6RCxVQUFBLEtBQUMsQ0FBQSxvQkFBRCxDQUFBLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsUUFBRCxDQUFBLEVBRnlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekMsQ0FBbEIsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiw0QkFBcEIsRUFBa0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsUUFBRCxHQUFBO0FBQ3BFLFVBQUEsSUFBQSxDQUFBLFFBQUE7bUJBQ0UsS0FBQyxDQUFBLEdBQUQsQ0FBSyx1QkFBTCxFQURGO1dBQUEsTUFBQTtBQUdFLFlBQUEsS0FBQyxDQUFBLFVBQUQsQ0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNWLGNBQUEsS0FBQyxDQUFBLElBQUQsQ0FBQSxDQUFBLENBQUE7cUJBQ0EsS0FBQyxDQUFBLE9BQUQsQ0FBUztBQUFBLGdCQUFDLEtBQUEsRUFBTyxLQUFDLENBQUEsYUFBVDtlQUFULEVBQWtDO0FBQUEsZ0JBQUEsUUFBQSxFQUFVLEtBQUMsQ0FBQSxpQkFBWDtlQUFsQyxFQUZVO1lBQUEsQ0FBWixDQUFBLENBQUE7bUJBSUEsS0FBQyxDQUFBLFVBQUQsQ0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNWLGNBQUEsS0FBQyxDQUFBLElBQUQsQ0FBQSxDQUFBLENBQUE7QUFDQSxjQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDJCQUFoQixDQUFIO0FBQ0UsZ0JBQUEsSUFBa0UsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsQ0FBbEY7eUJBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUztBQUFBLG9CQUFDLEtBQUEsRUFBTyxLQUFDLENBQUEsWUFBVDttQkFBVCxFQUFpQztBQUFBLG9CQUFBLFFBQUEsRUFBVSxLQUFDLENBQUEsaUJBQVg7bUJBQWpDLEVBQUE7aUJBREY7ZUFBQSxNQUFBO0FBR0UsZ0JBQUEsSUFBa0UsS0FBSyxDQUFDLE9BQU4sSUFBaUIsQ0FBbkY7eUJBQUEsS0FBQyxDQUFBLE9BQUQsQ0FBUztBQUFBLG9CQUFDLEtBQUEsRUFBTyxLQUFDLENBQUEsWUFBVDttQkFBVCxFQUFpQztBQUFBLG9CQUFBLFFBQUEsRUFBVSxLQUFDLENBQUEsaUJBQVg7bUJBQWpDLEVBQUE7aUJBSEY7ZUFGVTtZQUFBLENBQVosRUFQRjtXQURvRTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxELENBSnBCLENBQUE7YUFtQkEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxhQUFKLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtBQUNqQixjQUFBLElBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxLQUFLLENBQUMsS0FBYixDQUFBO0FBQ0EsVUFBQSxJQUFHLElBQUEsR0FBTyxLQUFDLENBQUEsV0FBVyxDQUFDLEtBQWIsQ0FBQSxDQUFQLEdBQThCLElBQUksQ0FBQyxPQUFMLENBQUEsQ0FBYyxDQUFDLEtBQWhEO0FBQ0UsWUFBQSxJQUFBLEdBQU8sSUFBQSxHQUFPLEtBQUMsQ0FBQSxXQUFXLENBQUMsS0FBYixDQUFBLENBQWQsQ0FERjtXQURBO0FBQUEsVUFHQSxLQUFDLENBQUEsV0FBVyxDQUFDLEdBQWIsQ0FBaUI7QUFBQSxZQUFDLElBQUEsRUFBTSxJQUFQO0FBQUEsWUFBYSxHQUFBLEVBQUssS0FBSyxDQUFDLEtBQXhCO1dBQWpCLENBSEEsQ0FBQTtBQUFBLFVBSUEsS0FBQyxDQUFBLFdBQVcsQ0FBQyxJQUFiLENBQUEsQ0FKQSxDQUFBO0FBS0EsaUJBQU8sS0FBUCxDQU5pQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5CLEVBcEJRO0lBQUEsQ0FoSlYsQ0FBQTs7QUFBQSw4QkE0S0Esb0JBQUEsR0FBc0IsU0FBQSxHQUFBO0FBQ3BCLFVBQUEsWUFBQTs7YUFBYSxDQUFFLE9BQWYsQ0FBQTtPQUFBO3VEQUNZLENBQUUsT0FBZCxDQUFBLFdBRm9CO0lBQUEsQ0E1S3RCLENBQUE7O0FBQUEsOEJBZ0xBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLFlBQUE7O2FBQWUsQ0FBRSxPQUFqQixDQUFBO09BQUE7O2FBQ2lCLENBQUUsT0FBbkIsQ0FBQTtPQURBO0FBQUEsTUFFQSxJQUFDLENBQUEsb0JBQUQsQ0FBQSxDQUZBLENBQUE7YUFHQSxJQUFDLENBQUEsR0FBRCxDQUFLLGFBQUwsRUFKUTtJQUFBLENBaExWLENBQUE7O0FBQUEsOEJBc0xBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxPQUFQLENBQUEsRUFGTTtJQUFBLENBdExSLENBQUE7O0FBQUEsOEJBMkxBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLENBQUE7ZUFDQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBSkY7T0FETTtJQUFBLENBM0xSLENBQUE7O0FBQUEsOEJBbU1BLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLElBQUcsQ0FBQSxJQUFLLENBQUEsU0FBRCxDQUFBLENBQVA7QUFDRSxRQUFBLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBQSxDQUFBO2VBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUZGO09BRFE7SUFBQSxDQW5NVixDQUFBOztBQUFBLDhCQXlNQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQURRO0lBQUEsQ0F6TVYsQ0FBQTs7MkJBQUE7O0tBRDRCLEtBUmhDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/symbols-tree-view/lib/symbols-tree-view.coffee
