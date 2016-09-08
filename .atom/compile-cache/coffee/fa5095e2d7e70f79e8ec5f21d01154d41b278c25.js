(function() {
  var CompositeDisposable, CustomNameView, Emitter, File, clipboard, filenameHelper, imageFactory, path, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, File = _ref.File, Emitter = _ref.Emitter;

  clipboard = require('clipboard');

  path = require('path');

  imageFactory = require('./image-factory');

  CustomNameView = require('./custom-name-view');

  filenameHelper = require('./filename-helper');

  module.exports = {
    subscriptions: null,
    emitter: null,
    activate: function(state) {
      var errorHandler, successHandler;
      this.subscriptions = new CompositeDisposable;
      this.emitter = new Emitter;
      successHandler = (function(_this) {
        return function(imageMarkup) {
          atom.notifications.addSuccess('Image inserted and stored.', {
            detail: imageMarkup
          });
          return _this.emitter.emit('did-image-insert', {
            imageMarkup: imageMarkup
          });
        };
      })(this);
      errorHandler = function(error) {
        atom.notifications.addError(error.toString(), {
          detail: error.stack || '',
          dismissable: true
        });
        return console.error(error);
      };
      return this.subscriptions.add(atom.commands.onWillDispatch((function(_this) {
        return function(event) {
          var activeEditor, clipboardText, grammar;
          if (event.type === 'core:paste') {
            activeEditor = atom.workspace.getActiveTextEditor();
            if (!activeEditor) {
              return;
            }
            grammar = activeEditor.getGrammar();
            if (!(grammar && grammar.scopeName === 'source.asciidoc')) {
              return;
            }
            if (_this.isImage()) {
              return _this.pasteNativeImage(event, activeEditor).then(successHandler)["catch"](errorHandler);
            } else if (atom.config.get('asciidoc-image-helper.urlSupport.enable')) {
              clipboardText = _this.readClipboardText();
              if (_this.isImageUrl(clipboardText)) {
                return _this.pasteImageUrl(event, activeEditor, clipboardText).then(successHandler)["catch"](errorHandler);
              }
            }
          }
        };
      })(this)));
    },
    pasteNativeImage: function(event, activeEditor) {
      var currentFile, imageFileName, imgbuffer;
      event.stopImmediatePropagation();
      imgbuffer = clipboard.readImage().toPng();
      currentFile = new File(activeEditor.getPath());
      imageFileName = filenameHelper.generateImageName(path.basename(currentFile.getBaseName()), imgbuffer);
      return new Promise(function(resolve, rejet) {
        var dialog;
        if (atom.config.get('asciidoc-image-helper.customFilenames')) {
          dialog = new CustomNameView({
            initialImageName: imageFileName
          });
          dialog.attach();
          return dialog.onDidConfirm(function(custom) {
            return resolve(imageFactory.createImage(activeEditor, currentFile, imgbuffer, custom.imageName));
          });
        } else {
          return resolve(imageFactory.createImage(activeEditor, currentFile, imgbuffer, imageFileName));
        }
      });
    },
    pasteImageUrl: function(event, activeEditor, clipboardText) {
      var imageFileName;
      event.stopImmediatePropagation();
      imageFileName = filenameHelper.cleanImageFilename(path.basename(clipboardText));
      return new Promise(function(resolve, rejet) {
        var dialog;
        if (atom.config.get('asciidoc-image-helper.customFilenames')) {
          dialog = new CustomNameView({
            initialImageName: imageFileName
          });
          dialog.attach();
          return dialog.onDidConfirm(function(custom) {
            return resolve(imageFactory.copyImage(activeEditor, clipboardText, custom.imageName));
          });
        } else {
          return resolve(imageFactory.copyImage(activeEditor, clipboardText, imageFileName));
        }
      });
    },
    isImage: function() {
      return !clipboard.readImage().isEmpty();
    },
    isImageUrl: function(clipboardText) {
      var imageExtensions, safeImageExtensions, _ref1, _ref2;
      imageExtensions = atom.config.get('asciidoc-image-helper.urlSupport.imageExtensions');
      safeImageExtensions = imageExtensions.map(function(ext) {
        return ext.toLowerCase();
      });
      return ((clipboardText != null ? clipboardText.length : void 0) != null) && (_ref1 = (_ref2 = path.extname(clipboardText)) != null ? _ref2.toLowerCase() : void 0, __indexOf.call(safeImageExtensions, _ref1) >= 0) && new File(clipboardText).existsSync();
    },
    readClipboardText: function() {
      var clipboardText, windowsFilePattern, windowsPathPattern;
      clipboardText = clipboard.readText();
      windowsFilePattern = /^file:[\/]{2,3}(.*)$/;
      if (clipboardText.match(windowsFilePattern)) {
        clipboardText = windowsFilePattern.exec(clipboardText)[1];
      }
      windowsPathPattern = /^\"(.*)\"$/;
      if (clipboardText.match(windowsPathPattern)) {
        clipboardText = windowsPathPattern.exec(clipboardText)[1];
      }
      return clipboardText;
    },
    onDidInsert: function(callback) {
      return this.emitter.on('did-image-insert', callback);
    },
    deactivate: function() {
      var _ref1, _ref2;
      if ((_ref1 = this.subscriptions) != null) {
        _ref1.dispose();
      }
      return (_ref2 = this.emitter) != null ? _ref2.dispose() : void 0;
    },
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVHQUFBO0lBQUEscUpBQUE7O0FBQUEsRUFBQSxPQUF1QyxPQUFBLENBQVEsTUFBUixDQUF2QyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLFlBQUEsSUFBdEIsRUFBNEIsZUFBQSxPQUE1QixDQUFBOztBQUFBLEVBQ0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBRFosQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFHQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBSGYsQ0FBQTs7QUFBQSxFQUlBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBSmpCLENBQUE7O0FBQUEsRUFLQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQUxqQixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsYUFBQSxFQUFlLElBQWY7QUFBQSxJQUNBLE9BQUEsRUFBUyxJQURUO0FBQUEsSUFHQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixVQUFBLDRCQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsR0FBQSxDQUFBLE9BRFgsQ0FBQTtBQUFBLE1BR0EsY0FBQSxHQUFpQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxXQUFELEdBQUE7QUFDZixVQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBbkIsQ0FBOEIsNEJBQTlCLEVBQTREO0FBQUEsWUFBQSxNQUFBLEVBQVEsV0FBUjtXQUE1RCxDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsa0JBQWQsRUFBa0M7QUFBQSxZQUFBLFdBQUEsRUFBYSxXQUFiO1dBQWxDLEVBRmU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUhqQixDQUFBO0FBQUEsTUFPQSxZQUFBLEdBQWUsU0FBQyxLQUFELEdBQUE7QUFDYixRQUFBLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBbkIsQ0FBNEIsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUE1QixFQUE4QztBQUFBLFVBQUEsTUFBQSxFQUFRLEtBQUssQ0FBQyxLQUFOLElBQWUsRUFBdkI7QUFBQSxVQUEyQixXQUFBLEVBQWEsSUFBeEM7U0FBOUMsQ0FBQSxDQUFBO2VBQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLEVBRmE7TUFBQSxDQVBmLENBQUE7YUFXQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFkLENBQTZCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtBQUM5QyxjQUFBLG9DQUFBO0FBQUEsVUFBQSxJQUFHLEtBQUssQ0FBQyxJQUFOLEtBQWMsWUFBakI7QUFDRSxZQUFBLFlBQUEsR0FBZSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsQ0FBZixDQUFBO0FBQ0EsWUFBQSxJQUFBLENBQUEsWUFBQTtBQUFBLG9CQUFBLENBQUE7YUFEQTtBQUFBLFlBR0EsT0FBQSxHQUFVLFlBQVksQ0FBQyxVQUFiLENBQUEsQ0FIVixDQUFBO0FBSUEsWUFBQSxJQUFBLENBQUEsQ0FBYyxPQUFBLElBQVksT0FBTyxDQUFDLFNBQVIsS0FBcUIsaUJBQS9DLENBQUE7QUFBQSxvQkFBQSxDQUFBO2FBSkE7QUFPQSxZQUFBLElBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxDQUFIO3FCQUNFLEtBQUMsQ0FBQSxnQkFBRCxDQUFrQixLQUFsQixFQUF5QixZQUF6QixDQUNFLENBQUMsSUFESCxDQUNRLGNBRFIsQ0FFRSxDQUFDLE9BQUQsQ0FGRixDQUVTLFlBRlQsRUFERjthQUFBLE1BTUssSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IseUNBQWhCLENBQUg7QUFDSCxjQUFBLGFBQUEsR0FBZ0IsS0FBQyxDQUFBLGlCQUFELENBQUEsQ0FBaEIsQ0FBQTtBQUVBLGNBQUEsSUFBRyxLQUFDLENBQUEsVUFBRCxDQUFZLGFBQVosQ0FBSDt1QkFDRSxLQUFDLENBQUEsYUFBRCxDQUFlLEtBQWYsRUFBc0IsWUFBdEIsRUFBb0MsYUFBcEMsQ0FDRSxDQUFDLElBREgsQ0FDUSxjQURSLENBRUUsQ0FBQyxPQUFELENBRkYsQ0FFUyxZQUZULEVBREY7ZUFIRzthQWRQO1dBRDhDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0IsQ0FBbkIsRUFaUTtJQUFBLENBSFY7QUFBQSxJQXVDQSxnQkFBQSxFQUFrQixTQUFDLEtBQUQsRUFBUSxZQUFSLEdBQUE7QUFDaEIsVUFBQSxxQ0FBQTtBQUFBLE1BQUEsS0FBSyxDQUFDLHdCQUFOLENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksU0FBUyxDQUFDLFNBQVYsQ0FBQSxDQUFxQixDQUFDLEtBQXRCLENBQUEsQ0FEWixDQUFBO0FBQUEsTUFHQSxXQUFBLEdBQWtCLElBQUEsSUFBQSxDQUFLLFlBQVksQ0FBQyxPQUFiLENBQUEsQ0FBTCxDQUhsQixDQUFBO0FBQUEsTUFJQSxhQUFBLEdBQWdCLGNBQWMsQ0FBQyxpQkFBZixDQUFpQyxJQUFJLENBQUMsUUFBTCxDQUFjLFdBQVcsQ0FBQyxXQUFaLENBQUEsQ0FBZCxDQUFqQyxFQUEyRSxTQUEzRSxDQUpoQixDQUFBO2FBTUksSUFBQSxPQUFBLENBQVEsU0FBQyxPQUFELEVBQVUsS0FBVixHQUFBO0FBQ1YsWUFBQSxNQUFBO0FBQUEsUUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1Q0FBaEIsQ0FBSDtBQUNFLFVBQUEsTUFBQSxHQUFhLElBQUEsY0FBQSxDQUFlO0FBQUEsWUFBQSxnQkFBQSxFQUFrQixhQUFsQjtXQUFmLENBQWIsQ0FBQTtBQUFBLFVBQ0EsTUFBTSxDQUFDLE1BQVAsQ0FBQSxDQURBLENBQUE7aUJBRUEsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsU0FBQyxNQUFELEdBQUE7bUJBQ2xCLE9BQUEsQ0FBUSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUF6QixFQUF1QyxXQUF2QyxFQUFvRCxTQUFwRCxFQUErRCxNQUFNLENBQUMsU0FBdEUsQ0FBUixFQURrQjtVQUFBLENBQXBCLEVBSEY7U0FBQSxNQUFBO2lCQU1FLE9BQUEsQ0FBUSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUF6QixFQUF1QyxXQUF2QyxFQUFvRCxTQUFwRCxFQUErRCxhQUEvRCxDQUFSLEVBTkY7U0FEVTtNQUFBLENBQVIsRUFQWTtJQUFBLENBdkNsQjtBQUFBLElBd0RBLGFBQUEsRUFBZSxTQUFDLEtBQUQsRUFBUSxZQUFSLEVBQXNCLGFBQXRCLEdBQUE7QUFDYixVQUFBLGFBQUE7QUFBQSxNQUFBLEtBQUssQ0FBQyx3QkFBTixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsYUFBQSxHQUFnQixjQUFjLENBQUMsa0JBQWYsQ0FBa0MsSUFBSSxDQUFDLFFBQUwsQ0FBYyxhQUFkLENBQWxDLENBRGhCLENBQUE7YUFHSSxJQUFBLE9BQUEsQ0FBUSxTQUFDLE9BQUQsRUFBVSxLQUFWLEdBQUE7QUFDVixZQUFBLE1BQUE7QUFBQSxRQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVDQUFoQixDQUFIO0FBQ0UsVUFBQSxNQUFBLEdBQWEsSUFBQSxjQUFBLENBQWU7QUFBQSxZQUFBLGdCQUFBLEVBQWtCLGFBQWxCO1dBQWYsQ0FBYixDQUFBO0FBQUEsVUFDQSxNQUFNLENBQUMsTUFBUCxDQUFBLENBREEsQ0FBQTtpQkFFQSxNQUFNLENBQUMsWUFBUCxDQUFvQixTQUFDLE1BQUQsR0FBQTttQkFDbEIsT0FBQSxDQUFRLFlBQVksQ0FBQyxTQUFiLENBQXVCLFlBQXZCLEVBQXFDLGFBQXJDLEVBQW9ELE1BQU0sQ0FBQyxTQUEzRCxDQUFSLEVBRGtCO1VBQUEsQ0FBcEIsRUFIRjtTQUFBLE1BQUE7aUJBTUUsT0FBQSxDQUFRLFlBQVksQ0FBQyxTQUFiLENBQXVCLFlBQXZCLEVBQXFDLGFBQXJDLEVBQW9ELGFBQXBELENBQVIsRUFORjtTQURVO01BQUEsQ0FBUixFQUpTO0lBQUEsQ0F4RGY7QUFBQSxJQXFFQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2FBQ1AsQ0FBQSxTQUFhLENBQUMsU0FBVixDQUFBLENBQXFCLENBQUMsT0FBdEIsQ0FBQSxFQURHO0lBQUEsQ0FyRVQ7QUFBQSxJQXdFQSxVQUFBLEVBQVksU0FBQyxhQUFELEdBQUE7QUFDVixVQUFBLGtEQUFBO0FBQUEsTUFBQSxlQUFBLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixrREFBaEIsQ0FBbEIsQ0FBQTtBQUFBLE1BQ0EsbUJBQUEsR0FBc0IsZUFBZSxDQUFDLEdBQWhCLENBQW9CLFNBQUMsR0FBRCxHQUFBO2VBQVMsR0FBRyxDQUFDLFdBQUosQ0FBQSxFQUFUO01BQUEsQ0FBcEIsQ0FEdEIsQ0FBQTthQUVBLGlFQUFBLElBQTJCLDhEQUEyQixDQUFFLFdBQTdCLENBQUEsVUFBQSxFQUFBLGVBQThDLG1CQUE5QyxFQUFBLEtBQUEsTUFBQSxDQUEzQixJQUFxRyxJQUFBLElBQUEsQ0FBSyxhQUFMLENBQW1CLENBQUMsVUFBcEIsQ0FBQSxFQUgzRjtJQUFBLENBeEVaO0FBQUEsSUE2RUEsaUJBQUEsRUFBbUIsU0FBQSxHQUFBO0FBQ2pCLFVBQUEscURBQUE7QUFBQSxNQUFBLGFBQUEsR0FBZ0IsU0FBUyxDQUFDLFFBQVYsQ0FBQSxDQUFoQixDQUFBO0FBQUEsTUFHQSxrQkFBQSxHQUFxQixzQkFIckIsQ0FBQTtBQUlBLE1BQUEsSUFBRyxhQUFhLENBQUMsS0FBZCxDQUFvQixrQkFBcEIsQ0FBSDtBQUNFLFFBQUEsYUFBQSxHQUFnQixrQkFBa0IsQ0FBQyxJQUFuQixDQUF3QixhQUF4QixDQUF1QyxDQUFBLENBQUEsQ0FBdkQsQ0FERjtPQUpBO0FBQUEsTUFRQSxrQkFBQSxHQUFxQixZQVJyQixDQUFBO0FBU0EsTUFBQSxJQUFHLGFBQWEsQ0FBQyxLQUFkLENBQW9CLGtCQUFwQixDQUFIO0FBQ0UsUUFBQSxhQUFBLEdBQWdCLGtCQUFrQixDQUFDLElBQW5CLENBQXdCLGFBQXhCLENBQXVDLENBQUEsQ0FBQSxDQUF2RCxDQURGO09BVEE7YUFZQSxjQWJpQjtJQUFBLENBN0VuQjtBQUFBLElBNEZBLFdBQUEsRUFBYSxTQUFDLFFBQUQsR0FBQTthQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLGtCQUFaLEVBQWdDLFFBQWhDLEVBRFc7SUFBQSxDQTVGYjtBQUFBLElBK0ZBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixVQUFBLFlBQUE7O2FBQWMsQ0FBRSxPQUFoQixDQUFBO09BQUE7bURBQ1EsQ0FBRSxPQUFWLENBQUEsV0FGVTtJQUFBLENBL0ZaO0FBQUEsSUFtR0EsU0FBQSxFQUFXLFNBQUEsR0FBQSxDQW5HWDtHQVRGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/lib/main.coffee
