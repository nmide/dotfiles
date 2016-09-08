(function() {
  var $, CompositeDisposable, CustomNameView, Emitter, TextEditorView, View, path, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Emitter = _ref.Emitter;

  _ref1 = require('atom-space-pen-views'), $ = _ref1.$, TextEditorView = _ref1.TextEditorView, View = _ref1.View;

  path = require('path');

  CustomNameView = (function(_super) {
    __extends(CustomNameView, _super);

    function CustomNameView() {
      return CustomNameView.__super__.constructor.apply(this, arguments);
    }

    CustomNameView.content = function(_arg) {
      var prompt;
      prompt = (_arg != null ? _arg : {}).prompt;
      return this.div({
        "class": 'filename-dialog'
      }, (function(_this) {
        return function() {
          _this.label(prompt, 'Type the filename:', {
            outlet: 'promptText'
          });
          _this.subview('miniEditor', new TextEditorView({
            mini: true
          }));
          return _this.div({
            "class": 'error-message',
            outlet: 'errorMessage'
          });
        };
      })(this));
    };

    CustomNameView.prototype.initialize = function(_arg) {
      var initialImageName;
      initialImageName = (_arg != null ? _arg : {}).initialImageName;
      this.emitter = new Emitter;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add(this.element, {
        'core:confirm': (function(_this) {
          return function() {
            return _this.onConfirm(_this.miniEditor.getText());
          };
        })(this),
        'core:cancel': (function(_this) {
          return function() {
            return _this.cancel();
          };
        })(this)
      }));
      this.miniEditor.on('blur', (function(_this) {
        return function() {
          if (document.hasFocus()) {
            return _this.close();
          }
        };
      })(this));
      this.miniEditor.getModel().onDidChange((function(_this) {
        return function() {
          return _this.showError();
        };
      })(this));
      return this.miniEditor.getModel().setText(initialImageName);
    };

    CustomNameView.prototype.attach = function() {
      this.panel = atom.workspace.addModalPanel({
        item: this.element
      });
      this.miniEditor.focus();
      return this.miniEditor.getModel().selectAll();
    };

    CustomNameView.prototype.close = function() {
      var panelToDestroy, _ref2, _ref3;
      if ((_ref2 = this.subscriptions) != null) {
        _ref2.dispose();
      }
      if ((_ref3 = this.emitter) != null) {
        _ref3.dispose();
      }
      panelToDestroy = this.panel;
      this.panel = null;
      if (panelToDestroy != null) {
        panelToDestroy.destroy();
      }
      return atom.workspace.getActivePane().activate();
    };

    CustomNameView.prototype.onConfirm = function(name) {
      if (!!name) {
        this.emitter.emit('did-confirm', {
          imageName: name
        });
        return this.close();
      } else {
        return this.showError('Image\'s name must be defined.');
      }
    };

    CustomNameView.prototype.onDidConfirm = function(callback) {
      return this.emitter.on('did-confirm', callback);
    };

    CustomNameView.prototype.cancel = function() {
      return this.close();
    };

    CustomNameView.prototype.showError = function(message) {
      if (message == null) {
        message = '';
      }
      this.errorMessage.text(message);
      if (message) {
        return this.flashError();
      }
    };

    return CustomNameView;

  })(View);

  module.exports = CustomNameView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvbGliL2N1c3RvbS1uYW1lLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFpQyxPQUFBLENBQVEsTUFBUixDQUFqQyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGVBQUEsT0FBdEIsQ0FBQTs7QUFBQSxFQUNBLFFBQTRCLE9BQUEsQ0FBUSxzQkFBUixDQUE1QixFQUFDLFVBQUEsQ0FBRCxFQUFJLHVCQUFBLGNBQUosRUFBb0IsYUFBQSxJQURwQixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlNO0FBRUoscUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsY0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLElBQUQsR0FBQTtBQUNSLFVBQUEsTUFBQTtBQUFBLE1BRFUseUJBQUQsT0FBVyxJQUFWLE1BQ1YsQ0FBQTthQUFBLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxpQkFBUDtPQUFMLEVBQStCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDN0IsVUFBQSxLQUFDLENBQUEsS0FBRCxDQUFPLE1BQVAsRUFBZSxvQkFBZixFQUFzQztBQUFBLFlBQUEsTUFBQSxFQUFRLFlBQVI7V0FBdEMsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsT0FBRCxDQUFTLFlBQVQsRUFBMkIsSUFBQSxjQUFBLENBQWU7QUFBQSxZQUFBLElBQUEsRUFBTSxJQUFOO1dBQWYsQ0FBM0IsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFB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

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/lib/custom-name-view.coffee
