(function() {
  var filenameHelper, fs, path, temp;

  fs = require('fs');

  path = require('path');

  temp = require('temp').track();

  filenameHelper = require('../lib/filename-helper');

  describe('Filename helper', function() {
    return describe('createImageName should', function() {
      it('create a random image name when current file have an extension', function() {
        var buffer, currentFileName, imageName;
        currentFileName = 'myfile.adoc';
        buffer = 'fake content';
        imageName = filenameHelper.createImageName(currentFileName, buffer);
        return expect(imageName).toMatch(/^myfile-\w+.png$/);
      });
      it('create a random image name when current file does\'t have an extension', function() {
        var buffer, currentFileName, imageName;
        currentFileName = 'myfile';
        buffer = 'fake content';
        imageName = filenameHelper.createImageName(currentFileName, buffer);
        return expect(imageName).toMatch(/^myfile-\w+.png$/);
      });
      it('create a clean image name when currrent filename contains spaces', function() {
        var buffer, currentFileName, imageName;
        currentFileName = 'my file is cool.adoc';
        buffer = 'fake content';
        imageName = filenameHelper.createImageName(currentFileName, buffer);
        return expect(imageName).toMatch(/^my_file_is_cool-\w+.png$/);
      });
      return it('create a simple image name when use custom name', function() {
        var buffer, currentFileName, customImageName, imageName;
        currentFileName = 'myfile.adoc';
        buffer = 'fake content';
        customImageName = 'foobar-img';
        imageName = filenameHelper.createImageName(currentFileName, buffer, customImageName);
        return expect(imageName).toMatch(/^foobar-img.png$/);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvc3BlYy9maWxlbmFtZS1oZWxwZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOEJBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUMsS0FBaEIsQ0FBQSxDQUZQLENBQUE7O0FBQUEsRUFHQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSx3QkFBUixDQUhqQixDQUFBOztBQUFBLEVBS0EsUUFBQSxDQUFTLGlCQUFULEVBQTRCLFNBQUEsR0FBQTtXQUUxQixRQUFBLENBQVMsd0JBQVQsRUFBbUMsU0FBQSxHQUFBO0FBRWpDLE1BQUEsRUFBQSxDQUFHLGdFQUFILEVBQXFFLFNBQUEsR0FBQTtBQUNuRSxZQUFBLGtDQUFBO0FBQUEsUUFBQSxlQUFBLEdBQWtCLGFBQWxCLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxjQURULENBQUE7QUFBQSxRQUVBLFNBQUEsR0FBWSxjQUFjLENBQUMsZUFBZixDQUErQixlQUEvQixFQUFnRCxNQUFoRCxDQUZaLENBQUE7ZUFJQSxNQUFBLENBQU8sU0FBUCxDQUFpQixDQUFDLE9BQWxCLENBQTBCLGtCQUExQixFQUxtRTtNQUFBLENBQXJFLENBQUEsQ0FBQTtBQUFBLE1BT0EsRUFBQSxDQUFHLHdFQUFILEVBQTZFLFNBQUEsR0FBQTtBQUMzRSxZQUFBLGtDQUFBO0FBQUEsUUFBQSxlQUFBLEdBQWtCLFFBQWxCLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxjQURULENBQUE7QUFBQSxRQUVBLFNBQUEsR0FBWSxjQUFjLENBQUMsZUFBZixDQUErQixlQUEvQixFQUFnRCxNQUFoRCxDQUZaLENBQUE7ZUFJQSxNQUFBLENBQU8sU0FBUCxDQUFpQixDQUFDLE9BQWxCLENBQTBCLGtCQUExQixFQUwyRTtNQUFBLENBQTdFLENBUEEsQ0FBQTtBQUFBLE1BY0EsRUFBQSxDQUFHLGtFQUFILEVBQXVFLFNBQUEsR0FBQTtBQUNyRSxZQUFBLGtDQUFBO0FBQUEsUUFBQSxlQUFBLEdBQWtCLHNCQUFsQixDQUFBO0FBQUEsUUFDQSxNQUFBLEdBQVMsY0FEVCxDQUFBO0FBQUEsUUFFQSxTQUFBLEdBQVksY0FBYyxDQUFDLGVBQWYsQ0FBK0IsZUFBL0IsRUFBZ0QsTUFBaEQsQ0FGWixDQUFBO2VBSUEsTUFBQSxDQUFPLFNBQVAsQ0FBaUIsQ0FBQyxPQUFsQixDQUEwQiwyQkFBMUIsRUFMcUU7TUFBQSxDQUF2RSxDQWRBLENBQUE7YUFxQkEsRUFBQSxDQUFHLGlEQUFILEVBQXNELFNBQUEsR0FBQTtBQUNwRCxZQUFBLG1EQUFBO0FBQUEsUUFBQSxlQUFBLEdBQWtCLGFBQWxCLENBQUE7QUFBQSxRQUNBLE1BQUEsR0FBUyxjQURULENBQUE7QUFBQSxRQUVBLGVBQUEsR0FBa0IsWUFGbEIsQ0FBQTtBQUFBLFFBSUEsU0FBQSxHQUFZLGNBQWMsQ0FBQyxlQUFmLENBQStCLGVBQS9CLEVBQWdELE1BQWhELEVBQXdELGVBQXhELENBSlosQ0FBQTtlQU1BLE1BQUEsQ0FBTyxTQUFQLENBQWlCLENBQUMsT0FBbEIsQ0FBMEIsa0JBQTFCLEVBUG9EO01BQUEsQ0FBdEQsRUF2QmlDO0lBQUEsQ0FBbkMsRUFGMEI7RUFBQSxDQUE1QixDQUxBLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/spec/filename-helper-spec.coffee
