Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _configSchema = require('./config-schema');

var _configSchema2 = _interopRequireDefault(_configSchema);

var _amuSettings = require('./amu-settings');

var _amuSettings2 = _interopRequireDefault(_amuSettings);

'use babel';
'use strict';

exports['default'] = {
    config: _configSchema2['default'],

    getContrast: function getContrast(color) {
        // Finds a contrasting text color
        var r = parseInt(color.substr(1, 2), 16),
            g = parseInt(color.substr(3, 2), 16),
            b = parseInt(color.substr(5, 2), 16),
            yiq = (r * 299 + g * 587 + b * 114) / 1000;

        if (yiq >= 220) {
            return 'desaturate(darken(' + color + ', 40%), 25%)';
        }
        if (yiq >= 190 && yiq < 220) {
            return 'desaturate(darken(' + color + ', 35%), 20%)';
        }
        if (yiq >= 130 && yiq < 190) {
            return 'desaturate(darken(' + color + ', 25%), 20%)';
        }
        if (yiq < 130) {
            return 'lighten(' + color + ', 60%)';
        }
    },

    toggleClass: function toggleClass(boolean, className) {
        var root = document.documentElement;

        if (boolean) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    },

    writeConfig: function writeConfig(options) {
        var accentColor = atom.config.get('atomic-ui.colors.accentColor').toHexString(),
            baseColor = atom.config.get('atomic-ui.colors.abaseColor').toHexString(),
            accentTextColor = this.getContrast(baseColor);

        var config = '@accent-color: ' + accentColor + ';\n' + ('@accent-text-color: ' + accentTextColor + ';\n') + ('@base-color: ' + baseColor + ';\n');

        _fs2['default'].writeFile(__dirname + '/../styles/custom.less', config, 'utf8', function () {
            if (!options || !options.noReload) {
                var themePack = atom.packages.getLoadedPackage('atomic-ui');

                themePack.deactivate();
                setImmediate(function () {
                    return themePack.activate();
                });
            }
            if (options && options.callback && typeof options.callback === 'function') {
                options.callback();
            }
        });
    },

    activate: function activate() {
        _amuSettings2['default'].apply();
        this.writeConfig({ noReload: true });
    },

    deactivate: function deactivate() {}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvYXRvbWljLXVpL2xpYi9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFHZSxJQUFJOzs7OzRCQUNNLGlCQUFpQjs7OzsyQkFDbEIsZ0JBQWdCOzs7O0FBTHhDLFdBQVcsQ0FBQztBQUNaLFlBQVksQ0FBQzs7cUJBTUU7QUFDWCxVQUFNLDJCQUFjOztBQUVwQixlQUFXLEVBQUEscUJBQUMsS0FBSyxFQUFFOztBQUVmLFlBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsR0FBRyxHQUFHLENBQUMsQUFBQyxDQUFDLEdBQUcsR0FBRyxHQUFLLENBQUMsR0FBRyxHQUFHLEFBQUMsR0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUksSUFBSSxDQUFDOztBQUVyRCxZQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDWiwwQ0FBNEIsS0FBSyxrQkFBZTtTQUNuRDtBQUNELFlBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO0FBQ3pCLDBDQUE0QixLQUFLLGtCQUFlO1NBQ25EO0FBQ0QsWUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7QUFDekIsMENBQTRCLEtBQUssa0JBQWU7U0FDbkQ7QUFDRCxZQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7QUFDWCxnQ0FBa0IsS0FBSyxZQUFTO1NBQ25DO0tBQ0o7O0FBRUQsZUFBVyxFQUFBLHFCQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUU7QUFDNUIsWUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7QUFFcEMsWUFBSSxPQUFPLEVBQUU7QUFDVCxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakMsTUFBTTtBQUNILGdCQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNwQztLQUNKOztBQUVELGVBQVcsRUFBQSxxQkFBQyxPQUFPLEVBQUU7QUFDakIsWUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDM0UsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUMsV0FBVyxFQUFFO1lBQ3hFLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsRCxZQUFJLE1BQU0sR0FBRyxvQkFBa0IsV0FBVyxxQ0FDTixlQUFlLFNBQUssc0JBQzNCLFNBQVMsU0FBSyxDQUFDOztBQUU1Qyx3QkFBRyxTQUFTLENBQUksU0FBUyw2QkFBMEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFNO0FBQ3JFLGdCQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtBQUMvQixvQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7QUFFNUQseUJBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN2Qiw0QkFBWSxDQUFDOzJCQUFNLFNBQVMsQ0FBQyxRQUFRLEVBQUU7aUJBQUEsQ0FBQyxDQUFDO2FBQzVDO0FBQ0QsZ0JBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxPQUFPLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUN2RSx1QkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3RCO1NBQ0osQ0FBQyxDQUFDO0tBQ047O0FBRUQsWUFBUSxFQUFBLG9CQUFHO0FBQ1AsaUNBQVksS0FBSyxFQUFFLENBQUM7QUFDcEIsWUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3hDOztBQUVELGNBQVUsRUFBQSxzQkFBRyxFQUNaO0NBQ0oiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdG9taWMtdWkvbGliL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBjb25maWdTY2hlbWEgZnJvbSAnLi9jb25maWctc2NoZW1hJztcbmltcG9ydCBhbXVTZXR0aW5ncyBmcm9tICcuL2FtdS1zZXR0aW5ncyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IGNvbmZpZ1NjaGVtYSxcblxuICAgIGdldENvbnRyYXN0KGNvbG9yKSB7XG4gICAgICAgIC8vIEZpbmRzIGEgY29udHJhc3RpbmcgdGV4dCBjb2xvclxuICAgICAgICB2YXIgciA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cigxLCAyKSwgMTYpLFxuICAgICAgICAgICAgZyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cigzLCAyKSwgMTYpLFxuICAgICAgICAgICAgYiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cig1LCAyKSwgMTYpLFxuICAgICAgICAgICAgeWlxID0gKChyICogMjk5KSArIChnICogNTg3KSArIChiICogMTE0KSkgLyAxMDAwO1xuXG4gICAgICAgIGlmICh5aXEgPj0gMjIwKSB7XG4gICAgICAgICAgICByZXR1cm4gYGRlc2F0dXJhdGUoZGFya2VuKCR7Y29sb3J9LCA0MCUpLCAyNSUpYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeWlxID49IDE5MCAmJiB5aXEgPCAyMjApIHtcbiAgICAgICAgICAgIHJldHVybiBgZGVzYXR1cmF0ZShkYXJrZW4oJHtjb2xvcn0sIDM1JSksIDIwJSlgO1xuICAgICAgICB9XG4gICAgICAgIGlmICh5aXEgPj0gMTMwICYmIHlpcSA8IDE5MCkge1xuICAgICAgICAgICAgcmV0dXJuIGBkZXNhdHVyYXRlKGRhcmtlbigke2NvbG9yfSwgMjUlKSwgMjAlKWA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHlpcSA8IDEzMCkge1xuICAgICAgICAgICAgcmV0dXJuIGBsaWdodGVuKCR7Y29sb3J9LCA2MCUpYDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGVDbGFzcyhib29sZWFuLCBjbGFzc05hbWUpIHtcbiAgICAgICAgdmFyIHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKGJvb2xlYW4pIHtcbiAgICAgICAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgd3JpdGVDb25maWcob3B0aW9ucykge1xuICAgICAgICB2YXIgYWNjZW50Q29sb3IgPSBhdG9tLmNvbmZpZy5nZXQoJ2F0b21pYy11aS5jb2xvcnMuYWNjZW50Q29sb3InKS50b0hleFN0cmluZygpLFxuICAgICAgICAgICAgYmFzZUNvbG9yID0gYXRvbS5jb25maWcuZ2V0KCdhdG9taWMtdWkuY29sb3JzLmFiYXNlQ29sb3InKS50b0hleFN0cmluZygpLFxuICAgICAgICAgICAgYWNjZW50VGV4dENvbG9yID0gdGhpcy5nZXRDb250cmFzdChiYXNlQ29sb3IpO1xuXG4gICAgICAgIHZhciBjb25maWcgPSBgQGFjY2VudC1jb2xvcjogJHthY2NlbnRDb2xvcn07XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICBgQGFjY2VudC10ZXh0LWNvbG9yOiAke2FjY2VudFRleHRDb2xvcn07XFxuYCArXG4gICAgICAgICAgICAgICAgICAgICBgQGJhc2UtY29sb3I6ICR7YmFzZUNvbG9yfTtcXG5gO1xuXG4gICAgICAgIGZzLndyaXRlRmlsZShgJHtfX2Rpcm5hbWV9Ly4uL3N0eWxlcy9jdXN0b20ubGVzc2AsIGNvbmZpZywgJ3V0ZjgnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9SZWxvYWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhlbWVQYWNrID0gYXRvbS5wYWNrYWdlcy5nZXRMb2FkZWRQYWNrYWdlKCdhdG9taWMtdWknKTtcblxuICAgICAgICAgICAgICAgIHRoZW1lUGFjay5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHRoZW1lUGFjay5hY3RpdmF0ZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FsbGJhY2sgJiYgdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgYW11U2V0dGluZ3MuYXBwbHkoKTtcbiAgICAgICAgdGhpcy53cml0ZUNvbmZpZyh7IG5vUmVsb2FkOiB0cnVlIH0pO1xuICAgIH0sXG5cbiAgICBkZWFjdGl2YXRlKCkge1xuICAgIH1cbn07XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/atomic-ui/lib/main.js
