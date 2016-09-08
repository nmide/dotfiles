var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

'use babel';

var Figure = function Figure(rawFigure) {
    _classCallCheck(this, Figure);

    this.name = rawFigure.name;
    this.shortName = rawFigure.shortName;
    this.type = rawFigure.type;
    this.constants = (0, _lodash2['default'])(rawFigure.constants).values().value();
    this.staticProperties = (0, _lodash2['default'])(rawFigure.properties).filter('isStatic').value();
    this.staticMethods = (0, _lodash2['default'])(rawFigure.methods).filter('isStatic').value();
    this.properties = (0, _lodash2['default'])(rawFigure.properties).reject('isStatic').value();
    this.methods = (0, _lodash2['default'])(rawFigure.methods).reject('isStatic').value();
};

module.exports = (function (_Array) {
    _inherits(FiguresModel, _Array);

    function FiguresModel(rawFigures) {
        var _this = this;

        _classCallCheck(this, FiguresModel);

        _get(Object.getPrototypeOf(FiguresModel.prototype), 'constructor', this).call(this);

        (0, _lodash2['default'])(rawFigures).values().map(function (rawFigure) {
            return new Figure(rawFigure);
        }).each(function (f) {
            return _this.push(f);
        });
    }

    return FiguresModel;
})(Array);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvRmlndXJlc01vZGVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O3NCQUVjLFFBQVE7Ozs7QUFGdEIsV0FBVyxDQUFDOztJQUlOLE1BQU0sR0FDRyxTQURULE1BQU0sQ0FDSSxTQUFTLEVBQUU7MEJBRHJCLE1BQU07O0FBRUosUUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzNCLFFBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNyQyxRQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7QUFDM0IsUUFBSSxDQUFDLFNBQVMsR0FBRyx5QkFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLENBQ2xDLE1BQU0sRUFBRSxDQUNSLEtBQUssRUFBRSxDQUFDO0FBQ2IsUUFBSSxDQUFDLGdCQUFnQixHQUFHLHlCQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FDMUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixLQUFLLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxhQUFhLEdBQUcseUJBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUNwQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQ2xCLEtBQUssRUFBRSxDQUFDO0FBQ2IsUUFBSSxDQUFDLFVBQVUsR0FBRyx5QkFBRSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQ3BDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FDbEIsS0FBSyxFQUFFLENBQUM7QUFDYixRQUFJLENBQUMsT0FBTyxHQUFHLHlCQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FDOUIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixLQUFLLEVBQUUsQ0FBQztDQUNoQjs7QUFHTCxNQUFNLENBQUMsT0FBTztjQUFTLFlBQVk7O0FBQ3BCLGFBRFEsWUFBWSxDQUNuQixVQUFVLEVBQUU7Ozs4QkFETCxZQUFZOztBQUUzQixtQ0FGZSxZQUFZLDZDQUVuQjs7QUFFUixpQ0FBRSxVQUFVLENBQUMsQ0FDUixNQUFNLEVBQUUsQ0FDUixHQUFHLENBQUMsVUFBQyxTQUFTO21CQUFLLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztTQUFBLENBQUMsQ0FDekMsSUFBSSxDQUFDLFVBQUMsQ0FBQzttQkFBSyxNQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7U0FBQSxDQUFDLENBQUM7S0FDbEM7O1dBUmtCLFlBQVk7R0FBUyxLQUFLLENBU2hELENBQUEiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9waHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyL2xpYi9GaWd1cmVzTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY2xhc3MgRmlndXJlIHtcbiAgICBjb25zdHJ1Y3RvcihyYXdGaWd1cmUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gcmF3RmlndXJlLm5hbWU7XG4gICAgICAgIHRoaXMuc2hvcnROYW1lID0gcmF3RmlndXJlLnNob3J0TmFtZTtcbiAgICAgICAgdGhpcy50eXBlID0gcmF3RmlndXJlLnR5cGU7XG4gICAgICAgIHRoaXMuY29uc3RhbnRzID0gXyhyYXdGaWd1cmUuY29uc3RhbnRzKVxuICAgICAgICAgICAgLnZhbHVlcygpXG4gICAgICAgICAgICAudmFsdWUoKTtcbiAgICAgICAgdGhpcy5zdGF0aWNQcm9wZXJ0aWVzID0gXyhyYXdGaWd1cmUucHJvcGVydGllcylcbiAgICAgICAgICAgIC5maWx0ZXIoJ2lzU3RhdGljJylcbiAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgICAgICB0aGlzLnN0YXRpY01ldGhvZHMgPSBfKHJhd0ZpZ3VyZS5tZXRob2RzKVxuICAgICAgICAgICAgLmZpbHRlcignaXNTdGF0aWMnKVxuICAgICAgICAgICAgLnZhbHVlKCk7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IF8ocmF3RmlndXJlLnByb3BlcnRpZXMpXG4gICAgICAgICAgICAucmVqZWN0KCdpc1N0YXRpYycpXG4gICAgICAgICAgICAudmFsdWUoKTtcbiAgICAgICAgdGhpcy5tZXRob2RzID0gXyhyYXdGaWd1cmUubWV0aG9kcylcbiAgICAgICAgICAgIC5yZWplY3QoJ2lzU3RhdGljJylcbiAgICAgICAgICAgIC52YWx1ZSgpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBGaWd1cmVzTW9kZWwgZXh0ZW5kcyBBcnJheSB7XG4gICAgY29uc3RydWN0b3IocmF3RmlndXJlcykge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIF8ocmF3RmlndXJlcylcbiAgICAgICAgICAgIC52YWx1ZXMoKVxuICAgICAgICAgICAgLm1hcCgocmF3RmlndXJlKSA9PiBuZXcgRmlndXJlKHJhd0ZpZ3VyZSkpXG4gICAgICAgICAgICAuZWFjaCgoZikgPT4gdGhpcy5wdXNoKGYpKTtcbiAgICB9XG59XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/FiguresModel.js
