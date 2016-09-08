function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ConstantsListView = require('./ConstantsListView');

var _ConstantsListView2 = _interopRequireDefault(_ConstantsListView);

var _StaticPropertiesListView = require('./StaticPropertiesListView');

var _StaticPropertiesListView2 = _interopRequireDefault(_StaticPropertiesListView);

var _StaticMethodsListView = require('./StaticMethodsListView');

var _StaticMethodsListView2 = _interopRequireDefault(_StaticMethodsListView);

var _PropertiesListView = require('./PropertiesListView');

var _PropertiesListView2 = _interopRequireDefault(_PropertiesListView);

var _MethodsListView = require('./MethodsListView');

var _MethodsListView2 = _interopRequireDefault(_MethodsListView);

'use babel';

module.exports = function FiguresView(figuresModel) {
    var container = document.createElement('atom-php-integrator-symbol-viewer-content');
    container.innerHTML = '\n        <div class="figure-container">\n            <div class="settings-view">\n            <select class="figure-choice form-control">\n                ' + _lodash2['default'].map(figuresModel, function (figure) {
        return '\n                    <option value="' + figure.name + '">\n                        ' + figure.type + ' ' + figure.shortName + '\n                    </option>\n                ';
    }) + '\n            </select>\n            </div>\n        </div>\n        ' + _lodash2['default'].map(figuresModel, function (figure) {
        return '\n            <div class="lists-container" data-figure="' + figure.name + '">\n                ' + (0, _ConstantsListView2['default'])(figure.constants, figure.name) + '\n                ' + (0, _StaticPropertiesListView2['default'])(figure.staticProperties, figure.name) + '\n                ' + (0, _StaticMethodsListView2['default'])(figure.staticMethods, figure.name) + '\n                ' + (0, _PropertiesListView2['default'])(figure.properties, figure.name) + '\n                ' + (0, _MethodsListView2['default'])(figure.methods, figure.name) + '\n            </div>\n        ';
    }).join('') + '\n        <div class="filter-container">\n            <div class="settings-view">\n                <div class="control-group">\n                    <div class="controls">\n                        <div class="checkbox">\n                            <label for="show-inherited-properties">\n                                <input id="show-inherited-properties" type="checkbox">\n                                <div class="setting-title">\n                                    Show inherited properties\n                                </div>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="search-container">\n        </div>\n    ';

    var searchTextEditor = atom.workspace.buildTextEditor({ mini: true });
    searchTextEditor.setPlaceholderText('Search...');
    var showInheritedCheckbox = container.querySelector('#show-inherited-properties');
    showInheritedCheckbox.checked = atom.config.get('php-integrator-symbol-viewer.defaultShowInherited');
    var filterLists = function filterLists() {
        var listElements = _lodash2['default'].toArray(container.querySelectorAll('.list-element'));
        _lodash2['default'].each(listElements, function (element) {
            element.style.display = 'none';
            if (showInheritedCheckbox.checked) {
                element.style.display = 'block';
            } else {
                if (element.dataset.currentStructure === element.dataset.declaringStructureName) {
                    element.style.display = 'block';
                }
            }
            element.querySelector('.name').innerHTML = element.dataset.name;
        });

        var lists = _lodash2['default'].toArray(container.querySelectorAll('.list'));
        _lodash2['default'].each(lists, function (list) {
            list.style.display = 'block';
        });
        if (!!searchTextEditor.getText().length) {
            var input = searchTextEditor.getText().toLowerCase().split('');
            var inputRegex = new RegExp(input.map(function (c) {
                return c + '.*';
            }).join(''));

            _lodash2['default'].each(listElements, function (element) {
                var symbolName = element.dataset.name;
                if (inputRegex.test(symbolName.toLowerCase())) {
                    var charsToHighlight = input.slice(0);
                    var highlightedName = symbolName.split('').map(function (c) {
                        if (c.toLowerCase() === charsToHighlight[0]) {
                            charsToHighlight.shift();
                            return '\n                                    <span class="highlighted-letter">\n                                        ' + c + '\n                                    </span>\n                                ';
                        }
                        return c;
                    }).join('');
                    element.querySelector('.name').innerHTML = highlightedName;
                } else {
                    element.style.display = 'none';
                }
            });

            var lists = _lodash2['default'].toArray(container.querySelectorAll('.list'));
            _lodash2['default'].each(lists, function (list) {
                var elements = (0, _lodash2['default'])(list.querySelectorAll('.list-element')).toArray().filter(function (e) {
                    return e.style.display === 'block';
                }).value();

                if (elements.length < 1) {
                    list.style.display = 'none';
                }
            });
        }
    };
    searchTextEditor.onDidStopChanging(filterLists);
    showInheritedCheckbox.onchange = filterLists;
    var searchContainer = container.querySelector('.search-container');
    searchContainer.appendChild(atom.views.getView(searchTextEditor));

    var figureChoice = container.querySelector('.figure-choice');
    var updateList = function updateList() {
        var currentClass = figureChoice.value;
        var lists = _lodash2['default'].toArray(container.querySelectorAll('.lists-container'));
        lists.forEach(function (l) {
            return l.classList.remove('active');
        });
        lists.filter(function (l) {
            return l.dataset.figure === currentClass;
        }).forEach(function (l) {
            return l.classList.add('active');
        });
        filterLists();
    };
    figureChoice.onchange = updateList;
    updateList();

    var listElements = container.querySelectorAll('.list-element');
    [].forEach.call(listElements, function (listElement) {
        var detailsElement = listElement.querySelector('.details');

        listElement.querySelector('.name').onclick = function () {
            var file = listElement.dataset.declaringStructureFile;
            var line = listElement.dataset.declaringStructureLine;
            atom.workspace.open(file, { initialLine: parseInt(line) - 1 }).then(function (e) {
                return e.scrollToCursorPosition({ center: true });
            });
        };
        listElement.querySelector('.info').onclick = function () {
            listElement.classList.toggle('active');
            detailsElement.classList.toggle('active');
        };
    });

    return container;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci9saWIvRmlndXJlc1ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7c0JBRWMsUUFBUTs7OztpQ0FDUSxxQkFBcUI7Ozs7d0NBQ2QsNEJBQTRCOzs7O3FDQUMvQix5QkFBeUI7Ozs7a0NBQzVCLHNCQUFzQjs7OzsrQkFDekIsbUJBQW1COzs7O0FBUC9DLFdBQVcsQ0FBQzs7QUFTWixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsV0FBVyxDQUFDLFlBQVksRUFBRTtBQUNoRCxRQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7QUFDcEYsYUFBUyxDQUFDLFNBQVMsb0tBSUwsb0JBQUUsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQU07eURBQ1IsTUFBTSxDQUFDLElBQUksb0NBQ3RCLE1BQU0sQ0FBQyxJQUFJLFNBQUksTUFBTSxDQUFDLFNBQVM7S0FFeEMsQ0FBQyw2RUFJUixvQkFBRSxHQUFHLENBQUMsWUFBWSxFQUFFLFVBQUMsTUFBTTs0RUFDbUIsTUFBTSxDQUFDLElBQUksNEJBQ2pELG9DQUFrQixNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsMEJBQ2hELDJDQUF5QixNQUFNLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFDOUQsd0NBQXNCLE1BQU0sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFDeEQscUNBQW1CLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFDbEQsa0NBQWdCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztLQUVyRCxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyw0dkJBbUJkLENBQUM7O0FBRUYsUUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENB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LE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUFBLENBQUMsQ0FBQztTQUNoRSxDQUFDO0FBQ0YsbUJBQVcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxHQUFHLFlBQU07QUFDL0MsdUJBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLDBCQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QyxDQUFDO0tBQ0wsQ0FBQyxDQUFDOztBQUVILFdBQU8sU0FBUyxDQUFDO0NBQ3BCLENBQUEiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9waHAtaW50ZWdyYXRvci1zeW1ib2wtdmlld2VyL2xpYi9GaWd1cmVzVmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IENvbnN0YW50c0xpc3RWaWV3IGZyb20gJy4vQ29uc3RhbnRzTGlzdFZpZXcnO1xuaW1wb3J0IFN0YXRpY1Byb3BlcnRpZXNMaXN0VmlldyBmcm9tICcuL1N0YXRpY1Byb3BlcnRpZXNMaXN0Vmlldyc7XG5pbXBvcnQgU3RhdGljTWV0aG9kc0xpc3RWaWV3IGZyb20gJy4vU3RhdGljTWV0aG9kc0xpc3RWaWV3JztcbmltcG9ydCBQcm9wZXJ0aWVzTGlzdFZpZXcgZnJvbSAnLi9Qcm9wZXJ0aWVzTGlzdFZpZXcnO1xuaW1wb3J0IE1ldGhvZHNMaXN0VmlldyBmcm9tICcuL01ldGhvZHNMaXN0Vmlldyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRmlndXJlc1ZpZXcoZmlndXJlc01vZGVsKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F0b20tcGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci1jb250ZW50Jyk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImZpZ3VyZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy12aWV3XCI+XG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZmlndXJlLWNob2ljZSBmb3JtLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICAke18ubWFwKGZpZ3VyZXNNb2RlbCwgKGZpZ3VyZSkgPT4gYFxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtmaWd1cmUubmFtZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZmlndXJlLnR5cGV9ICR7ZmlndXJlLnNob3J0TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgYCl9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgJHtfLm1hcChmaWd1cmVzTW9kZWwsIChmaWd1cmUpID0+IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsaXN0cy1jb250YWluZXJcIiBkYXRhLWZpZ3VyZT1cIiR7ZmlndXJlLm5hbWV9XCI+XG4gICAgICAgICAgICAgICAgJHtDb25zdGFudHNMaXN0VmlldyhmaWd1cmUuY29uc3RhbnRzLCBmaWd1cmUubmFtZSl9XG4gICAgICAgICAgICAgICAgJHtTdGF0aWNQcm9wZXJ0aWVzTGlzdFZpZXcoZmlndXJlLnN0YXRpY1Byb3BlcnRpZXMsIGZpZ3VyZS5uYW1lKX1cbiAgICAgICAgICAgICAgICAke1N0YXRpY01ldGhvZHNMaXN0VmlldyhmaWd1cmUuc3RhdGljTWV0aG9kcywgZmlndXJlLm5hbWUpfVxuICAgICAgICAgICAgICAgICR7UHJvcGVydGllc0xpc3RWaWV3KGZpZ3VyZS5wcm9wZXJ0aWVzLCBmaWd1cmUubmFtZSl9XG4gICAgICAgICAgICAgICAgJHtNZXRob2RzTGlzdFZpZXcoZmlndXJlLm1ldGhvZHMsIGZpZ3VyZS5uYW1lKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKS5qb2luKCcnKX1cbiAgICAgICAgPGRpdiBjbGFzcz1cImZpbHRlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy12aWV3XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwic2hvdy1pbmhlcml0ZWQtcHJvcGVydGllc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzaG93LWluaGVyaXRlZC1wcm9wZXJ0aWVzXCIgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5nLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTaG93IGluaGVyaXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB2YXIgc2VhcmNoVGV4dEVkaXRvciA9IGF0b20ud29ya3NwYWNlLmJ1aWxkVGV4dEVkaXRvcih7IG1pbmk6IHRydWUgfSk7XG4gICAgc2VhcmNoVGV4dEVkaXRvci5zZXRQbGFjZWhvbGRlclRleHQoJ1NlYXJjaC4uLicpO1xuICAgIHZhciBzaG93SW5oZXJpdGVkQ2hlY2tib3ggPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignI3Nob3ctaW5oZXJpdGVkLXByb3BlcnRpZXMnKTtcbiAgICBzaG93SW5oZXJpdGVkQ2hlY2tib3guY2hlY2tlZCA9IGF0b20uY29uZmlnLmdldCgncGhwLWludGVncmF0b3Itc3ltYm9sLXZpZXdlci5kZWZhdWx0U2hvd0luaGVyaXRlZCcpO1xuICAgIHZhciBmaWx0ZXJMaXN0cyA9ICgpID0+IHtcbiAgICAgICAgdmFyIGxpc3RFbGVtZW50cyA9IF8udG9BcnJheShjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmxpc3QtZWxlbWVudCcpKTtcbiAgICAgICAgXy5lYWNoKGxpc3RFbGVtZW50cywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGlmKHNob3dJbmhlcml0ZWRDaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LmN1cnJlbnRTdHJ1Y3R1cmUgPT09IGVsZW1lbnQuZGF0YXNldC5kZWNsYXJpbmdTdHJ1Y3R1cmVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZScpLmlubmVySFRNTCA9IGVsZW1lbnQuZGF0YXNldC5uYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgbGlzdHMgPSBfLnRvQXJyYXkoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0JykpO1xuICAgICAgICBfLmVhY2gobGlzdHMsIChsaXN0KSA9PiB7XG4gICAgICAgICAgICBsaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYoISFzZWFyY2hUZXh0RWRpdG9yLmdldFRleHQoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IHNlYXJjaFRleHRFZGl0b3IuZ2V0VGV4dCgpLnRvTG93ZXJDYXNlKCkuc3BsaXQoJycpO1xuICAgICAgICAgICAgdmFyIGlucHV0UmVnZXggPSBuZXcgUmVnRXhwKGlucHV0Lm1hcCgoYykgPT4gYyArICcuKicpLmpvaW4oJycpKTtcblxuICAgICAgICAgICAgXy5lYWNoKGxpc3RFbGVtZW50cywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc3ltYm9sTmFtZSA9IGVsZW1lbnQuZGF0YXNldC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmKGlucHV0UmVnZXgudGVzdChzeW1ib2xOYW1lLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyc1RvSGlnaGxpZ2h0ID0gaW5wdXQuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoaWdobGlnaHRlZE5hbWUgPSBzeW1ib2xOYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKChjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYy50b0xvd2VyQ2FzZSgpID09PSBjaGFyc1RvSGlnaGxpZ2h0WzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJzVG9IaWdobGlnaHQuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaGlnaGxpZ2h0ZWQtbGV0dGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbignJyk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKS5pbm5lckhUTUwgPSBoaWdobGlnaHRlZE5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgbGlzdHMgPSBfLnRvQXJyYXkoY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5saXN0JykpO1xuICAgICAgICAgICAgXy5lYWNoKGxpc3RzLCAobGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IF8obGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdC1lbGVtZW50JykpXG4gICAgICAgICAgICAgICAgICAgIC50b0FycmF5KClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZSkgPT4gZS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKVxuICAgICAgICAgICAgICAgICAgICAudmFsdWUoKTtcblxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBzZWFyY2hUZXh0RWRpdG9yLm9uRGlkU3RvcENoYW5naW5nKGZpbHRlckxpc3RzKTtcbiAgICBzaG93SW5oZXJpdGVkQ2hlY2tib3gub25jaGFuZ2UgPSBmaWx0ZXJMaXN0cztcbiAgICB2YXIgc2VhcmNoQ29udGFpbmVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtY29udGFpbmVyJyk7XG4gICAgc2VhcmNoQ29udGFpbmVyLmFwcGVuZENoaWxkKGF0b20udmlld3MuZ2V0VmlldyhzZWFyY2hUZXh0RWRpdG9yKSk7XG5cbiAgICB2YXIgZmlndXJlQ2hvaWNlID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWd1cmUtY2hvaWNlJyk7XG4gICAgdmFyIHVwZGF0ZUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHZhciBjdXJyZW50Q2xhc3MgPSBmaWd1cmVDaG9pY2UudmFsdWU7XG4gICAgICAgIHZhciBsaXN0cyA9IF8udG9BcnJheShjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmxpc3RzLWNvbnRhaW5lcicpKTtcbiAgICAgICAgbGlzdHNcbiAgICAgICAgICAgIC5mb3JFYWNoKChsKSA9PiBsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgbGlzdHNcbiAgICAgICAgICAgIC5maWx0ZXIoKGwpID0+IGwuZGF0YXNldC5maWd1cmUgPT09IGN1cnJlbnRDbGFzcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChsKSA9PiBsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpKTtcbiAgICAgICAgZmlsdGVyTGlzdHMoKTtcbiAgICB9O1xuICAgIGZpZ3VyZUNob2ljZS5vbmNoYW5nZSA9IHVwZGF0ZUxpc3Q7XG4gICAgdXBkYXRlTGlzdCgpO1xuXG4gICAgdmFyIGxpc3RFbGVtZW50cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcubGlzdC1lbGVtZW50Jyk7XG4gICAgW10uZm9yRWFjaC5jYWxsKGxpc3RFbGVtZW50cywgKGxpc3RFbGVtZW50KSA9PiB7XG4gICAgICAgIHZhciBkZXRhaWxzRWxlbWVudCA9IGxpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzJyk7XG5cbiAgICAgICAgbGlzdEVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUnKS5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGZpbGUgPSBsaXN0RWxlbWVudC5kYXRhc2V0LmRlY2xhcmluZ1N0cnVjdHVyZUZpbGU7XG4gICAgICAgICAgICB2YXIgbGluZSA9IGxpc3RFbGVtZW50LmRhdGFzZXQuZGVjbGFyaW5nU3RydWN0dXJlTGluZTtcbiAgICAgICAgICAgIGF0b21cbiAgICAgICAgICAgICAgICAud29ya3NwYWNlXG4gICAgICAgICAgICAgICAgLm9wZW4oZmlsZSwgeyBpbml0aWFsTGluZTogcGFyc2VJbnQobGluZSkgLSAxIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKGUpID0+IGUuc2Nyb2xsVG9DdXJzb3JQb3NpdGlvbih7IGNlbnRlcjogdHJ1ZSB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIGxpc3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvJykub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGxpc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuIl19
//# sourceURL=/home/nick/.atom/packages/php-integrator-symbol-viewer/lib/FiguresView.js
