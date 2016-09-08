'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CompositeDisposable = require('atom').CompositeDisposable;

var LinterConfig = (function () {
    function LinterConfig() {
        _classCallCheck(this, LinterConfig);

        this.pylamaArgs = [];
        this.executablePath = '';
        this.enableDebug = false;
        this.lintOnChange = false;
        this.lintOnSave = false;
        this.optionsFileSet = false;
        this.underlineType = "Whole line";
        this.underlineSize = 2;
        this.realConsoleLog = console.log;
        this.limitToSingleInstance = true;

        this.initialPlugin = this.initialPlugin.bind(this);
        this.updatePluginConfig = this.updatePluginConfig.bind(this);

        this.subs = new CompositeDisposable();
        this.subs.add(atom.config.observe('linter-python.executablePath', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.withPep8', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.withPep257', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.withMcCabe', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.withPylint', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.withPyflakes', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.ignoreCodes', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.skipFiles', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.force', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.optionsFile', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.enableDebug', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.lintTrigger', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.underlineSize', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.underlineType', {}, this.updatePluginConfig));
        this.subs.add(atom.config.observe('linter-python.limitToSingleInstance', {}, this.updatePluginConfig));
    }

    _createClass(LinterConfig, [{
        key: 'initialPlugin',
        value: function initialPlugin() {
            var linters = [];

            this.pylamaArgs = [];
            this.optionsFileSet = false;

            this.executablePath = this.readConfigValue('executablePath');
            this.limitToSingleInstance = this.readConfigValue('limitToSingleInstance');

            this.underlineType = this.readConfigValue('underlineType');
            if (this.underlineType == 'Only place with error') {
                this.underlineSize = this.readConfigValue('underlineSize');
            }

            var enableDebug = this.readConfigValue('enableDebug');
            if (enableDebug) {
                console.log = this.realConsoleLog;
                console.log("[Linter-Python] Debug prints were enabled.");
            } else {
                console.log("[Linter-Python] Debug prints were disabled.");
                console.log = function () {};
            }

            var withMcCabe = this.readConfigValue('withMcCabe');
            if (withMcCabe) {
                linters.push('mccabe');
            }

            var withPyflakes = this.readConfigValue('withPyflakes');
            if (withPyflakes) {
                linters.push('pyflakes');
            }

            var withPylint = this.readConfigValue('withPylint');
            if (withPylint) {
                linters.push('pylint');
            }

            var withPep8 = this.readConfigValue('withPep8');
            if (withPep8) {
                linters.push('pep8');
            }

            var withPep257 = this.readConfigValue('withPep257');
            if (withPep257) {
                linters.push('pep257');
            }

            if (linters.length > 0) {
                this.pylamaArgs.push('-l');
                this.pylamaArgs.push(linters.join());
            }

            var skipFiles = this.readConfigValue('skipFiles');
            if (skipFiles.length > 0) {
                this.pylamaArgs.push('--skip');
                this.pylamaArgs.push(skipFiles);
            }

            var ignoreCodes = this.readConfigValue('ignoreCodes');
            if (ignoreCodes.length > 0) {
                this.pylamaArgs.push('-i');
                this.pylamaArgs.push(ignoreCodes);
            }

            var optionsFile = this.readConfigValue('optionsFile');
            if (optionsFile.length > 0) {
                this.optionsFileSet = true;
                this.pylamaArgs.push('-o');
                this.pylamaArgs.push(optionsFile);
            }

            var force = this.readConfigValue('force');
            if (force) {
                this.pylamaArgs.push('-F');
            }

            var lintTrigger = this.readConfigValue('lintTrigger');
            if (lintTrigger == 'Lint only after save') {
                this.lintOnSave = true;
                this.lintOnFly = false;
            } else if (lintTrigger == 'Lint only after change') {
                this.lintOnSave = false;
                this.lintOnFly = true;
            } else if (lintTrigger == 'Lint after save and change') {
                this.lintOnSave = true;
                this.lintOnFly = true;
            }
        }
    }, {
        key: 'readConfigValue',
        value: function readConfigValue(value) {
            try {
                return atom.config.get('linter-python.' + value);
            } catch (err) {
                console.log(err);
                return '';
            }
        }
    }, {
        key: 'updatePluginConfig',
        value: function updatePluginConfig(value) {
            this.initialPlugin();
        }
    }]);

    return LinterConfig;
})();

module.exports = LinterConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvbGludGVyLXB5dGhvbi9saWIvbGludGVyLWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7OztBQUVaLElBQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixDQUFDOztJQUcxRCxZQUFZO0FBQ0gsYUFEVCxZQUFZLEdBQ0E7OEJBRFosWUFBWTs7QUFFVixZQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixZQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN6QixZQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUN6QixZQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxQixZQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztBQUN4QixZQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1QixZQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztBQUNsQyxZQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN2QixZQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbEMsWUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQzs7QUFFbEMsWUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxZQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFN0QsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7QUFDdEMsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsOEJBQThCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDaEcsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDMUYsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDNUYsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDNUYsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDNUYsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDOUYsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDN0YsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDM0YsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFB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LEtBQUssQ0FBQyxDQUFDO2FBQ3BELENBQ0QsT0FBTSxHQUFHLEVBQUU7QUFDUCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqQix1QkFBTyxFQUFFLENBQUM7YUFDYjtTQUNKOzs7ZUFFaUIsNEJBQUMsS0FBSyxFQUFFO0FBQ3RCLGdCQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEI7OztXQTNJQyxZQUFZOzs7QUE4SWxCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvbGludGVyLXB5dGhvbi9saWIvbGludGVyLWNvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5jb25zdCBDb21wb3NpdGVEaXNwb3NhYmxlID0gcmVxdWlyZSgnYXRvbScpLkNvbXBvc2l0ZURpc3Bvc2FibGU7XG5cblxuY2xhc3MgTGludGVyQ29uZmlnIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5weWxhbWFBcmdzID0gW107XG4gICAgICAgIHRoaXMuZXhlY3V0YWJsZVBhdGggPSAnJztcbiAgICAgICAgdGhpcy5lbmFibGVEZWJ1ZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbnRPbkNoYW5nZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxpbnRPblNhdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vcHRpb25zRmlsZVNldCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVuZGVybGluZVR5cGUgPSBcIldob2xlIGxpbmVcIjtcbiAgICAgICAgdGhpcy51bmRlcmxpbmVTaXplID0gMjtcbiAgICAgICAgdGhpcy5yZWFsQ29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICB0aGlzLmxpbWl0VG9TaW5nbGVJbnN0YW5jZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsUGx1Z2luID0gdGhpcy5pbml0aWFsUGx1Z2luLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnID0gdGhpcy51cGRhdGVQbHVnaW5Db25maWcuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnN1YnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICAgICAgICB0aGlzLnN1YnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1weXRob24uZXhlY3V0YWJsZVBhdGgnLCB7fSwgdGhpcy51cGRhdGVQbHVnaW5Db25maWcpKTtcbiAgICAgICAgdGhpcy5zdWJzLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItcHl0aG9uLndpdGhQZXA4Jywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi53aXRoUGVwMjU3Jywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi53aXRoTWNDYWJlJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi53aXRoUHlsaW50Jywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi53aXRoUHlmbGFrZXMnLCB7fSwgdGhpcy51cGRhdGVQbHVnaW5Db25maWcpKTtcbiAgICAgICAgdGhpcy5zdWJzLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItcHl0aG9uLmlnbm9yZUNvZGVzJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi5za2lwRmlsZXMnLCB7fSwgdGhpcy51cGRhdGVQbHVnaW5Db25maWcpKTtcbiAgICAgICAgdGhpcy5zdWJzLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItcHl0aG9uLmZvcmNlJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi5vcHRpb25zRmlsZScsIHt9LCB0aGlzLnVwZGF0ZVBsdWdpbkNvbmZpZykpO1xuICAgICAgICB0aGlzLnN1YnMuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoJ2xpbnRlci1weXRob24uZW5hYmxlRGVidWcnLCB7fSwgdGhpcy51cGRhdGVQbHVnaW5Db25maWcpKTtcbiAgICAgICAgdGhpcy5zdWJzLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKCdsaW50ZXItcHl0aG9uLmxpbnRUcmlnZ2VyJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi51bmRlcmxpbmVTaXplJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi51bmRlcmxpbmVUeXBlJywge30sIHRoaXMudXBkYXRlUGx1Z2luQ29uZmlnKSk7XG4gICAgICAgIHRoaXMuc3Vicy5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZSgnbGludGVyLXB5dGhvbi5saW1pdFRvU2luZ2xlSW5zdGFuY2UnLCB7fSwgdGhpcy51cGRhdGVQbHVnaW5Db25maWcpKTtcbiAgICB9XG5cbiAgICBpbml0aWFsUGx1Z2luKCkge1xuICAgICAgICBsZXQgbGludGVycyA9IFtdO1xuXG4gICAgICAgIHRoaXMucHlsYW1hQXJncyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnNGaWxlU2V0ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5leGVjdXRhYmxlUGF0aCA9IHRoaXMucmVhZENvbmZpZ1ZhbHVlKCdleGVjdXRhYmxlUGF0aCcpO1xuICAgICAgICB0aGlzLmxpbWl0VG9TaW5nbGVJbnN0YW5jZSA9IHRoaXMucmVhZENvbmZpZ1ZhbHVlKCdsaW1pdFRvU2luZ2xlSW5zdGFuY2UnKTtcblxuICAgICAgICB0aGlzLnVuZGVybGluZVR5cGUgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgndW5kZXJsaW5lVHlwZScpO1xuICAgICAgICBpZiAodGhpcy51bmRlcmxpbmVUeXBlID09ICdPbmx5IHBsYWNlIHdpdGggZXJyb3InKSB7XG4gICAgICAgICAgICB0aGlzLnVuZGVybGluZVNpemUgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgndW5kZXJsaW5lU2l6ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVuYWJsZURlYnVnID0gdGhpcy5yZWFkQ29uZmlnVmFsdWUoJ2VuYWJsZURlYnVnJyk7XG4gICAgICAgIGlmIChlbmFibGVEZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2cgPSB0aGlzLnJlYWxDb25zb2xlTG9nO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gRGVidWcgcHJpbnRzIHdlcmUgZW5hYmxlZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltMaW50ZXItUHl0aG9uXSBEZWJ1ZyBwcmludHMgd2VyZSBkaXNhYmxlZC5cIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyA9ICgpID0+IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHdpdGhNY0NhYmUgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnd2l0aE1jQ2FiZScpO1xuICAgICAgICBpZiAod2l0aE1jQ2FiZSkge1xuICAgICAgICAgICAgbGludGVycy5wdXNoKCdtY2NhYmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aXRoUHlmbGFrZXMgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnd2l0aFB5Zmxha2VzJyk7XG4gICAgICAgIGlmICh3aXRoUHlmbGFrZXMpIHtcbiAgICAgICAgICAgIGxpbnRlcnMucHVzaCgncHlmbGFrZXMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aXRoUHlsaW50ID0gdGhpcy5yZWFkQ29uZmlnVmFsdWUoJ3dpdGhQeWxpbnQnKTtcbiAgICAgICAgaWYgKHdpdGhQeWxpbnQpIHtcbiAgICAgICAgICAgIGxpbnRlcnMucHVzaCgncHlsaW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2l0aFBlcDggPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnd2l0aFBlcDgnKTtcbiAgICAgICAgaWYgKHdpdGhQZXA4KSB7XG4gICAgICAgICAgICBsaW50ZXJzLnB1c2goJ3BlcDgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3aXRoUGVwMjU3ID0gdGhpcy5yZWFkQ29uZmlnVmFsdWUoJ3dpdGhQZXAyNTcnKTtcbiAgICAgICAgaWYgKHdpdGhQZXAyNTcpIHtcbiAgICAgICAgICAgIGxpbnRlcnMucHVzaCgncGVwMjU3Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGludGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnB5bGFtYUFyZ3MucHVzaCgnLWwnKTtcbiAgICAgICAgICAgIHRoaXMucHlsYW1hQXJncy5wdXNoKGxpbnRlcnMuam9pbigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBza2lwRmlsZXMgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnc2tpcEZpbGVzJyk7XG4gICAgICAgIGlmIChza2lwRmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5weWxhbWFBcmdzLnB1c2goJy0tc2tpcCcpO1xuICAgICAgICAgICAgdGhpcy5weWxhbWFBcmdzLnB1c2goc2tpcEZpbGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpZ25vcmVDb2RlcyA9IHRoaXMucmVhZENvbmZpZ1ZhbHVlKCdpZ25vcmVDb2RlcycpO1xuICAgICAgICBpZiAoaWdub3JlQ29kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5weWxhbWFBcmdzLnB1c2goJy1pJyk7XG4gICAgICAgICAgICB0aGlzLnB5bGFtYUFyZ3MucHVzaChpZ25vcmVDb2Rlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb3B0aW9uc0ZpbGUgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnb3B0aW9uc0ZpbGUnKTtcbiAgICAgICAgaWYgKG9wdGlvbnNGaWxlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc0ZpbGVTZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5weWxhbWFBcmdzLnB1c2goJy1vJyk7XG4gICAgICAgICAgICB0aGlzLnB5bGFtYUFyZ3MucHVzaChvcHRpb25zRmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZm9yY2UgPSB0aGlzLnJlYWRDb25maWdWYWx1ZSgnZm9yY2UnKTtcbiAgICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLnB5bGFtYUFyZ3MucHVzaCgnLUYnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaW50VHJpZ2dlciA9IHRoaXMucmVhZENvbmZpZ1ZhbHVlKCdsaW50VHJpZ2dlcicpO1xuICAgICAgICBpZiAobGludFRyaWdnZXIgPT0gJ0xpbnQgb25seSBhZnRlciBzYXZlJykge1xuICAgICAgICAgICAgdGhpcy5saW50T25TYXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGludE9uRmx5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobGludFRyaWdnZXIgPT0gJ0xpbnQgb25seSBhZnRlciBjaGFuZ2UnKSB7XG4gICAgICAgICAgICB0aGlzLmxpbnRPblNhdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubGludE9uRmx5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsaW50VHJpZ2dlciA9PSAnTGludCBhZnRlciBzYXZlIGFuZCBjaGFuZ2UnKSB7XG4gICAgICAgICAgICB0aGlzLmxpbnRPblNhdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5saW50T25GbHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVhZENvbmZpZ1ZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYXRvbS5jb25maWcuZ2V0KCdsaW50ZXItcHl0aG9uLicgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlUGx1Z2luQ29uZmlnKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFBsdWdpbigpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaW50ZXJDb25maWc7XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/linter-python/lib/linter-config.js
