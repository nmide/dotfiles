function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

'use babel';

module.exports = function TogglePanelButtonView(container, togglePanelCallback) {
    container.innerHTML = '\n        <div class="toggle-button-container">\n            <div class="toggle-button"></div>\n        </div>\n    ';
    container.querySelector('.toggle-button-container .toggle-button').onclick = togglePanelCallback;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvVG9nZ2xlUGFuZWxCdXR0b25WaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O3NCQUVjLFFBQVE7Ozs7QUFGdEIsV0FBVyxDQUFDOztBQUlaLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLEVBQUU7QUFDNUUsYUFBUyxDQUFDLFNBQVMseUhBSWxCLENBQUM7QUFDRixhQUFTLENBQ0osYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQ3hELE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztDQUN0QyxDQUFBIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvVG9nZ2xlUGFuZWxCdXR0b25WaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVG9nZ2xlUGFuZWxCdXR0b25WaWV3KGNvbnRhaW5lciwgdG9nZ2xlUGFuZWxDYWxsYmFjaykge1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2dnbGUtYnV0dG9uLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1idXR0b25cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbiAgICBjb250YWluZXJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy50b2dnbGUtYnV0dG9uLWNvbnRhaW5lciAudG9nZ2xlLWJ1dHRvbicpXG4gICAgICAgIC5vbmNsaWNrID0gdG9nZ2xlUGFuZWxDYWxsYmFjaztcbn1cbiJdfQ==
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/TogglePanelButtonView.js
