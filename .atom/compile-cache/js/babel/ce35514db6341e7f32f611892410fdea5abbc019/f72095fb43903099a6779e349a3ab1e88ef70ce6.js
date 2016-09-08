function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _PropertyDetailsView = require('./PropertyDetailsView');

var _PropertyDetailsView2 = _interopRequireDefault(_PropertyDetailsView);

'use babel';

module.exports = function PropertiesListView(properties, currentFigureName) {
    return _lodash2['default'].isEmpty(properties) ? '' : '\n        <div class="list properties-list">\n            ' + _lodash2['default'].map(properties, function (property) {
        return '\n                <div\n                    class="list-element"\n                    data-name="' + property.name + '"\n                    data-current-structure="' + currentFigureName + '"\n                    data-declaring-structure-name="' + property.declaringStructure.name + '"\n                    data-declaring-structure-file="' + property.declaringStructure.filename + '"\n                    data-declaring-structure-line="' + property.declaringStructure.startLineMember + '">\n                    <div class="title">\n                        <div class="inherited ' + (currentFigureName !== property.declaringStructure.name ? 'active' : '') + '"></div>\n                        <div class="bullet">P</div>\n                        <div class="name">\n                            ' + property.name + '\n                        </div>\n                        <div class="info"></div>\n                    </div>\n                    ' + (0, _PropertyDetailsView2['default'])(property) + '\n                </div>\n            ';
    }).join('') + '\n        </div>\n    ';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvUHJvcGVydGllc0xpc3RWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O3NCQUVjLFFBQVE7Ozs7bUNBQ1UsdUJBQXVCOzs7O0FBSHZELFdBQVcsQ0FBQzs7QUFLWixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLGlCQUFpQixFQUFFO0FBQ3hFLFdBQU8sb0JBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyx1RUFFbEIsb0JBQUUsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFDLFFBQVE7cUhBR1IsUUFBUSxDQUFDLElBQUksdURBQ0EsaUJBQWlCLDhEQUNWLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLDhEQUNoQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsUUFBUSw4REFDcEMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsb0dBRWhELGlCQUFpQixLQUFLLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLGlCQUFnQiwrSUFHeEYsUUFBUSxDQUFDLElBQUksNElBSXJCLHNDQUFvQixRQUFRLENBQUM7S0FFdEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsMkJBRWxCLENBQUM7Q0FDTCxDQUFBIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvUHJvcGVydGllc0xpc3RWaWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvcGVydHlEZXRhaWxzVmlldyBmcm9tICcuL1Byb3BlcnR5RGV0YWlsc1ZpZXcnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFByb3BlcnRpZXNMaXN0Vmlldyhwcm9wZXJ0aWVzLCBjdXJyZW50RmlndXJlTmFtZSkge1xuICAgIHJldHVybiBfLmlzRW1wdHkocHJvcGVydGllcykgPyBgYCA6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QgcHJvcGVydGllcy1saXN0XCI+XG4gICAgICAgICAgICAke18ubWFwKHByb3BlcnRpZXMsIChwcm9wZXJ0eSkgPT4gYFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsaXN0LWVsZW1lbnRcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLW5hbWU9XCIke3Byb3BlcnR5Lm5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1jdXJyZW50LXN0cnVjdHVyZT1cIiR7Y3VycmVudEZpZ3VyZU5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kZWNsYXJpbmctc3RydWN0dXJlLW5hbWU9XCIke3Byb3BlcnR5LmRlY2xhcmluZ1N0cnVjdHVyZS5uYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGVjbGFyaW5nLXN0cnVjdHVyZS1maWxlPVwiJHtwcm9wZXJ0eS5kZWNsYXJpbmdTdHJ1Y3R1cmUuZmlsZW5hbWV9XCJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kZWNsYXJpbmctc3RydWN0dXJlLWxpbmU9XCIke3Byb3BlcnR5LmRlY2xhcmluZ1N0cnVjdHVyZS5zdGFydExpbmVNZW1iZXJ9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluaGVyaXRlZCAke2N1cnJlbnRGaWd1cmVOYW1lICE9PSBwcm9wZXJ0eS5kZWNsYXJpbmdTdHJ1Y3R1cmUubmFtZSA/IGBhY3RpdmVgIDogYGB9XCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnVsbGV0XCI+UDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Byb3BlcnR5Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAke1Byb3BlcnR5RGV0YWlsc1ZpZXcocHJvcGVydHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCkuam9pbignJyl9XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG59XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/PropertiesListView.js