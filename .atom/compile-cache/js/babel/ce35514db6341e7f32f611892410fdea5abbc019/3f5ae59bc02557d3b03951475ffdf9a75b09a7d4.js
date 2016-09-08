'use babel';

var LinterPython = require('./linter-python.js');

module.exports = {

    config: {
        executablePath: {
            type: 'string',
            'default': 'pylama',
            description: 'Excutable path for external Pylama. Example: /usr/local/bin/pylama.',
            order: 1
        },
        withPep8: {
            type: 'boolean',
            'default': false,
            description: 'Run pylama with pep8 linter.',
            order: 2
        },
        withPep257: {
            type: 'boolean',
            'default': false,
            description: 'Run pylama with PEP257 linter.',
            order: 3
        },
        withMcCabe: {
            type: 'boolean',
            'default': false,
            description: 'Run pylama with McCabe linter.',
            order: 4
        },
        withPyflakes: {
            type: 'boolean',
            'default': false,
            description: 'Run pylama with Pyflakes linter.',
            order: 5
        },
        withPylint: {
            type: 'boolean',
            'default': false,
            description: 'Run pylama with Pylint linter. To enable this option please execute following command: pip install pylama-pylint.',
            order: 6
        },
        skipFiles: {
            type: 'string',
            'default': '',
            description: 'Skip files by masks (comma-separated, ex. */message,py,*/ignore.py).',
            order: 7
        },
        ignoreCodes: {
            type: 'string',
            'default': '',
            description: 'Provided codes will be ignored by linters. Example: E111,E114,D101,D102,DW0311.',
            order: 8
        },
        optionsFile: {
            type: 'string',
            'default': '',
            description: 'Path to configuration file. By default is <project dir>/pylama.ini',
            order: 9
        },
        force: {
            type: 'boolean',
            'default': false,
            description: 'Force code checking (if linter doesnt allow).',
            order: 10
        },
        lintTrigger: {
            type: 'string',
            'default': 'Lint only after save',
            'enum': ['Lint only after save', 'Lint only after change', 'Lint after save and change'],
            description: "Defines when lint action should be triggered.",
            order: 11
        },
        underlineType: {
            type: 'string',
            'default': 'Whole line',
            'enum': ["Whole line", "Only place with error"],
            description: "Defines how error will be shown.",
            order: 12
        },
        underlineSize: {
            type: "integer",
            'default': 2,
            description: "Size of underline after and before place where error appears. Option is working only if \"Only place with error\" underline type was selected.",
            order: 13
        },
        enableDebug: {
            type: 'boolean',
            'default': false,
            description: 'Enable debug console prints.',
            order: 14
        },
        limitToSingleInstance: {
            type: 'boolean',
            'default': true,
            description: 'Limit how many pylama binaries can be executed. By default is set to single instance.'
        }

    },

    activate: function activate() {
        require('atom-package-deps').install('linter-python');
        console.log('My package was activated');
    },

    deactivate: function deactivate() {
        console.log('My package was deactivated');
    },

    provideLinter: function provideLinter() {
        var linter = new LinterPython();
        var provider = {
            name: 'Python Linter',
            grammarScopes: ['source.python'],
            scope: 'file',
            lintOnFly: true,
            lint: linter.lint
        };
        return provider;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvbGludGVyLXB5dGhvbi9saWIvaW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7O0FBRVosSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBR25ELE1BQU0sQ0FBQyxPQUFPLEdBQUc7O0FBRWIsVUFBTSxFQUFFO0FBQ0osc0JBQWMsRUFBRTtBQUNaLGdCQUFJLEVBQUUsUUFBUTtBQUNkLHVCQUFTLFFBQVE7QUFDakIsdUJBQVcsRUFBRSxxRUFBcUU7QUFDbEYsaUJBQUssRUFBRSxDQUFDO1NBQ1g7QUFDRCxnQkFBUSxFQUFFO0FBQ04sZ0JBQUksRUFBRSxTQUFTO0FBQ2YsdUJBQVMsS0FBSztBQUNkLHVCQUFXLEVBQUUsOEJBQThCO0FBQzNDLGlCQUFLLEVBQUUsQ0FBQztTQUNYO0FBQ0Qsa0JBQVUsRUFBRTtBQUNSLGdCQUFJLEVBQUUsU0FBUztBQUNmLHVCQUFTLEtBQUs7QUFDZCx1QkFBVyxFQUFFLGdDQUFnQztBQUM3QyxpQkFBSyxFQUFFLENBQUM7U0FDWDtBQUNELGtCQUFVLEVBQUU7QUFDUixnQkFBSSxFQUFFLFNBQVM7QUFDZix1QkFBUyxLQUFLO0FBQ2QsdUJBQVcsRUFBRSxnQ0FBZ0M7QUFDN0MsaUJBQUssRUFBRSxDQUFDO1NBQ1g7QUFDRCxvQkFBWSxFQUFFO0FBQ1YsZ0JBQUksRUFBRSxTQUFTO0FBQ2YsdUJBQVMsS0FBSztBQUNkLHVCQUFXLEVBQUUsa0NBQWtDO0FBQy9DLGlCQUFLLEVBQUUsQ0FBQztTQUNYO0FBQ0Qsa0JBQVUsRUFBRTtBQUNSLGdCQUFJLEVBQUUsU0FBUztBQUNmLHVCQUFTLEtBQUs7QUFDZCx1QkFBVyxFQUFFLG1IQUFtSDtBQUNoSSxpQkFBSyxFQUFFLENBQUM7U0FDWDtBQUNELGlCQUFTLEVBQUU7QUFDUCxnQkFBSSxFQUFFLFFBQVE7QUFDZCx1QkFBUyxFQUFFO0FBQ1gsdUJBQVcsRUFBRSxzRUFBc0U7QUFDbkYsaUJBQUssRUFBRSxDQUFDO1NBQ1g7QUFDRCxtQkFBVyxFQUFFO0FBQ1QsZ0JBQUksRUFBRSxRQUFRO0FBQ2QsdUJBQVMsRUFBRTtBQUNYLHVCQUFXLEVBQUUsaUZBQWlGO0FBQzlGLGlCQUFLLEVBQUUsQ0FBQztTQUNYO0FBQ0QsbUJBQVcsRUFBRTtBQUNULGdCQUFJLEVBQUUsUUFBUTtBQUNkLHVCQUFTLEVBQUU7QUFDWCx1QkFBVyxFQUFFLG9FQUFvRTtBQUNqRixpQkFBSyxFQUFFLENBQUM7U0FDWDtBQUNELGFBQUssRUFBRTtBQUNILGdCQUFJLEVBQUUsU0FBUztBQUNmLHVCQUFTLEtBQUs7QUFDZCx1QkFBVyxFQUFFLCtDQUErQztBQUM1RCxpQkFBSyxFQUFFLEVBQUU7U0FDWjtBQUNELG1CQUFXLEVBQUU7QUFDVCxnQkFBSSxFQUFFLFFBQVE7QUFDZCx1QkFBUyxzQkFBc0I7QUFDL0Isb0JBQU0sQ0FDRixzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLDRCQUE0QixDQUMvQjtBQUNELHVCQUFXLEVBQUUsK0NBQStDO0FBQzVELGlCQUFLLEVBQUUsRUFBRTtTQUNaO0FBQ0QscUJBQWEsRUFBRTtBQUNYLGdCQUFJLEVBQUUsUUFBUTtBQUNkLHVCQUFTLFlBQVk7QUFDckIsb0JBQU0sQ0FDRixZQUFZLEVBQ1osdUJBQXVCLENBQzFCO0FBQ0QsdUJBQVcsRUFBRSxrQ0FBa0M7QUFDL0MsaUJBQUssRUFBRSxFQUFFO1NBQ1o7QUFDRCxxQkFBYSxFQUFFO0FBQ1gsZ0JBQUksRUFBRSxTQUFTO0FBQ2YsdUJBQVMsQ0FBQztBQUNWLHVCQUFXLEVBQUUsZ0pBQWdKO0FBQzdKLGlCQUFLLEVBQUUsRUFBRTtTQUNaO0FBQ0QsbUJBQVcsRUFBRTtBQUNULGdCQUFJLEVBQUUsU0FBUztBQUNmLHVCQUFTLEtBQUs7QUFDZCx1QkFBVyxFQUFFLDhCQUE4QjtBQUMzQyxpQkFBSyxFQUFFLEVBQUU7U0FDWjtBQUNELDZCQUFxQixFQUFFO0FBQ25CLGdCQUFJLEVBQUUsU0FBUztBQUNmLHVCQUFTLElBQUk7QUFDYix1QkFBVyxFQUFFLHVGQUF1RjtTQUN2Rzs7S0FFSjs7QUFFRCxZQUFRLEVBQUEsb0JBQUc7QUFDUCxlQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEQsZUFBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQzNDOztBQUVELGNBQVUsRUFBQSxzQkFBRztBQUNULGVBQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztLQUM3Qzs7QUFFRCxpQkFBYSxFQUFBLHlCQUFHO0FBQ1osWUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUNsQyxZQUFNLFFBQVEsR0FBRztBQUNiLGdCQUFJLEVBQUUsZUFBZTtBQUNyQix5QkFBYSxFQUFFLENBQUMsZUFBZSxDQUFDO0FBQ2hDLGlCQUFLLEVBQUUsTUFBTTtBQUNiLHFCQUFTLEVBQUUsSUFBSTtBQUNmLGdCQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDcEIsQ0FBQztBQUNGLGVBQU8sUUFBUSxDQUFDO0tBQ25CO0NBQ0osQ0FBQyIsImZpbGUiOiIvaG9tZS9uaWNrLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1weXRob24vbGliL2luaXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgTGludGVyUHl0aG9uID0gcmVxdWlyZSgnLi9saW50ZXItcHl0aG9uLmpzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBjb25maWc6IHtcbiAgICAgICAgZXhlY3V0YWJsZVBhdGg6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3B5bGFtYScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0V4Y3V0YWJsZSBwYXRoIGZvciBleHRlcm5hbCBQeWxhbWEuIEV4YW1wbGU6IC91c3IvbG9jYWwvYmluL3B5bGFtYS4nLFxuICAgICAgICAgICAgb3JkZXI6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhQZXA4OiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUnVuIHB5bGFtYSB3aXRoIHBlcDggbGludGVyLicsXG4gICAgICAgICAgICBvcmRlcjogMixcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aFBlcDI1Nzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1J1biBweWxhbWEgd2l0aCBQRVAyNTcgbGludGVyLicsXG4gICAgICAgICAgICBvcmRlcjogMyxcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aE1jQ2FiZToge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1J1biBweWxhbWEgd2l0aCBNY0NhYmUgbGludGVyLicsXG4gICAgICAgICAgICBvcmRlcjogNCxcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aFB5Zmxha2VzOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUnVuIHB5bGFtYSB3aXRoIFB5Zmxha2VzIGxpbnRlci4nLFxuICAgICAgICAgICAgb3JkZXI6IDUsXG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhQeWxpbnQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSdW4gcHlsYW1hIHdpdGggUHlsaW50IGxpbnRlci4gVG8gZW5hYmxlIHRoaXMgb3B0aW9uIHBsZWFzZSBleGVjdXRlIGZvbGxvd2luZyBjb21tYW5kOiBwaXAgaW5zdGFsbCBweWxhbWEtcHlsaW50LicsXG4gICAgICAgICAgICBvcmRlcjogNixcbiAgICAgICAgfSxcbiAgICAgICAgc2tpcEZpbGVzOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTa2lwIGZpbGVzIGJ5IG1hc2tzIChjb21tYS1zZXBhcmF0ZWQsIGV4LiAqL21lc3NhZ2UscHksKi9pZ25vcmUucHkpLicsXG4gICAgICAgICAgICBvcmRlcjogNyxcbiAgICAgICAgfSxcbiAgICAgICAgaWdub3JlQ29kZXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDogJycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Byb3ZpZGVkIGNvZGVzIHdpbGwgYmUgaWdub3JlZCBieSBsaW50ZXJzLiBFeGFtcGxlOiBFMTExLEUxMTQsRDEwMSxEMTAyLERXMDMxMS4nLFxuICAgICAgICAgICAgb3JkZXI6IDgsXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnNGaWxlOiB7XG4gICAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQYXRoIHRvIGNvbmZpZ3VyYXRpb24gZmlsZS4gQnkgZGVmYXVsdCBpcyA8cHJvamVjdCBkaXI+L3B5bGFtYS5pbmknLFxuICAgICAgICAgICAgb3JkZXI6IDksXG4gICAgICAgIH0sXG4gICAgICAgIGZvcmNlOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRm9yY2UgY29kZSBjaGVja2luZyAoaWYgbGludGVyIGRvZXNudCBhbGxvdykuJyxcbiAgICAgICAgICAgIG9yZGVyOiAxMCxcbiAgICAgICAgfSxcbiAgICAgICAgbGludFRyaWdnZXI6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDogJ0xpbnQgb25seSBhZnRlciBzYXZlJyxcbiAgICAgICAgICAgIGVudW06IFtcbiAgICAgICAgICAgICAgICAnTGludCBvbmx5IGFmdGVyIHNhdmUnLFxuICAgICAgICAgICAgICAgICdMaW50IG9ubHkgYWZ0ZXIgY2hhbmdlJyxcbiAgICAgICAgICAgICAgICAnTGludCBhZnRlciBzYXZlIGFuZCBjaGFuZ2UnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGVmaW5lcyB3aGVuIGxpbnQgYWN0aW9uIHNob3VsZCBiZSB0cmlnZ2VyZWQuXCIsXG4gICAgICAgICAgICBvcmRlcjogMTEsXG4gICAgICAgIH0sXG4gICAgICAgIHVuZGVybGluZVR5cGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDogJ1dob2xlIGxpbmUnLFxuICAgICAgICAgICAgZW51bTogW1xuICAgICAgICAgICAgICAgIFwiV2hvbGUgbGluZVwiLFxuICAgICAgICAgICAgICAgIFwiT25seSBwbGFjZSB3aXRoIGVycm9yXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZWZpbmVzIGhvdyBlcnJvciB3aWxsIGJlIHNob3duLlwiLFxuICAgICAgICAgICAgb3JkZXI6IDEyLFxuICAgICAgICB9LFxuICAgICAgICB1bmRlcmxpbmVTaXplOiB7XG4gICAgICAgICAgICB0eXBlOiBcImludGVnZXJcIixcbiAgICAgICAgICAgIGRlZmF1bHQ6IDIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTaXplIG9mIHVuZGVybGluZSBhZnRlciBhbmQgYmVmb3JlIHBsYWNlIHdoZXJlIGVycm9yIGFwcGVhcnMuIE9wdGlvbiBpcyB3b3JraW5nIG9ubHkgaWYgXFxcIk9ubHkgcGxhY2Ugd2l0aCBlcnJvclxcXCIgdW5kZXJsaW5lIHR5cGUgd2FzIHNlbGVjdGVkLlwiLFxuICAgICAgICAgICAgb3JkZXI6IDEzLFxuICAgICAgICB9LFxuICAgICAgICBlbmFibGVEZWJ1Zzoge1xuICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBkZWJ1ZyBjb25zb2xlIHByaW50cy4nLFxuICAgICAgICAgICAgb3JkZXI6IDE0LFxuICAgICAgICB9LFxuICAgICAgICBsaW1pdFRvU2luZ2xlSW5zdGFuY2U6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xpbWl0IGhvdyBtYW55IHB5bGFtYSBiaW5hcmllcyBjYW4gYmUgZXhlY3V0ZWQuIEJ5IGRlZmF1bHQgaXMgc2V0IHRvIHNpbmdsZSBpbnN0YW5jZS4nXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgcmVxdWlyZSgnYXRvbS1wYWNrYWdlLWRlcHMnKS5pbnN0YWxsKCdsaW50ZXItcHl0aG9uJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNeSBwYWNrYWdlIHdhcyBhY3RpdmF0ZWQnKTtcbiAgICB9LFxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ015IHBhY2thZ2Ugd2FzIGRlYWN0aXZhdGVkJyk7XG4gICAgfSxcblxuICAgIHByb3ZpZGVMaW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IGxpbnRlciA9IG5ldyBMaW50ZXJQeXRob24oKTtcbiAgICAgICAgY29uc3QgcHJvdmlkZXIgPSB7XG4gICAgICAgICAgICBuYW1lOiAnUHl0aG9uIExpbnRlcicsXG4gICAgICAgICAgICBncmFtbWFyU2NvcGVzOiBbJ3NvdXJjZS5weXRob24nXSxcbiAgICAgICAgICAgIHNjb3BlOiAnZmlsZScsXG4gICAgICAgICAgICBsaW50T25GbHk6IHRydWUsXG4gICAgICAgICAgICBsaW50OiBsaW50ZXIubGludCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgIH1cbn07XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/linter-python/lib/init.js
