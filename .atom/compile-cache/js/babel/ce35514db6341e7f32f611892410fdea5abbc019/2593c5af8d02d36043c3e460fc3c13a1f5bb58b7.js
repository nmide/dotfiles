function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

'use babel';
'use strict';

var init = function init() {
    if (!localStorage.getItem('atomic-ui:configUpdated')) {
        atom.config.set('atomic-ui');
        _main2['default'].writeConfig({
            callback: function callback() {
                atom.notifications.addSuccess('There were breaking changes and Atomic UI had to reset its settings.');
                localStorage.setItem('atomic-ui:configUpdated', true);
            }
        });
    }
};

// Check if there are custom icons packages
var checkPacks = function checkPacks() {
    var root = document.documentElement;

    root.classList.remove('has-custom-icons');

    var loadedPackages = atom.packages.getActivePackages(),
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];

    loadedPackages.forEach(function (pack) {
        if (iconPacks.indexOf(pack.name) >= 0) {
            root.classList.add('has-custom-icons');
        }
    });
};

module.exports = {
    apply: function apply() {
        atom.packages.onDidActivatePackage(function () {
            return checkPacks();
        });
        atom.packages.onDidDeactivatePackage(function () {
            return checkPacks();
        });

        init();

        // Accent color

        atom.config.onDidChange('atomic-ui.colors.accentColor', function (value) {
            _main2['default'].writeConfig();
        });
        atom.config.onDidChange('atomic-ui.colors.abaseColor', function (value) {
            var baseColor = (0, _tinycolor22['default'])(value.newValue.toRGBAString());
            if (baseColor.isValid() && atom.config.get('atomic-ui.colors.genAccent')) {
                var accentColor = baseColor.complement().saturate(20).lighten(5);

                if (accentColor.isValid()) {
                    atom.config.set('atomic-ui.colors.accentColor', accentColor.toRGBAString());
                }
            }
            _main2['default'].writeConfig();
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvYXRvbWljLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7b0JBR2dCLFFBQVE7Ozs7MEJBQ0YsWUFBWTs7OztBQUpsQyxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBS2IsSUFBSSxJQUFJLEdBQUcsU0FBUCxJQUFJLEdBQWU7QUFDbkIsUUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsRUFBRTtBQUNsRCxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3QiwwQkFBSSxXQUFXLENBQUM7QUFDWixvQkFBUSxFQUFBLG9CQUFHO0FBQ1Asb0JBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLHNFQUFzRSxDQUFDLENBQUM7QUFDdEcsNEJBQVksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDekQ7U0FDSixDQUFDLENBQUM7S0FDTjtDQUNKLENBQUM7OztBQUdGLElBQUksVUFBVSxHQUFHLFNBQWIsVUFBVSxHQUFlO0FBQ3pCLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7O0FBRXBDLFFBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7O0FBRTFDLFFBQUksY0FBYyxHQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDbkQsU0FBUyxHQUFHLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDOztBQUV4RixrQkFBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBSztBQUM3QixZQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQyxnQkFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUMxQztLQUNKLENBQUMsQ0FBQztDQUNOLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNiLFNBQUssRUFBQSxpQkFBRztBQUNKLFlBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUM7bUJBQU0sVUFBVSxFQUFFO1NBQUEsQ0FBQyxDQUFDO0FBQ3ZELFlBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUM7bUJBQU0sVUFBVSxFQUFFO1NBQUEsQ0FBQyxDQUFDOztBQUV6RCxZQUFJLEVBQUUsQ0FBQzs7OztBQUlQLFlBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQy9ELDhCQUFJLFdBQVcsRUFBRSxDQUFDO1NBQ3JCLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLDZCQUE2QixFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQzlELGdCQUFJLFNBQVMsR0FBRyw2QkFBVSxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDekQsZ0JBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLEVBQUU7QUFDdEUsb0JBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRSxvQkFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDdkIsd0JBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUMvRTthQUNKO0FBQ0QsOEJBQUksV0FBVyxFQUFFLENBQUM7U0FDckIsQ0FBQyxDQUFDO0tBQ047Q0FDSixDQUFDIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvYXRvbWljLXVpL2xpYi9hbXUtc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGFtdSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcblxudmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYXRvbWljLXVpOmNvbmZpZ1VwZGF0ZWQnKSkge1xuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b21pYy11aScpO1xuICAgICAgICBhbXUud3JpdGVDb25maWcoe1xuICAgICAgICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFN1Y2Nlc3MoJ1RoZXJlIHdlcmUgYnJlYWtpbmcgY2hhbmdlcyBhbmQgQXRvbWljIFVJIGhhZCB0byByZXNldCBpdHMgc2V0dGluZ3MuJyk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2F0b21pYy11aTpjb25maWdVcGRhdGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbi8vIENoZWNrIGlmIHRoZXJlIGFyZSBjdXN0b20gaWNvbnMgcGFja2FnZXNcbnZhciBjaGVja1BhY2tzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByb290ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgcm9vdC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtY3VzdG9tLWljb25zJyk7XG5cbiAgICB2YXIgbG9hZGVkUGFja2FnZXMgPSAgYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlcygpLFxuICAgICAgICBpY29uUGFja3MgPSBbJ2ZpbGUtaWNvbnMnLCAnZmlsZS10eXBlLWljb25zJywgJ3NldGktaWNvbnMnLCAnZW52eWdlZWtzLWZpbGUtaWNvbnMnXTtcblxuICAgIGxvYWRlZFBhY2thZ2VzLmZvckVhY2goKHBhY2spID0+IHtcbiAgICAgICAgaWYgKGljb25QYWNrcy5pbmRleE9mKHBhY2submFtZSkgPj0gMCkge1xuICAgICAgICAgICAgcm9vdC5jbGFzc0xpc3QuYWRkKCdoYXMtY3VzdG9tLWljb25zJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFwcGx5KCkge1xuICAgICAgICBhdG9tLnBhY2thZ2VzLm9uRGlkQWN0aXZhdGVQYWNrYWdlKCgpID0+IGNoZWNrUGFja3MoKSk7XG4gICAgICAgIGF0b20ucGFja2FnZXMub25EaWREZWFjdGl2YXRlUGFja2FnZSgoKSA9PiBjaGVja1BhY2tzKCkpO1xuXG4gICAgICAgIGluaXQoKTtcblxuICAgICAgICAvLyBBY2NlbnQgY29sb3JcblxuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbWljLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicsICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgYW11LndyaXRlQ29uZmlnKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbWljLXVpLmNvbG9ycy5hYmFzZUNvbG9yJywgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgYmFzZUNvbG9yID0gdGlueWNvbG9yKHZhbHVlLm5ld1ZhbHVlLnRvUkdCQVN0cmluZygpKTtcbiAgICAgICAgICAgIGlmIChiYXNlQ29sb3IuaXNWYWxpZCgpICYmIGF0b20uY29uZmlnLmdldCgnYXRvbWljLXVpLmNvbG9ycy5nZW5BY2NlbnQnKSkge1xuICAgICAgICAgICAgICAgIGxldCBhY2NlbnRDb2xvciA9IGJhc2VDb2xvci5jb21wbGVtZW50KCkuc2F0dXJhdGUoMjApLmxpZ2h0ZW4oNSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWNjZW50Q29sb3IuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbWljLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicsIGFjY2VudENvbG9yLnRvUkdCQVN0cmluZygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbXUud3JpdGVDb25maWcoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiJdfQ==
//# sourceURL=/home/nick/.atom/packages/atomic-ui/lib/amu-settings.js
