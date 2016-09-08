(function() {
  var CompositeDisposable, Gruvbox, fs, path;

  fs = require('fs');

  path = require('path');

  CompositeDisposable = require('atom').CompositeDisposable;

  Gruvbox = (function() {
    function Gruvbox() {}

    Gruvbox.prototype.config = require('./gruvbox-settings').config;

    Gruvbox.prototype.activate = function() {
      this.disposables = new CompositeDisposable;
      this.packageName = require('../package.json').name;
      this.disposables.add(atom.config.observe("" + this.packageName + ".brightness", (function(_this) {
        return function() {
          return _this.enableConfigTheme();
        };
      })(this)));
      this.disposables.add(atom.config.observe("" + this.packageName + ".contrast", (function(_this) {
        return function() {
          return _this.enableConfigTheme();
        };
      })(this)));
      return this.disposables.add(atom.config.observe("" + this.packageName + ".variant", (function(_this) {
        return function() {
          return _this.enableConfigTheme();
        };
      })(this)));
    };

    Gruvbox.prototype.deactivate = function() {
      return this.disposables.dispose();
    };

    Gruvbox.prototype.enableConfigTheme = function() {
      var brightness, contrast, variant;
      brightness = atom.config.get("" + this.packageName + ".brightness");
      contrast = atom.config.get("" + this.packageName + ".contrast");
      variant = atom.config.get("" + this.packageName + ".variant");
      return this.enableTheme(brightness, contrast, variant);
    };

    Gruvbox.prototype.enableTheme = function(brightness, contrast, variant) {
      var activePackage, activePackages, _i, _len;
      if (!this.isPreviewConfirmed) {
        if (this.isActiveTheme(brightness, contrast, variant)) {
          return;
        }
      }
      try {
        fs.writeFileSync(this.getSyntaxVariablesPath(), this.getSyntaxVariablesContent(brightness, contrast, variant));
        activePackages = atom.packages.getActivePackages();
        if (activePackages.length === 0 || this.isPreview) {
          atom.packages.getLoadedPackage("" + this.packageName).reloadStylesheets();
        } else {
          for (_i = 0, _len = activePackages.length; _i < _len; _i++) {
            activePackage = activePackages[_i];
            activePackage.reloadStylesheets();
          }
        }
        this.activeBrightness = brightness;
        this.activeContrast = contrast;
        return this.activeVariant = variant;
      } catch (_error) {
        return this.enableDefaultTheme();
      }
    };

    Gruvbox.prototype.isActiveTheme = function(brightness, contrast, variant) {
      return brightness === this.activeBrightness && contrast === this.activeContrast && variant === this.activeVariant;
    };

    Gruvbox.prototype.getSyntaxVariablesPath = function() {
      return path.join(__dirname, "..", "styles", "syntax-variables.less");
    };

    Gruvbox.prototype.getSyntaxVariablesContent = function(brightness, contrast, variant) {
      return "@import 'schemes/" + (brightness.toLowerCase()) + "-" + (contrast.toLowerCase()) + "';\n@import 'schemes/" + (brightness.toLowerCase()) + "';\n@import 'colors';\n@import 'variants/" + (this.getNormalizedName(variant)) + "';";
    };

    Gruvbox.prototype.getNormalizedName = function(name) {
      return ("" + name).replace(/\ /g, '-').toLowerCase();
    };

    Gruvbox.prototype.enableDefaultTheme = function() {
      var brightness, contrast, variant;
      brightness = atom.config.get("" + this.packageName + ".brightness");
      contrast = atom.config.get("" + this.packageName + ".contrast");
      variant = atom.config.get("" + this.packageName + ".variant");
      return this.setThemeConfig(brightness, contrast, variant);
    };

    Gruvbox.prototype.setThemeConfig = function(brightness, contrast, variant) {
      atom.config.set("" + this.packageName + ".brightness", brightness);
      atom.config.set("" + this.packageName + ".contrast", contrast);
      return atom.config.set("" + this.packageName + ".variant", variant);
    };

    Gruvbox.prototype.isConfigTheme = function(brightness, contrast, variant) {
      var configBrightness, configContrast, configVariant;
      configBrightness = atom.config.get("" + this.packageName + ".brightness");
      configContrast = atom.config.get("" + this.packageName + ".contrast");
      configVariant = atom.config.get("" + this.packageName + ".variant");
      return brightness === configBrightness && contrast === configContrast && variant === configVariant;
    };

    return Gruvbox;

  })();

  module.exports = new Gruvbox;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9ncnV2Ym94LXBsdXMtc3ludGF4L2xpYi9ncnV2Ym94LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUVBO0FBQUEsTUFBQSxzQ0FBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FEUCxDQUFBOztBQUFBLEVBRUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUZELENBQUE7O0FBQUEsRUFJTTt5QkFFSjs7QUFBQSxzQkFBQSxNQUFBLEdBQVEsT0FBQSxDQUFRLG9CQUFSLENBQTZCLENBQUMsTUFBdEMsQ0FBQTs7QUFBQSxzQkFFQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBRVIsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLEdBQUEsQ0FBQSxtQkFBZixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLE9BQUEsQ0FBUSxpQkFBUixDQUEwQixDQUFDLElBRDFDLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixDQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsRUFBQSxHQUFHLElBQUMsQ0FBQSxXQUFKLEdBQWdCLGFBQXBDLEVBQWtELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLGlCQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxELENBQWpCLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFdBQVcsQ0FBQyxHQUFiLENBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixFQUFBLEdBQUcsSUFBQyxDQUFBLFdBQUos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

//# sourceURL=/home/nick/.atom/packages/gruvbox-plus-syntax/lib/gruvbox.coffee
