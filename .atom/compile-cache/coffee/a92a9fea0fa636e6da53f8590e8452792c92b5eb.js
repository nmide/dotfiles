(function() {
  var AtomExModeSort, caseInsensitiveSorter, caseSensitiveSorter;

  caseSensitiveSorter = function(a, b) {
    return a >= b;
  };

  caseInsensitiveSorter = function(a, b) {
    return a.toLowerCase() >= b.toLowerCase();
  };

  module.exports = AtomExModeSort = {
    activate: function(state) {
      return atom.packages.onDidActivatePackage(function(pack) {
        if (pack.name === 'ex-mode') {
          return pack.mainModule.provideEx().registerCommand('sort', AtomExModeSort.sort);
        }
      });
    },
    sort: function(args) {
      var editor, isCaseInsensitive, selection, sorted;
      isCaseInsensitive = (args.args || "").trim() === "i";
      editor = args.editor;
      selection = editor.getSelectedText();
      sorted = selection.split("\n").filter(function(x) {
        return x.length !== 0;
      }).sort(isCaseInsensitive ? caseInsensitiveSorter : caseSensitiveSorter).join("\n").concat("\n");
      return editor.insertText(sorted);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9leC1tb2RlLXNvcnQvbGliL2F0b20tZXgtbW9kZS1zb3J0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSwwREFBQTs7QUFBQSxFQUFBLG1CQUFBLEdBQXNCLFNBQUMsQ0FBRCxFQUFJLENBQUosR0FBQTtXQUFVLENBQUEsSUFBSyxFQUFmO0VBQUEsQ0FBdEIsQ0FBQTs7QUFBQSxFQUNBLHFCQUFBLEdBQXdCLFNBQUMsQ0FBRCxFQUFJLENBQUosR0FBQTtXQUFVLENBQUMsQ0FBQyxXQUFGLENBQUEsQ0FBQSxJQUFtQixDQUFDLENBQUMsV0FBRixDQUFBLEVBQTdCO0VBQUEsQ0FEeEIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGNBQUEsR0FDZjtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBZCxDQUFtQyxTQUFDLElBQUQsR0FBQTtBQUNqQyxRQUFBLElBQUcsSUFBSSxDQUFDLElBQUwsS0FBYSxTQUFoQjtpQkFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQWhCLENBQUEsQ0FBMkIsQ0FBQyxlQUE1QixDQUE0QyxNQUE1QyxFQUFvRCxjQUFjLENBQUMsSUFBbkUsRUFERjtTQURpQztNQUFBLENBQW5DLEVBRFE7SUFBQSxDQUFWO0FBQUEsSUFLQSxJQUFBLEVBQU0sU0FBQyxJQUFELEdBQUE7QUFDSixVQUFBLDRDQUFBO0FBQUEsTUFBQSxpQkFBQSxHQUFvQixDQUFDLElBQUksQ0FBQyxJQUFMLElBQWEsRUFBZCxDQUFpQixDQUFDLElBQWxCLENBQUEsQ0FBQSxLQUE0QixHQUFoRCxDQUFBO0FBQUEsTUFDQSxNQUFBLEdBQVMsSUFBSSxDQUFDLE1BRGQsQ0FBQTtBQUFBLE1BRUEsU0FBQSxHQUFZLE1BQU0sQ0FBQyxlQUFQLENBQUEsQ0FGWixDQUFBO0FBQUEsTUFHQSxNQUFBLEdBQVMsU0FDUCxDQUFDLEtBRE0sQ0FDQSxJQURBLENBRVAsQ0FBQyxNQUZNLENBRUMsU0FBQyxDQUFELEdBQUE7ZUFBTyxDQUFDLENBQUMsTUFBRixLQUFZLEVBQW5CO01BQUEsQ0FGRCxDQUdQLENBQUMsSUFITSxDQUdFLGlCQUFILEdBQTBCLHFCQUExQixHQUFxRCxtQkFIcEQsQ0FJUCxDQUFDLElBSk0sQ0FJRCxJQUpDLENBS1AsQ0FBQyxNQUxNLENBS0MsSUFMRCxDQUhULENBQUE7YUFTQSxNQUFNLENBQUMsVUFBUCxDQUFrQixNQUFsQixFQVZJO0lBQUEsQ0FMTjtHQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/ex-mode-sort/lib/atom-ex-mode-sort.coffee
