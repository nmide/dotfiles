function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

'use babel';

module.exports = function ConstantDetailsView(constant) {
    return '\n        <div class="details">\n            <h6>Name</h6>\n            <p>' + constant.name + '</p>\n            <h6>Type</h6>\n            <p>' + constant['return'].resolvedType + '</p>\n            <h6>Declared in</h6>\n            <p>' + constant.declaringStructure.name + '</p>\n            ' + (_lodash2['default'].isNil(constant.descriptions.short) ? '' : '\n                <h6>Description</h6>\n                <p>' + constant.descriptions.short + '</p>\n            ') + '\n        </div>\n    ';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvQ29uc3RhbnREZXRhaWxzVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztzQkFFYyxRQUFROzs7O0FBRnRCLFdBQVcsQ0FBQzs7QUFJWixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsbUJBQW1CLENBQUMsUUFBUSxFQUFFO0FBQ3BELDJGQUdhLFFBQVEsQ0FBQyxJQUFJLHdEQUViLFFBQVEsVUFBTyxDQUFDLFlBQVksK0RBRTVCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLDJCQUNuQyxvQkFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsd0VBRTdCLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyx3QkFDbkMsNEJBRVA7Q0FDTCxDQUFBIiwiZmlsZSI6Ii9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvQ29uc3RhbnREZXRhaWxzVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIENvbnN0YW50RGV0YWlsc1ZpZXcoY29uc3RhbnQpIHtcbiAgICByZXR1cm4gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGV0YWlsc1wiPlxuICAgICAgICAgICAgPGg2Pk5hbWU8L2g2PlxuICAgICAgICAgICAgPHA+JHtjb25zdGFudC5uYW1lfTwvcD5cbiAgICAgICAgICAgIDxoNj5UeXBlPC9oNj5cbiAgICAgICAgICAgIDxwPiR7Y29uc3RhbnQucmV0dXJuLnJlc29sdmVkVHlwZX08L3A+XG4gICAgICAgICAgICA8aDY+RGVjbGFyZWQgaW48L2g2PlxuICAgICAgICAgICAgPHA+JHtjb25zdGFudC5kZWNsYXJpbmdTdHJ1Y3R1cmUubmFtZX08L3A+XG4gICAgICAgICAgICAke18uaXNOaWwoY29uc3RhbnQuZGVzY3JpcHRpb25zLnNob3J0KSA/IGBgIDogYFxuICAgICAgICAgICAgICAgIDxoNj5EZXNjcmlwdGlvbjwvaDY+XG4gICAgICAgICAgICAgICAgPHA+JHtjb25zdGFudC5kZXNjcmlwdGlvbnMuc2hvcnR9PC9wPlxuICAgICAgICAgICAgYH1cbiAgICAgICAgPC9kaXY+XG4gICAgYDtcbn1cbiJdfQ==
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/ConstantDetailsView.js
