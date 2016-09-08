(function() {
  var FilenameHelper, crypto, path;

  path = require('path');

  crypto = require('crypto');

  FilenameHelper = (function() {
    function FilenameHelper() {}

    FilenameHelper.prototype.createImageName = function(currentFileName, imgbuffer, customImageName) {
      if (customImageName != null) {
        return "" + customImageName + ".png";
      } else {
        return this.generateImageName(currentFileName, imgbuffer);
      }
    };

    FilenameHelper.prototype.generateImageName = function(currentFileName, imgbuffer) {
      var baseImageFileName, imageFileNameHash, md5;
      md5 = crypto.createHash('md5');
      md5.update(imgbuffer);
      imageFileNameHash = md5.digest('hex').slice(0, 5);
      baseImageFileName = this.cleanImageFilename(path.basename(currentFileName, path.extname(currentFileName)));
      return "" + baseImageFileName + "-" + imageFileNameHash + ".png";
    };

    FilenameHelper.prototype.cleanImageFilename = function(imageFileName) {
      return imageFileName.replace(/\s+/g, '_');
    };

    return FilenameHelper;

  })();

  module.exports = new FilenameHelper;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvbGliL2ZpbGVuYW1lLWhlbHBlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEJBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUdNO2dDQUVKOztBQUFBLDZCQUFBLGVBQUEsR0FBaUIsU0FBQyxlQUFELEVBQWtCLFNBQWxCLEVBQTZCLGVBQTdCLEdBQUE7QUFDZixNQUFBLElBQUcsdUJBQUg7ZUFDRSxFQUFBLEdBQUcsZUFBSCxHQUFtQixPQURyQjtPQUFBLE1BQUE7ZUFHRSxJQUFDLENBQUEsaUJBQUQsQ0FBbUIsZUFBbkIsRUFBb0MsU0FBcEMsRUFIRjtPQURlO0lBQUEsQ0FBakIsQ0FBQTs7QUFBQSw2QkFNQSxpQkFBQSxHQUFtQixTQUFDLGVBQUQsRUFBa0IsU0FBbEIsR0FBQTtBQUNqQixVQUFBLHlDQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sTUFBTSxDQUFDLFVBQVAsQ0FBa0IsS0FBbEIsQ0FBTixDQUFBO0FBQUEsTUFDQSxHQUFHLENBQUMsTUFBSixDQUFXLFNBQVgsQ0FEQSxDQUFBO0FBQUEsTUFFQSxpQkFBQSxHQUFvQixHQUFHLENBQUMsTUFBSixDQUFXLEtBQVgsQ0FBaUIsQ0FBQyxLQUFsQixDQUF3QixDQUF4QixFQUEyQixDQUEzQixDQUZwQixDQUFBO0FBQUEsTUFHQSxpQkFBQSxHQUFvQixJQUFDLENBQUEsa0JBQUQsQ0FBb0IsSUFBSSxDQUFDLFFBQUwsQ0FBYyxlQUFkLEVBQStCLElBQUksQ0FBQyxPQUFMLENBQWEsZUFBYixDQUEvQixDQUFwQixDQUhwQixDQUFBO2FBS0EsRUFBQSxHQUFHLGlCQUFILEdBQXFCLEdBQXJCLEdBQXdCLGlCQUF4QixHQUEwQyxPQU56QjtJQUFBLENBTm5CLENBQUE7O0FBQUEsNkJBY0Esa0JBQUEsR0FBb0IsU0FBQyxhQUFELEdBQUE7YUFDbEIsYUFBYSxDQUFDLE9BQWQsQ0FBc0IsTUFBdEIsRUFBOEIsR0FBOUIsRUFEa0I7SUFBQSxDQWRwQixDQUFBOzswQkFBQTs7TUFMRixDQUFBOztBQUFBLEVBc0JBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLEdBQUEsQ0FBQSxjQXRCakIsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/lib/filename-helper.coffee
