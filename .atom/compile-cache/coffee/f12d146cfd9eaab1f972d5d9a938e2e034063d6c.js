(function() {
  var AtomExModeSort, MockEditor;

  AtomExModeSort = require('../lib/atom-ex-mode-sort');

  MockEditor = (function() {
    function MockEditor(text) {
      this.text = text;
    }

    MockEditor.prototype.getText = function() {
      return this.text;
    };

    MockEditor.prototype.getSelectedText = function() {
      return this.text;
    };

    MockEditor.prototype.insertText = function(text) {
      return this.text = text;
    };

    return MockEditor;

  })();

  describe("AtomExModeSort", function() {
    return describe("sort", function() {
      it("is case sensitive by default", function() {
        var editor;
        editor = new MockEditor("hello\navery\nChild\n");
        AtomExModeSort.sort({
          editor: editor
        });
        return expect(editor.getText()).toBe("Child\navery\nhello\n");
      });
      return it("is case insensitive if 'i' flag is passed", function() {
        var editor;
        editor = new MockEditor("hello\navery\nChild\n");
        AtomExModeSort.sort({
          editor: editor,
          args: " i"
        });
        return expect(editor.getText()).toBe("avery\nChild\nhello\n");
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9leC1tb2RlLXNvcnQvc3BlYy9hdG9tLWV4LW1vZGUtc29ydC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwQkFBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLDBCQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFTTtBQUNTLElBQUEsb0JBQUUsSUFBRixHQUFBO0FBQVMsTUFBUixJQUFDLENBQUEsT0FBQSxJQUFPLENBQVQ7SUFBQSxDQUFiOztBQUFBLHlCQUVBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsS0FETTtJQUFBLENBRlQsQ0FBQTs7QUFBQSx5QkFLQSxlQUFBLEdBQWlCLFNBQUEsR0FBQTthQUNmLElBQUMsQ0FBQSxLQURjO0lBQUEsQ0FMakIsQ0FBQTs7QUFBQSx5QkFRQSxVQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7YUFDVixJQUFDLENBQUEsSUFBRCxHQUFRLEtBREU7SUFBQSxDQVJaLENBQUE7O3NCQUFBOztNQUhGLENBQUE7O0FBQUEsRUFjQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO1dBQ3pCLFFBQUEsQ0FBUyxNQUFULEVBQWlCLFNBQUEsR0FBQTtBQUNmLE1BQUEsRUFBQSxDQUFHLDhCQUFILEVBQW1DLFNBQUEsR0FBQTtBQUNqQyxZQUFBLE1BQUE7QUFBQSxRQUFBLE1BQUEsR0FBYSxJQUFBLFVBQUEsQ0FBVyx1QkFBWCxDQUFiLENBQUE7QUFBQSxRQUNBLGNBQWMsQ0FBQyxJQUFmLENBQW9CO0FBQUEsVUFBRSxRQUFBLE1BQUY7U0FBcEIsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBUCxDQUF3QixDQUFDLElBQXpCLENBQThCLHVCQUE5QixFQUhpQztNQUFBLENBQW5DLENBQUEsQ0FBQTthQUtBLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBLEdBQUE7QUFDOUMsWUFBQSxNQUFBO0FBQUEsUUFBQSxNQUFBLEdBQWEsSUFBQSxVQUFBLENBQVcsdUJBQVgsQ0FBYixDQUFBO0FBQUEsUUFDQSxjQUFjLENBQUMsSUFBZixDQUFvQjtBQUFBLFVBQUUsUUFBQSxNQUFGO0FBQUEsVUFBVSxJQUFBLEVBQU0sSUFBaEI7U0FBcEIsQ0FEQSxDQUFBO2VBRUEsTUFBQSxDQUFPLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBUCxDQUF3QixDQUFDLElBQXpCLENBQThCLHVCQUE5QixFQUg4QztNQUFBLENBQWhELEVBTmU7SUFBQSxDQUFqQixFQUR5QjtFQUFBLENBQTNCLENBZEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/ex-mode-sort/spec/atom-ex-mode-sort-spec.coffee
