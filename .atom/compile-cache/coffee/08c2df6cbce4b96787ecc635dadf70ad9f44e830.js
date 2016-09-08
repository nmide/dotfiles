(function() {
  module.exports = {
    apply: function() {
      var applyBackgroundColor, applyBackgroundGradient, applyBackgroundImage, applyEditorFont, applyFont, applyFontWeight, applyMinimalMode, applyTooltipContrast, body;
      body = document.querySelector('body');
      applyFont = function(font) {
        return body.setAttribute('data-isotope-light-ui-font', font);
      };
      applyFontWeight = function(weight) {
        return body.setAttribute('data-isotope-light-ui-fontweight', weight);
      };
      applyBackgroundColor = function() {
        if (atom.config.get('isotope-light-ui.customBackgroundColor')) {
          atom.config.set('isotope-light-ui.backgroundImage', 'false');
          atom.config.set('isotope-light-ui.backgroundGradient', 'false');
          body.setAttribute('data-isotope-light-ui-bg-color', 'true');
          return body.style.backgroundColor = atom.config.get('isotope-light-ui.customBackgroundColorPicker').toHexString();
        } else {
          body.setAttribute('data-isotope-light-ui-bg-color', 'false');
          return body.style.backgroundColor = '';
        }
      };
      applyBackgroundGradient = function() {
        if (atom.config.get('isotope-light-ui.backgroundGradient')) {
          atom.config.set('isotope-light-ui.backgroundImage', 'false');
          atom.config.set('isotope-light-ui.customBackgroundColor', 'false');
          return body.setAttribute('data-isotope-light-ui-bg-gradient', 'true');
        } else {
          return body.setAttribute('data-isotope-light-ui-bg-gradient', 'false');
        }
      };
      applyBackgroundImage = function() {
        if (atom.config.get('isotope-light-ui.backgroundImage')) {
          atom.config.set('isotope-light-ui.customBackgroundColor', 'false');
          atom.config.set('isotope-light-ui.customBackgroundColor', 'false');
          atom.config.set('isotope-light-ui.backgroundGradient', 'false');
          body.setAttribute('data-isotope-light-ui-bg-image', 'true');
          return body.style.backgroundImage = 'url(' + atom.config.get('isotope-light-ui.backgroundImagePath') + ')';
        } else {
          body.setAttribute('data-isotope-light-ui-bg-image', 'false');
          return body.style.backgroundImage = '';
        }
      };
      applyTooltipContrast = function() {
        if (atom.config.get('isotope-light-ui.lowContrastTooltip')) {
          return body.setAttribute('data-isotope-light-ui-tooltip-lowcontrast', 'true');
        } else {
          return body.setAttribute('data-isotope-light-ui-tooltip-lowcontrast', 'false');
        }
      };
      applyEditorFont = function() {
        if (atom.config.get('isotope-light-ui.matchEditorFont')) {
          if (atom.config.get('editor.fontFamily') === '') {
            return body.style.fontFamily = 'Inconsolata, Monaco, Consolas, "Courier New", Courier';
          } else {
            return body.style.fontFamily = atom.config.get('editor.fontFamily');
          }
        } else {
          return body.style.fontFamily = '';
        }
      };
      applyMinimalMode = function() {
        if (atom.config.get('isotope-light-ui.minimalMode')) {
          return body.setAttribute('data-isotope-light-ui-minimal', 'true');
        } else {
          return body.setAttribute('data-isotope-light-ui-minimal', 'false');
        }
      };
      applyFont(atom.config.get('isotope-light-ui.fontFamily'));
      applyFontWeight(atom.config.get('isotope-light-ui.fontWeight'));
      applyBackgroundGradient();
      applyBackgroundImage();
      applyBackgroundColor();
      applyTooltipContrast();
      applyEditorFont();
      applyMinimalMode();
      atom.config.onDidChange('isotope-light-ui.fontFamily', function() {
        return applyFont(atom.config.get('isotope-light-ui.fontFamily'));
      });
      atom.config.onDidChange('isotope-light-ui.fontWeight', function() {
        return applyFontWeight(atom.config.get('isotope-light-ui.fontWeight'));
      });
      atom.config.onDidChange('isotope-light-ui.customBackgroundColor', function() {
        return applyBackgroundColor();
      });
      atom.config.onDidChange('isotope-light-ui.customBackgroundColorPicker', function() {
        return applyBackgroundColor();
      });
      atom.config.onDidChange('isotope-light-ui.backgroundGradient', function() {
        return applyBackgroundGradient();
      });
      atom.config.onDidChange('isotope-light-ui.backgroundImage', function() {
        return applyBackgroundImage();
      });
      atom.config.onDidChange('isotope-light-ui.backgroundImagePath', function() {
        return applyBackgroundImage();
      });
      atom.config.onDidChange('isotope-light-ui.lowContrastTooltip', function() {
        return applyTooltipContrast();
      });
      atom.config.onDidChange('isotope-light-ui.matchEditorFont', function() {
        return applyEditorFont();
      });
      atom.config.onDidChange('isotope-light-ui.minimalMode', function() {
        return applyMinimalMode();
      });
      return atom.config.onDidChange('editor.fontFamily', function() {
        return applyEditorFont();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9pc290b3BlLWxpZ2h0LXVpL2xpYi9jb25maWcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLEtBQUEsRUFBTyxTQUFBLEdBQUE7QUFFTCxVQUFBLDhKQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUCxDQUFBO0FBQUEsTUFLQSxTQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7ZUFDVixJQUFJLENBQUMsWUFBTCxDQUFrQiw0QkFBbEIsRUFBZ0QsSUFBaEQsRUFEVTtNQUFBLENBTFosQ0FBQTtBQUFBLE1BUUEsZUFBQSxHQUFrQixTQUFDLE1BQUQsR0FBQTtlQUNoQixJQUFJLENBQUMsWUFBTCxDQUFrQixrQ0FBbEIsRUFBc0QsTUFBdEQsRUFEZ0I7TUFBQSxDQVJsQixDQUFBO0FBQUEsTUFXQSxvQkFBQSxHQUF1QixTQUFBLEdBQUE7QUFDckIsUUFBQSxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3Q0FBaEIsQ0FBSDtBQUNFLFVBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGtDQUFoQixFQUFvRCxPQUFwRCxDQUFBLENBQUE7QUFBQSxVQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQ0FBaEIsRUFBdUQsT0FBdkQsQ0FEQSxDQUFBO0FBQUEsVUFFQSxJQUFJLENBQUMsWUFBTCxDQUFrQixnQ0FBbEIsRUFBb0QsTUFBcEQsQ0FGQSxDQUFBO2lCQUdBLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBWCxHQUE2QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsOENBQWhCLENBQStELENBQUMsV0FBaEUsQ0FBQSxF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

//# sourceURL=/home/nick/.atom/packages/isotope-light-ui/lib/config.coffee
