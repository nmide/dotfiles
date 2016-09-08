function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

'use babel';

module.exports = function StaticPropertyDetailsView(staticProperty) {
    return '\n        <div class="details">\n            <h6>Name</h6>\n            <p>' + staticProperty.name + '</p>\n            <h6>Type</h6>\n            <p>' + staticProperty['return'].resolvedType + '</p>\n            <h6>Declared in</h6>\n            <p>' + staticProperty.declaringStructure.name + '</p>\n            ' + (_lodash2['default'].isNil(staticProperty.descriptions.short) ? '' : '\n                <h6>Description</h6>\n                <p>' + staticProperty.descriptions.short + '</p>\n            ') + '\n        </div>\n    ';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvU3RhdGljUHJvcGVydHlEZXRhaWxzVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztzQkFFYyxRQUFROzs7O0FBRnRCLFdBQVcsQ0FBQzs7QUFJWixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMseUJBQXlCLENBQUMsY0FBYyxFQUFFO0FBQ2hFLDJGQUdhLGNBQWMsQ0FBQyxJQUFJLHdEQUVuQixjQUFjLFVBQU8sQ0FBQyxZQUFZLCtEQUVsQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSwyQkFDekMsb0JBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLHdFQUVuQyxjQUFjLENBQUMsWUFBWSxDQUFDLEtBQUssd0JBQ3pDLDRCQUVQO0NBQ0wsQ0FBQSIsImZpbGUiOiIvaG9tZS9uaWNrLy5hdG9tL3BhY2thZ2VzL3BocC1pbnRlZ3JhdG9yLXN5bWJvbC12aWV3ZXIvbGliL1N0YXRpY1Byb3BlcnR5RGV0YWlsc1ZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBTdGF0aWNQcm9wZXJ0eURldGFpbHNWaWV3KHN0YXRpY1Byb3BlcnR5KSB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImRldGFpbHNcIj5cbiAgICAgICAgICAgIDxoNj5OYW1lPC9oNj5cbiAgICAgICAgICAgIDxwPiR7c3RhdGljUHJvcGVydHkubmFtZX08L3A+XG4gICAgICAgICAgICA8aDY+VHlwZTwvaDY+XG4gICAgICAgICAgICA8cD4ke3N0YXRpY1Byb3BlcnR5LnJldHVybi5yZXNvbHZlZFR5cGV9PC9wPlxuICAgICAgICAgICAgPGg2PkRlY2xhcmVkIGluPC9oNj5cbiAgICAgICAgICAgIDxwPiR7c3RhdGljUHJvcGVydHkuZGVjbGFyaW5nU3RydWN0dXJlLm5hbWV9PC9wPlxuICAgICAgICAgICAgJHtfLmlzTmlsKHN0YXRpY1Byb3BlcnR5LmRlc2NyaXB0aW9ucy5zaG9ydCkgPyBgYCA6IGBcbiAgICAgICAgICAgICAgICA8aDY+RGVzY3JpcHRpb248L2g2PlxuICAgICAgICAgICAgICAgIDxwPiR7c3RhdGljUHJvcGVydHkuZGVzY3JpcHRpb25zLnNob3J0fTwvcD5cbiAgICAgICAgICAgIGB9XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/StaticPropertyDetailsView.js
