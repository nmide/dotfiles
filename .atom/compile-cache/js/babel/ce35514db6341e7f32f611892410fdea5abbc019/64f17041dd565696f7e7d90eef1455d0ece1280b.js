function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _atom = require('atom');

var _eventKit = require('event-kit');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FiguresModel = require('./FiguresModel');

var _FiguresModel2 = _interopRequireDefault(_FiguresModel);

var _FiguresView = require('./FiguresView');

var _FiguresView2 = _interopRequireDefault(_FiguresView);

var _TogglePanelButtonView = require('./TogglePanelButtonView');

var _TogglePanelButtonView2 = _interopRequireDefault(_TogglePanelButtonView);

'use babel';

var UPDATING_FAILED_MESSAGE = 'Updating class info failed propbably due to indexing being in progress or errors in PHP code. If the issue perisists please report it.';
var SERVICE_UNDEFINED_MESSAGE = 'Package could not be activated probably because php-integrator-base is missing.';

module.exports = {
    config: {
        panelSide: {
            title: 'Display side',
            description: 'Whether the panel should be displayed on left or right side.',
            type: 'string',
            'default': 'right',
            'enum': ['left', 'right']
        },
        defaultShowInherited: {
            title: 'Display inherited properties by default',
            description: 'Whether to display properties inherited from parents / traits / interfaces by default.',
            type: 'boolean',
            'default': false
        }
    },

    state: {
        panelCollapsed: false
    },

    activate: function activate(state) {
        this.state = state;
        atom.views.addViewProvider(_FiguresModel2['default'], _FiguresView2['default']);
    },

    deactivate: function deactivate() {
        this.subscriptions.dispose();
        if (!_lodash2['default'].isNil(this.panel)) this.panel.destroy();
    },

    serialize: function serialize() {
        return this.state;
    },

    service: null,

    panel: null,

    subscriptions: null,

    initPanel: function initPanel() {
        if (!_lodash2['default'].isNil(this.panel)) return;
        var panelElement = document.createElement('atom-php-integrator-symbol-viewer');
        (0, _TogglePanelButtonView2['default'])(panelElement, this.togglePanel.bind(this));
        if (this.state.panelCollapsed) {
            panelElement.classList.add('collapsed');
        }
        var panelOptions = {
            item: panelElement,
            visible: true
        };
        var panelSide = atom.config.get('php-integrator-symbol-viewer.panelSide');
        if (panelSide === 'right') {
            this.panel = atom.workspace.addRightPanel(panelOptions);
        } else if (panelSide === 'left') {
            this.panel = atom.workspace.addLeftPanel(panelOptions);
        } else {
            console.warn('Invalid panel side option.');
        }
    },

    togglePanel: function togglePanel() {
        var _this = this;

        var editor = atom.workspace.getActiveTextEditor();
        var errors = [function () {
            return atom.workspace.getTextEditors().length < 1;
        }, function () {
            return _lodash2['default'].isNil(editor);
        }, function () {
            return _lodash2['default'].isNil(_this.panel);
        }, function () {
            return !(editor instanceof _atom.TextEditor);
        }, function () {
            return editor.getGrammar().name !== 'PHP';
        }, function () {
            return _lodash2['default'].isNil(editor.buffer.file);
        }, function () {
            return _lodash2['default'].isNil(editor.buffer.file.path);
        }];
        if (_lodash2['default'].some(errors, function (f) {
            return f();
        })) return;
        this.panel.item.classList.toggle('collapsed');
    },

    updatePanel: function updatePanel(newContent) {
        var newPanelContent = newContent;
        if (_lodash2['default'].isNil(this.panel)) this.initPanel();
        if (_lodash2['default'].isNil(this.panel.item)) this.initPanel();
        if (_lodash2['default'].isNil(newPanelContent)) this.disablePanel();
        var currentContent = this.panel.item.querySelector('atom-php-integrator-symbol-viewer-content');
        if (currentContent) {
            this.panel.item.replaceChild(newPanelContent, currentContent);
        } else {
            this.panel.item.appendChild(newPanelContent);
        }
    },

    destroyPanel: function destroyPanel() {
        if (_lodash2['default'].isNil(this.panel)) return;
        this.panel.destroy();
        this.panel = null;
    },

    showPanel: function showPanel() {
        if (_lodash2['default'].isNil(this.panel)) return;
        this.state.panelCollapsed = false;
        this.panel.item.classList.remove('collapsed');
    },

    disablePanel: function disablePanel() {
        if (_lodash2['default'].isNil(this.panel)) return;
        this.state.panelCollapsed = this.panel.item.classList.contains('collapsed');
        this.panel.item.classList.add('collapsed');
    },

    updateClassInfo: function updateClassInfo() {
        var _this2 = this;

        var editor = atom.workspace.getActiveTextEditor();

        var editorErrors = [function () {
            return atom.workspace.getTextEditors().length < 1;
        }, function () {
            return _lodash2['default'].isNil(editor);
        }, function () {
            return !(editor instanceof _atom.TextEditor);
        }, function () {
            return editor.getGrammar().name !== 'PHP';
        }, function () {
            return _lodash2['default'].isNil(editor.buffer.file);
        }, function () {
            return _lodash2['default'].isNil(editor.buffer.file.path);
        }];
        if (_lodash2['default'].some(editorErrors, function (f) {
            return f();
        })) return this.disablePanel();
        if (false === this.state.panelCollapsed) {
            this.showPanel();
        }
        var getFigureInfo = function getFigureInfo(f) {
            return _this2.service.getClassInfo(f.name, true);
        };
        var onSuccess = function onSuccess(emptyFiguresData) {
            var promises = (0, _lodash2['default'])(emptyFiguresData).values().map(getFigureInfo).value();
            Promise.all(promises).then(function (figuresData) {
                if (_lodash2['default'].isEmpty(figuresData)) return _this2.updatePanel();
                var figuresModel = new _FiguresModel2['default'](figuresData);
                _this2.updatePanel(atom.views.getView(figuresModel));
            });
        };
        var onError = function onError(e) {
            return console.warn(UPDATING_FAILED_MESSAGE, e.message);
        };

        var path = editor.buffer.file.path;
        this.service.getClassListForFile(path, true).then(onSuccess, onError);
    },

    init: function init(service) {
        var _this3 = this;

        if (_lodash2['default'].isNil(service)) return console.warn(SERVICE_UNDEFINED_MESSAGE);

        this.service = service;
        this.subscriptions = new _eventKit.CompositeDisposable();

        _lodash2['default'].delay(function () {
            _this3.initPanel();
            _this3.updateClassInfo();
            _this3.registerCommands.bind(_this3)();
            _this3.registerEvents.bind(_this3)();
        }, 1500);
    },

    registerEvents: function registerEvents() {
        var _this4 = this;

        var subscriptions = [atom.workspace.onDidChangeActivePaneItem(this.updateClassInfo.bind(this)), this.service.onDidFinishIndexing(this.updateClassInfo.bind(this)), atom.config.onDidChange('php-integrator-symbol-viewer.panelSide', function () {
            _this4.destroyPanel();
            _this4.initPanel();
        })];

        subscriptions.forEach(function (sub) {
            return _this4.subscriptions.add(sub);
        });
    },

    registerCommands: function registerCommands() {
        var _this5 = this;

        var togglePanel = atom.commands.add('atom-workspace', 'php-integrator-symbol-viewer:toggle-panel', function (e) {
            return _this5.togglePanel();
        });
        this.subscriptions.add(togglePanel);
    },

    dispose: function dispose() {
        this.subscriptions.dispose();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvTWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztvQkFJTyxNQUFNOzt3QkFHTixXQUFXOztzQkFDSixRQUFROzs7OzRCQUNHLGdCQUFnQjs7OzsyQkFDakIsZUFBZTs7OztxQ0FDTCx5QkFBeUI7Ozs7QUFYM0QsV0FBVyxDQUFDOztBQWFaLElBQU0sdUJBQXVCLEdBQUcsd0lBQXdJLENBQUM7QUFDekssSUFBTSx5QkFBeUIsR0FBRyxpRkFBaUYsQ0FBQzs7QUFFcEgsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNiLFVBQU0sRUFBRTtBQUNKLGlCQUFTLEVBQUU7QUFDUCxpQkFBSyxFQUFFLGNBQWM7QUFDckIsdUJBQVcsRUFBRSw4REFBOEQ7QUFDM0UsZ0JBQUksRUFBRSxRQUFRO0FBQ2QsdUJBQVMsT0FBTztBQUNoQixvQkFBTSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7U0FDMUI7QUFDRCw0QkFBb0IsRUFBRTtBQUNsQixpQkFBSyxFQUFFLHlDQUF5QztBQUNoRCx1QkFBVyxFQUFFLHdGQUF3RjtBQUNyRyxnQkFBSSxFQUFFLFNBQVM7QUFDZix1QkFBUyxLQUFLO1NBQ2pCO0tBQ0o7O0FBRUQsU0FBSyxFQUFFO0FBQ0gsc0JBQWMsRUFBRSxLQUFLO0tBQ3hCOztBQUVELFlBQVEsRUFBRSxrQkFBUyxLQUFLLEVBQUU7QUFDdEIsWUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsWUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLHFEQUEyQixDQUFDO0tBQ3pEOztBQUVELGNBQVUsRUFBRSxzQkFBVztBQUNuQixZQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLFlBQUksQ0FBQyxvQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENB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LElBQUksUUFBTSxFQUFFLENBQUM7U0FDcEMsRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNaOztBQUVELGtCQUFjLEVBQUUsMEJBQVc7OztBQUN2QixZQUFJLGFBQWEsR0FBRyxDQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3pFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsd0NBQXdDLEVBQUUsWUFBTTtBQUNwRSxtQkFBSyxZQUFZLEVBQUUsQ0FBQztBQUNwQixtQkFBSyxTQUFTLEVBQUUsQ0FBQztTQUNwQixDQUFDLENBQ0wsQ0FBQzs7QUFFRixxQkFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUc7bUJBQUssT0FBSyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztTQUFBLENBQUMsQ0FBQztLQUMvRDs7QUFFRCxvQkFBZ0IsRUFBRSw0QkFBVzs7O0FBQ3pCLFlBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUMvQixnQkFBZ0IsRUFDaEIsMkNBQTJDLEVBQzNDLFVBQUMsQ0FBQzttQkFBSyxPQUFLLFdBQVcsRUFBRTtTQUFBLENBQzVCLENBQUM7QUFDRixZQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN2Qzs7QUFFRCxXQUFPLEVBQUUsbUJBQVc7QUFDaEIsWUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQztDQUNKLENBQUEiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9waHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyL2xpYi9NYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7XG4gICAgVGV4dEVkaXRvclxufSBmcm9tICdhdG9tJztcbmltcG9ydCB7XG4gICAgQ29tcG9zaXRlRGlzcG9zYWJsZVxufSBmcm9tICdldmVudC1raXQnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBGaWd1cmVzTW9kZWwgZnJvbSAnLi9GaWd1cmVzTW9kZWwnO1xuaW1wb3J0IEZpZ3VyZXNWaWV3IGZyb20gJy4vRmlndXJlc1ZpZXcnO1xuaW1wb3J0IFRvZ2dsZVBhbmVsQnV0dG9uVmlldyBmcm9tICcuL1RvZ2dsZVBhbmVsQnV0dG9uVmlldyc7XG5cbmNvbnN0IFVQREFUSU5HX0ZBSUxFRF9NRVNTQUdFID0gJ1VwZGF0aW5nIGNsYXNzIGluZm8gZmFpbGVkIHByb3BiYWJseSBkdWUgdG8gaW5kZXhpbmcgYmVpbmcgaW4gcHJvZ3Jlc3Mgb3IgZXJyb3JzIGluIFBIUCBjb2RlLiBJZiB0aGUgaXNzdWUgcGVyaXNpc3RzIHBsZWFzZSByZXBvcnQgaXQuJztcbmNvbnN0IFNFUlZJQ0VfVU5ERUZJTkVEX01FU1NBR0UgPSAnUGFja2FnZSBjb3VsZCBub3QgYmUgYWN0aXZhdGVkIHByb2JhYmx5IGJlY2F1c2UgcGhwLWludGVncmF0b3ItYmFzZSBpcyBtaXNzaW5nLic7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbmZpZzoge1xuICAgICAgICBwYW5lbFNpZGU6IHtcbiAgICAgICAgICAgIHRpdGxlOiAnRGlzcGxheSBzaWRlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnV2hldGhlciB0aGUgcGFuZWwgc2hvdWxkIGJlIGRpc3BsYXllZCBvbiBsZWZ0IG9yIHJpZ2h0IHNpZGUuJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGVudW06IFsnbGVmdCcsICdyaWdodCddXG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRTaG93SW5oZXJpdGVkOiB7XG4gICAgICAgICAgICB0aXRsZTogJ0Rpc3BsYXkgaW5oZXJpdGVkIHByb3BlcnRpZXMgYnkgZGVmYXVsdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1doZXRoZXIgdG8gZGlzcGxheSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIHBhcmVudHMgLyB0cmFpdHMgLyBpbnRlcmZhY2VzIGJ5IGRlZmF1bHQuJyxcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXRlOiB7XG4gICAgICAgIHBhbmVsQ29sbGFwc2VkOiBmYWxzZVxuICAgIH0sXG5cbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICBhdG9tLnZpZXdzLmFkZFZpZXdQcm92aWRlcihGaWd1cmVzTW9kZWwsIEZpZ3VyZXNWaWV3KTtcbiAgICB9LFxuXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5kaXNwb3NlKCk7XG4gICAgICAgIGlmICghXy5pc05pbCh0aGlzLnBhbmVsKSkgdGhpcy5wYW5lbC5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHNlcmlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgIH0sXG5cbiAgICBzZXJ2aWNlOiBudWxsLFxuXG4gICAgcGFuZWw6IG51bGwsXG5cbiAgICBzdWJzY3JpcHRpb25zOiBudWxsLFxuXG4gICAgaW5pdFBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFfLmlzTmlsKHRoaXMucGFuZWwpKSByZXR1cm47XG4gICAgICAgIHZhciBwYW5lbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdG9tLXBocC1pbnRlZ3JhdG9yLXN5bWJvbC12aWV3ZXInKTtcbiAgICAgICAgVG9nZ2xlUGFuZWxCdXR0b25WaWV3KHBhbmVsRWxlbWVudCwgdGhpcy50b2dnbGVQYW5lbC5iaW5kKHRoaXMpKTtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5wYW5lbENvbGxhcHNlZCkge1xuICAgICAgICAgICAgcGFuZWxFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYW5lbE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpdGVtOiBwYW5lbEVsZW1lbnQsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHZhciBwYW5lbFNpZGUgPSBhdG9tLmNvbmZpZy5nZXQoJ3BocC1pbnRlZ3JhdG9yLXN5bWJvbC12aWV3ZXIucGFuZWxTaWRlJyk7XG4gICAgICAgIGlmIChwYW5lbFNpZGUgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRSaWdodFBhbmVsKHBhbmVsT3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFuZWxTaWRlID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRMZWZ0UGFuZWwocGFuZWxPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW52YWxpZCBwYW5lbCBzaWRlIG9wdGlvbi4nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGVQYW5lbDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk7XG4gICAgICAgIHZhciBlcnJvcnMgPSBbXG4gICAgICAgICAgICAoKSA9PiBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpLmxlbmd0aCA8IDEsXG4gICAgICAgICAgICAoKSA9PiBfLmlzTmlsKGVkaXRvciksXG4gICAgICAgICAgICAoKSA9PiBfLmlzTmlsKHRoaXMucGFuZWwpLFxuICAgICAgICAgICAgKCkgPT4gIShlZGl0b3IgaW5zdGFuY2VvZiBUZXh0RWRpdG9yKSxcbiAgICAgICAgICAgICgpID0+IGVkaXRvci5nZXRHcmFtbWFyKCkubmFtZSAhPT0gJ1BIUCcsXG4gICAgICAgICAgICAoKSA9PiBfLmlzTmlsKGVkaXRvci5idWZmZXIuZmlsZSksXG4gICAgICAgICAgICAoKSA9PiBfLmlzTmlsKGVkaXRvci5idWZmZXIuZmlsZS5wYXRoKSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKF8uc29tZShlcnJvcnMsIChmKSA9PiBmKCkpKSByZXR1cm47XG4gICAgICAgIHRoaXMucGFuZWwuaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzZWQnKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUGFuZWw6IGZ1bmN0aW9uKG5ld0NvbnRlbnQpIHtcbiAgICAgICAgdmFyIG5ld1BhbmVsQ29udGVudCA9IG5ld0NvbnRlbnQ7XG4gICAgICAgIGlmIChfLmlzTmlsKHRoaXMucGFuZWwpKSB0aGlzLmluaXRQYW5lbCgpO1xuICAgICAgICBpZiAoXy5pc05pbCh0aGlzLnBhbmVsLml0ZW0pKSB0aGlzLmluaXRQYW5lbCgpO1xuICAgICAgICBpZiAoXy5pc05pbChuZXdQYW5lbENvbnRlbnQpKSB0aGlzLmRpc2FibGVQYW5lbCgpO1xuICAgICAgICB2YXIgY3VycmVudENvbnRlbnQgPSB0aGlzXG4gICAgICAgICAgICAucGFuZWxcbiAgICAgICAgICAgIC5pdGVtXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvcignYXRvbS1waHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyLWNvbnRlbnQnKTtcbiAgICAgICAgaWYgKGN1cnJlbnRDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLml0ZW0ucmVwbGFjZUNoaWxkKG5ld1BhbmVsQ29udGVudCwgY3VycmVudENvbnRlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5pdGVtLmFwcGVuZENoaWxkKG5ld1BhbmVsQ29udGVudCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZGVzdHJveVBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF8uaXNOaWwodGhpcy5wYW5lbCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5wYW5lbC5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMucGFuZWwgPSBudWxsO1xuICAgIH0sXG5cbiAgICBzaG93UGFuZWw6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoXy5pc05pbCh0aGlzLnBhbmVsKSkgcmV0dXJuO1xuICAgICAgICB0aGlzLnN0YXRlLnBhbmVsQ29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGFuZWwuaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzZWQnKTtcbiAgICB9LFxuXG4gICAgZGlzYWJsZVBhbmVsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKF8uaXNOaWwodGhpcy5wYW5lbCkpIHJldHVybjtcbiAgICAgICAgdGhpcy5zdGF0ZS5wYW5lbENvbGxhcHNlZCA9IHRoaXMucGFuZWwuaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNlZCcpO1xuICAgICAgICB0aGlzLnBhbmVsLml0ZW0uY2xhc3NMaXN0LmFkZCgnY29sbGFwc2VkJyk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUNsYXNzSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBhdG9tLndvcmtzcGFjZS5nZXRBY3RpdmVUZXh0RWRpdG9yKCk7XG5cbiAgICAgICAgdmFyIGVkaXRvckVycm9ycyA9IFtcbiAgICAgICAgICAgICgpID0+IGF0b20ud29ya3NwYWNlLmdldFRleHRFZGl0b3JzKCkubGVuZ3RoIDwgMSxcbiAgICAgICAgICAgICgpID0+IF8uaXNOaWwoZWRpdG9yKSxcbiAgICAgICAgICAgICgpID0+ICEoZWRpdG9yIGluc3RhbmNlb2YgVGV4dEVkaXRvciksXG4gICAgICAgICAgICAoKSA9PiBlZGl0b3IuZ2V0R3JhbW1hcigpLm5hbWUgIT09ICdQSFAnLFxuICAgICAgICAgICAgKCkgPT4gXy5pc05pbChlZGl0b3IuYnVmZmVyLmZpbGUpLFxuICAgICAgICAgICAgKCkgPT4gXy5pc05pbChlZGl0b3IuYnVmZmVyLmZpbGUucGF0aCksXG4gICAgICAgIF07XG4gICAgICAgIGlmIChfLnNvbWUoZWRpdG9yRXJyb3JzLCAoZikgPT4gZigpKSkgcmV0dXJuIHRoaXMuZGlzYWJsZVBhbmVsKCk7XG4gICAgICAgIGlmIChmYWxzZSA9PT0gdGhpcy5zdGF0ZS5wYW5lbENvbGxhcHNlZCkge1xuICAgICAgICAgICAgdGhpcy5zaG93UGFuZWwoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZ2V0RmlndXJlSW5mbyA9IChmKSA9PiB0aGlzLnNlcnZpY2UuZ2V0Q2xhc3NJbmZvKGYubmFtZSwgdHJ1ZSk7XG4gICAgICAgIHZhciBvblN1Y2Nlc3MgPSAoZW1wdHlGaWd1cmVzRGF0YSkgPT4ge1xuICAgICAgICAgICAgdmFyIHByb21pc2VzID0gXyhlbXB0eUZpZ3VyZXNEYXRhKS52YWx1ZXMoKS5tYXAoZ2V0RmlndXJlSW5mbykudmFsdWUoKTtcbiAgICAgICAgICAgIFByb21pc2VcbiAgICAgICAgICAgICAgICAuYWxsKHByb21pc2VzKVxuICAgICAgICAgICAgICAgIC50aGVuKChmaWd1cmVzRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5pc0VtcHR5KGZpZ3VyZXNEYXRhKSkgcmV0dXJuIHRoaXMudXBkYXRlUGFuZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZ3VyZXNNb2RlbCA9IG5ldyBGaWd1cmVzTW9kZWwoZmlndXJlc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhbmVsKGF0b20udmlld3MuZ2V0VmlldyhmaWd1cmVzTW9kZWwpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb25FcnJvciA9IChlKSA9PiBjb25zb2xlLndhcm4oVVBEQVRJTkdfRkFJTEVEX01FU1NBR0UsIGUubWVzc2FnZSk7XG5cbiAgICAgICAgdmFyIHBhdGggPSBlZGl0b3IuYnVmZmVyLmZpbGUucGF0aDtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldENsYXNzTGlzdEZvckZpbGUocGF0aCwgdHJ1ZSkudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbihzZXJ2aWNlKSB7XG4gICAgICAgIGlmIChfLmlzTmlsKHNlcnZpY2UpKSByZXR1cm4gY29uc29sZS53YXJuKFNFUlZJQ0VfVU5ERUZJTkVEX01FU1NBR0UpO1xuXG4gICAgICAgIHRoaXMuc2VydmljZSA9IHNlcnZpY2U7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG5cbiAgICAgICAgXy5kZWxheSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDbGFzc0luZm8oKTtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJDb21tYW5kcy5iaW5kKHRoaXMpKCk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzLmJpbmQodGhpcykoKTtcbiAgICAgICAgfSwgMTUwMCk7XG4gICAgfSxcblxuICAgIHJlZ2lzdGVyRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBbXG4gICAgICAgICAgICBhdG9tLndvcmtzcGFjZS5vbkRpZENoYW5nZUFjdGl2ZVBhbmVJdGVtKHRoaXMudXBkYXRlQ2xhc3NJbmZvLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLm9uRGlkRmluaXNoSW5kZXhpbmcodGhpcy51cGRhdGVDbGFzc0luZm8uYmluZCh0aGlzKSksXG4gICAgICAgICAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgncGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci5wYW5lbFNpZGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95UGFuZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRQYW5lbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXTtcblxuICAgICAgICBzdWJzY3JpcHRpb25zLmZvckVhY2goKHN1YikgPT4gdGhpcy5zdWJzY3JpcHRpb25zLmFkZChzdWIpKTtcbiAgICB9LFxuXG4gICAgcmVnaXN0ZXJDb21tYW5kczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0b2dnbGVQYW5lbCA9IGF0b20uY29tbWFuZHMuYWRkKFxuICAgICAgICAgICAgJ2F0b20td29ya3NwYWNlJyxcbiAgICAgICAgICAgICdwaHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyOnRvZ2dsZS1wYW5lbCcsXG4gICAgICAgICAgICAoZSkgPT4gdGhpcy50b2dnbGVQYW5lbCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQodG9nZ2xlUGFuZWwpO1xuICAgIH0sXG5cbiAgICBkaXNwb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLmRpc3Bvc2UoKTtcbiAgICB9XG59XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/Main.js
