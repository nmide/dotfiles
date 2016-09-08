function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _StaticPropertyDetailsView = require('./StaticPropertyDetailsView');

var _StaticPropertyDetailsView2 = _interopRequireDefault(_StaticPropertyDetailsView);

'use babel';

module.exports = function StaticPropertiesListView(staticProperties, currentFigureName) {
    return _lodash2['default'].isEmpty(staticProperties) ? '' : '\n        <div class="list static-properties-list">\n            ' + _lodash2['default'].map(staticProperties, function (staticProperty) {
        return '\n                <div\n                    class="list-element"\n                    data-name="' + staticProperty.name + '"\n                    data-current-structure="' + currentFigureName + '"\n                    data-declaring-structure-name="' + staticProperty.declaringStructure.name + '"\n                    data-declaring-structure-file="' + staticProperty.declaringStructure.filename + '"\n                    data-declaring-structure-line="' + staticProperty.declaringStructure.startLineMember + '">\n                    <div class="title">\n                        <div class="inherited ' + (currentFigureName !== staticProperty.declaringStructure.name ? 'active' : '') + '"></div>\n                        <div class="bullet">SP</div>\n                        <div class="name">\n                            ' + staticProperty.name + '\n                        </div>\n                        <div class="info"></div>\n                    </div>\n                    ' + (0, _StaticPropertyDetailsView2['default'])(staticProperty) + '\n                </div>\n            ';
    }).join('') + '\n        </div>\n    ';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvU3RhdGljUHJvcGVydGllc0xpc3RWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O3NCQUVjLFFBQVE7Ozs7eUNBQ2dCLDZCQUE2Qjs7OztBQUhuRSxXQUFXLENBQUM7O0FBS1osTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLHdCQUF3QixDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFO0FBQ3BGLFdBQU8sb0JBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLDhFQUV4QixvQkFBRSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxjQUFjO3FIQUdwQixjQUFjLENBQUMsSUFBSSx1REFDTixpQkFBaUIsOERBQ1YsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksOERBQ3RDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLDhEQUMxQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsZUFBZSxvR0FFdEQsaUJBQWlCLEtBQUssY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksaUJBQWdCLGdKQUc5RixjQUFjLENBQUMsSUFBSSw0SUFJM0IsNENBQTBCLGNBQWMsQ0FBQztLQUVsRCxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywyQkFFbEIsQ0FBQztDQUNMLENBQUEiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9waHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyL2xpYi9TdGF0aWNQcm9wZXJ0aWVzTGlzdFZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBTdGF0aWNQcm9wZXJ0eURldGFpbHNWaWV3IGZyb20gJy4vU3RhdGljUHJvcGVydHlEZXRhaWxzVmlldyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gU3RhdGljUHJvcGVydGllc0xpc3RWaWV3KHN0YXRpY1Byb3BlcnRpZXMsIGN1cnJlbnRGaWd1cmVOYW1lKSB7XG4gICAgcmV0dXJuIF8uaXNFbXB0eShzdGF0aWNQcm9wZXJ0aWVzKSA/IGBgIDogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdCBzdGF0aWMtcHJvcGVydGllcy1saXN0XCI+XG4gICAgICAgICAgICAke18ubWFwKHN0YXRpY1Byb3BlcnRpZXMsIChzdGF0aWNQcm9wZXJ0eSkgPT4gYFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaXN0LWVsZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLW5hbWU9XCIke3N0YXRpY1Byb3BlcnR5Lm5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1jdXJyZW50LXN0cnVjdHVyZT1cIiR7Y3VycmVudEZpZ3VyZU5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kZWNsYXJpbmctc3RydWN0dXJlLW5hbWU9XCIke3N0YXRpY1Byb3BlcnR5LmRlY2xhcmluZ1N0cnVjdHVyZS5uYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGVjbGFyaW5nLXN0cnVjdHVyZS1maWxlPVwiJHtzdGF0aWNQcm9wZXJ0eS5kZWNsYXJpbmdTdHJ1Y3R1cmUuZmlsZW5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kZWNsYXJpbmctc3RydWN0dXJlLWxpbmU9XCIke3N0YXRpY1Byb3BlcnR5LmRlY2xhcmluZ1N0cnVjdHVyZS5zdGFydExpbmVNZW1iZXJ9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluaGVyaXRlZCAke2N1cnJlbnRGaWd1cmVOYW1lICE9PSBzdGF0aWNQcm9wZXJ0eS5kZWNsYXJpbmdTdHJ1Y3R1cmUubmFtZSA/IGBhY3RpdmVgIDogYGB9XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVsbGV0XCI+U1A8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzdGF0aWNQcm9wZXJ0eS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mb1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgJHtTdGF0aWNQcm9wZXJ0eURldGFpbHNWaWV3KHN0YXRpY1Byb3BlcnR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxuICAgICAgICA8L2Rpdj5cbiAgICBgO1xufVxuIl19
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/StaticPropertiesListView.js
