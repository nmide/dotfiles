(function() {
  var activateExMode, getEditorElement;

  activateExMode = function() {
    return atom.workspace.open().then(function() {
      atom.commands.dispatch(atom.views.getView(atom.workspace), 'ex-mode:open');
      keydown('escape');
      return atom.workspace.getActivePane().destroyActiveItem();
    });
  };

  getEditorElement = function(callback) {
    var textEditor;
    textEditor = null;
    waitsForPromise(function() {
      return atom.workspace.open().then(function(e) {
        return textEditor = e;
      });
    });
    return runs(function() {
      var element;
      element = atom.views.getView(textEditor);
      return callback(element);
    });
  };

  module.exports = {
    activateExMode: activateExMode,
    getEditorElement: getEditorElement,
    keydown: keydown
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9leC1tb2RlLXNvcnQvc3BlYy9zcGVjLWhlbHBlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0NBQUE7O0FBQUEsRUFBQSxjQUFBLEdBQWlCLFNBQUEsR0FBQTtXQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFBLENBQXFCLENBQUMsSUFBdEIsQ0FBMkIsU0FBQSxHQUFBO0FBQ3pCLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FBdkIsRUFBMkQsY0FBM0QsQ0FBQSxDQUFBO0FBQUEsTUFDQSxPQUFBLENBQVEsUUFBUixDQURBLENBQUE7YUFFQSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWYsQ0FBQSxDQUE4QixDQUFDLGlCQUEvQixDQUFBLEVBSHlCO0lBQUEsQ0FBM0IsRUFEZTtFQUFBLENBQWpCLENBQUE7O0FBQUEsRUFNQSxnQkFBQSxHQUFtQixTQUFDLFFBQUQsR0FBQTtBQUNqQixRQUFBLFVBQUE7QUFBQSxJQUFBLFVBQUEsR0FBYSxJQUFiLENBQUE7QUFBQSxJQUVBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2FBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQUEsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixTQUFDLENBQUQsR0FBQTtlQUN6QixVQUFBLEdBQWEsRUFEWTtNQUFBLENBQTNCLEVBRGM7SUFBQSxDQUFoQixDQUZBLENBQUE7V0FNQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLFVBQW5CLENBQVYsQ0FBQTthQUNBLFFBQUEsQ0FBUyxPQUFULEVBRkc7SUFBQSxDQUFMLEVBUGlCO0VBQUEsQ0FObkIsQ0FBQTs7QUFBQSxFQWlCQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFBLElBQ2hCLGdCQUFBLGNBRGdCO0FBQUEsSUFFaEIsa0JBQUEsZ0JBRmdCO0FBQUEsSUFHaEIsU0FBQSxPQUhnQjtHQWpCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/ex-mode-sort/spec/spec-helper.coffee
