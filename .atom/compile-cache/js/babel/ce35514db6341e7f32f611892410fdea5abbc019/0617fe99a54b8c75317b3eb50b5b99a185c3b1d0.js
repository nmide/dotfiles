function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

'use babel';

module.exports = function PropertyDetailsView(property) {
    return '\n        <div class="details">\n            <h6>Name</h6>\n            <p>' + property.name + '</p>\n            <h6>Type</h6>\n            <p>' + property['return'].resolvedType + '</p>\n            <h6>Declared in</h6>\n            <p>' + property.declaringStructure.name + '</p>\n            ' + (_lodash2['default'].isNil(property.descriptions.short) ? '' : '\n                <h6>Description</h6>\n                <p>' + property.descriptions.short + '</p>\n            ') + '\n        </div>\n    ';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvUHJvcGVydHlEZXRhaWxzVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztzQkFFYyxRQUFROzs7O0FBRnRCLFdBQVcsQ0FBQzs7QUFJWixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsUUFBUSxFQUFFO0FBQ3BELDJGQUdhLFFBQVEsQ0FBQyxJQUFJLHdEQUViLFFBQVEsVUFBTyxDQUFDLFlBQVksK0RBRTVCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLDJCQUNuQyxvQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsd0VBRTdCLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyx3QkFDbkMsNEJBRVA7Q0FDTCxDQUFBIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvUHJvcGVydHlEZXRhaWxzVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIFByb3BlcnR5RGV0YWlsc1ZpZXcocHJvcGVydHkpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgPGg2Pk5hbWU8L2g2PlxuICAgICAgICAgICAgPHA+JHtwcm9wZXJ0eS5uYW1lfTwvcD5cbiAgICAgICAgICAgIDxoNj5UeXBlPC9oNj5cbiAgICAgICAgICAgIDxwPiR7cHJvcGVydHkucmV0dXJuLnJlc29sdmVkVHlwZX08L3A+XG4gICAgICAgICAgICA8aDY+RGVjbGFyZWQgaW48L2g2PlxuICAgICAgICAgICAgPHA+JHtwcm9wZXJ0eS5kZWNsYXJpbmdTdHJ1Y3R1cmUubmFtZX08L3A+XG4gICAgICAgICAgICAke18uaXNOaWwocHJvcGVydHkuZGVzY3JpcHRpb25zLnNob3J0KSA/IGBgIDogYFxuICAgICAgICAgICAgICAgIDxoNj5EZXNjcmlwdGlvbjwvaDY+XG4gICAgICAgICAgICAgICAgPHA+JHtwcm9wZXJ0eS5kZXNjcmlwdGlvbnMuc2hvcnR9PC9wPlxuICAgICAgICAgICAgYH1cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbiJdfQ==
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/PropertyDetailsView.js
