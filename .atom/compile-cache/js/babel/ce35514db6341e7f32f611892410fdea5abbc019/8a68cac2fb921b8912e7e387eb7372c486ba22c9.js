Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _atom = require("atom");

var _packageJson = require("../package.json");

"use babel";
"use strict";

exports["default"] = {

	subscriptions: null,

	activate: function activate(state) {
		var _this = this;

		this.subscriptions = new _atom.CompositeDisposable();
		this.subscriptions.add(atom.themes.onDidChangeActiveThemes(function () {
			_this.subscriptions.add(atom.config.observe(_packageJson.name + ".subTheme", function (value) {
				_this.apply(value);
			}));
		}));
	},

	deactivate: function deactivate() {
		this.subscriptions.dispose();
	},

	apply: function apply(value) {
		var newData = "@import \"colors/" + value + "\";\n",
		    file = _path2["default"].join(__dirname, "..", "styles", "syntax-variables.less"),
		    oldData = _fs2["default"].readFileSync(file, "utf8");

		if (newData !== oldData) {
			_fs2["default"].writeFileSync(file, newData);
			this.reloadAllStylesheets();
		}
	},

	reloadAllStylesheets: function reloadAllStylesheets() {
		atom.themes.loadUserStylesheet();
		atom.themes.reloadBaseStylesheets();
		var ref = atom.packages.getActivePackages();

		for (var i = 0, len = ref.length; i < len; i++) {
			var pack = ref[i];
			pack.reloadStylesheets();
		}
	}

};
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvZmlyZWZveC1zeW50YXgvbGliL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUdlLElBQUk7Ozs7b0JBQ0YsTUFBTTs7OztvQkFDVyxNQUFNOzsyQkFDTixpQkFBaUI7O0FBTm5ELFdBQVcsQ0FBQztBQUNaLFlBQVksQ0FBQzs7cUJBT0U7O0FBRWQsY0FBYSxFQUFFLElBQUk7O0FBRW5CLFNBQVEsRUFBQSxrQkFBQyxLQUFLLEVBQUU7OztBQUNmLE1BQUksQ0FBQyxhQUFhLEdBQUcsK0JBQXlCLENBQUM7QUFDL0MsTUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxZQUFNO0FBQ2hFLFNBQUssYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sa0NBQTRCLFVBQUEsS0FBSyxFQUFJO0FBQzlFLFVBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7RUFDSjs7QUFFRCxXQUFVLEVBQUEsc0JBQUc7QUFDWixNQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDO0VBQzdCOztBQUVELE1BQUssRUFBQSxlQUFDLEtBQUssRUFBRTtBQUNaLE1BQUksT0FBTyx5QkFBc0IsS0FBSyxVQUFNO01BQ3hDLElBQUksR0FBRyxrQkFBSyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsdUJBQXVCLENBQUM7TUFDcEUsT0FBTyxHQUFHLGdCQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRTVDLE1BQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtBQUN4QixtQkFBRyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLE9BQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0dBQzVCO0VBQ0Q7O0FBRUQscUJBQW9CLEVBQUEsZ0NBQUc7QUFDdEIsTUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0FBQ2pDLE1BQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUNwQyxNQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0FBRTVDLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0MsT0FBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLE9BQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0dBQ3pCO0VBQ0Q7O0NBRUQiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9maXJlZm94LXN5bnRheC9saWIvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSBcImF0b21cIjtcbmltcG9ydCB7bmFtZSBhcyBwYWNrYWdlTmFtZX0gZnJvbSBcIi4uL3BhY2thZ2UuanNvblwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdFxuXHRzdWJzY3JpcHRpb25zOiBudWxsLFxuXHRcblx0YWN0aXZhdGUoc3RhdGUpIHtcblx0XHR0aGlzLnN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuXHRcdHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoYXRvbS50aGVtZXMub25EaWRDaGFuZ2VBY3RpdmVUaGVtZXMoKCkgPT4ge1xuXHRcdFx0dGhpcy5zdWJzY3JpcHRpb25zLmFkZChhdG9tLmNvbmZpZy5vYnNlcnZlKGAke3BhY2thZ2VOYW1lfS5zdWJUaGVtZWAsIHZhbHVlID0+IHtcblx0XHRcdFx0dGhpcy5hcHBseSh2YWx1ZSk7XG5cdFx0XHR9KSk7XG5cdFx0fSkpO1xuXHR9LFxuXHRcblx0ZGVhY3RpdmF0ZSgpIHtcblx0XHR0aGlzLnN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuXHR9LFxuXHRcblx0YXBwbHkodmFsdWUpIHtcblx0XHRsZXQgbmV3RGF0YSA9IGBAaW1wb3J0IFwiY29sb3JzLyR7dmFsdWV9XCI7XFxuYCxcblx0XHQgICAgZmlsZSA9IHBhdGguam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJzdHlsZXNcIiwgXCJzeW50YXgtdmFyaWFibGVzLmxlc3NcIiksXG5cdFx0ICAgIG9sZERhdGEgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZSwgXCJ1dGY4XCIpO1xuXHRcdFxuXHRcdGlmIChuZXdEYXRhICE9PSBvbGREYXRhKSB7XG5cdFx0XHRmcy53cml0ZUZpbGVTeW5jKGZpbGUsIG5ld0RhdGEpO1xuXHRcdFx0dGhpcy5yZWxvYWRBbGxTdHlsZXNoZWV0cygpO1xuXHRcdH1cblx0fSxcblx0XG5cdHJlbG9hZEFsbFN0eWxlc2hlZXRzKCkge1xuXHRcdGF0b20udGhlbWVzLmxvYWRVc2VyU3R5bGVzaGVldCgpO1xuXHRcdGF0b20udGhlbWVzLnJlbG9hZEJhc2VTdHlsZXNoZWV0cygpO1xuXHRcdGxldCByZWYgPSBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2VzKCk7XG5cdFx0XG5cdFx0Zm9yIChsZXQgaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0bGV0IHBhY2sgPSByZWZbaV07XG5cdFx0XHRwYWNrLnJlbG9hZFN0eWxlc2hlZXRzKCk7XG5cdFx0fVxuXHR9XG5cdFxufTtcbiJdfQ==
//# sourceURL=/home/nick/.atom/packages/firefox-syntax/lib/main.js
