(function() {
  describe('Commands', function() {
    var getMessage, linter;
    linter = null;
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('linter').then(function() {
          linter = atom.packages.getActivePackage('linter').mainModule.instance;
          return atom.workspace.open(__dirname + '/fixtures/file.txt');
        });
      });
    });
    getMessage = require('./common').getMessage;
    describe('linter:togglePanel', function() {
      return it('toggles the panel visibility', function() {
        var visibility;
        linter.views.bottomPanel.scope = 'Project';
        linter.getActiveEditorLinter().addMessage(getMessage('Error'));
        linter.views.render({
          added: [getMessage('Error')],
          removed: [],
          messages: []
        });
        visibility = linter.views.bottomPanel.getVisibility();
        expect(visibility).toBe(true);
        linter.commands.togglePanel();
        expect(linter.views.bottomPanel.getVisibility()).toBe(!visibility);
        linter.commands.togglePanel();
        return expect(linter.views.bottomPanel.getVisibility()).toBe(visibility);
      });
    });
    return describe('linter:toggle', function() {
      return it('relint when enabled', function() {
        return waitsForPromise(function() {
          return atom.workspace.open(__dirname + '/fixtures/file.txt').then(function() {
            spyOn(linter.commands, 'lint');
            linter.commands.toggleLinter();
            linter.commands.toggleLinter();
            return expect(linter.commands.lint).toHaveBeenCalled();
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9saW50ZXIvc3BlYy9jb21tYW5kcy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsVUFBVCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsUUFBQSxrQkFBQTtBQUFBLElBQUEsTUFBQSxHQUFTLElBQVQsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLFFBQTlCLENBQXVDLENBQUMsSUFBeEMsQ0FBNkMsU0FBQSxHQUFBO0FBQzNDLFVBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsUUFBL0IsQ0FBd0MsQ0FBQyxVQUFVLENBQUMsUUFBN0QsQ0FBQTtpQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQWYsQ0FBb0IsU0FBQSxHQUFZLG9CQUFoQyxFQUYyQztRQUFBLENBQTdDLEVBRGM7TUFBQSxDQUFoQixFQURTO0lBQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxJQVFDLGFBQWMsT0FBQSxDQUFRLFVBQVIsRUFBZCxVQVJELENBQUE7QUFBQSxJQVVBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7YUFDN0IsRUFBQSxDQUFHLDhCQUFILEVBQW1DLFNBQUEsR0FBQTtBQUVqQyxZQUFBLFVBQUE7QUFBQSxRQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQXpCLEdBQWlDLFNBQWpDLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxxQkFBUCxDQUFBLENBQThCLENBQUMsVUFBL0IsQ0FBMEMsVUFBQSxDQUFXLE9BQVgsQ0FBMUMsQ0FEQSxDQUFBO0FBQUEsUUFFQSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQWIsQ0FBb0I7QUFBQSxVQUFDLEtBQUEsRUFBTyxDQUFDLFVBQUEsQ0FBVyxPQUFYLENBQUQsQ0FBUjtBQUFBLFVBQStCLE9BQUEsRUFBUyxFQUF4QztBQUFBLFVBQTRDLFFBQUEsRUFBVSxFQUF0RDtTQUFwQixDQUZBLENBQUE7QUFBQSxRQUlBLFVBQUEsR0FBYSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUF6QixDQUFBLENBSmIsQ0FBQTtBQUFBLFFBS0EsTUFBQSxDQUFPLFVBQVAsQ0FBa0IsQ0FBQyxJQUFuQixDQUF3QixJQUF4QixDQUxBLENBQUE7QUFBQSxRQU1BLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBaEIsQ0FBQSxDQU5BLENBQUE7QUFBQSxRQU9BLE1BQUEsQ0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUF6QixDQUFBLENBQVAsQ0FBZ0QsQ0FBQyxJQUFqRCxDQUFzRCxDQUFBLFVBQXRELENBUEEsQ0FBQTtBQUFBLFFBUUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFoQixDQUFBLENBUkEsQ0FBQTtlQVNBLE1BQUEsQ0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxhQUF6QixDQUFBLENBQVAsQ0FBZ0QsQ0FBQyxJQUFqRCxDQUFzRCxVQUF0RCxFQVhpQztNQUFBLENBQW5DLEVBRDZCO0lBQUEsQ0FBL0IsQ0FWQSxDQUFBO1dBd0JBLFFBQUEsQ0FBUyxlQUFULEVBQTBCLFNBQUEsR0FBQTthQUN4QixFQUFBLENBQUcscUJBQUgsRUFBMEIsU0FBQSxHQUFBO2VBQ3hCLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixTQUFBLEdBQVksb0JBQWhDLENBQXFELENBQUMsSUFBdEQsQ0FBMkQsU0FBQSxHQUFBO0FBQ3pELFlBQUEsS0FBQSxDQUFNLE1BQU0sQ0FBQyxRQUFiLEVBQXVCLE1BQXZCLENBQUEsQ0FBQTtBQUFBLFlBQ0EsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFoQixDQUFBLENBREEsQ0FBQTtBQUFBLFlBRUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFoQixDQUFBLENBRkEsQ0FBQTttQkFHQSxNQUFBLENBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUF2QixDQUE0QixDQUFDLGdCQUE3QixDQUFBLEVBSnlEO1VBQUEsQ0FBM0QsRUFEYztRQUFBLENBQWhCLEVBRHdCO01BQUEsQ0FBMUIsRUFEd0I7SUFBQSxDQUExQixFQXpCbUI7RUFBQSxDQUFyQixDQUFBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/linter/spec/commands-spec.coffee
