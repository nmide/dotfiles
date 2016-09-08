(function() {
  var Directory, File, ImageFactory, crypto, filenameHelper, fs, path, _ref;

  _ref = require('atom'), Directory = _ref.Directory, File = _ref.File;

  fs = require('fs');

  path = require('path');

  crypto = require('crypto');

  filenameHelper = require('./filename-helper');

  ImageFactory = (function() {
    function ImageFactory() {}

    ImageFactory.prototype.copyImage = function(activeEditor, srcImagePath, imageFileName) {
      var currentDirectory, currentFile, imagesFolderName;
      currentFile = new File(activeEditor.getPath());
      imagesFolderName = this.makeImagesFolderName(currentFile);
      currentDirectory = currentFile.getParent().getPath();
      return this.createDirectory(currentDirectory, imagesFolderName).then((function(_this) {
        return function(imagesDirectoryPath) {
          var destinationFilePath;
          destinationFilePath = path.join(imagesDirectoryPath, imageFileName);
          return _this.copyFile(srcImagePath, destinationFilePath);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.insertImage(activeEditor, imagesFolderName, imageFileName);
        };
      })(this));
    };

    ImageFactory.prototype.createImage = function(activeEditor, currentFile, imgbuffer, imageFileName) {
      var imagesFolderName;
      imagesFolderName = this.makeImagesFolderName(currentFile);
      return this.createDirectory(currentFile.getParent().getPath(), imagesFolderName).then((function(_this) {
        return function(imagesDirectoryPath) {
          return _this.writeImage(path.join(imagesDirectoryPath, imageFileName), imgbuffer);
        };
      })(this)).then((function(_this) {
        return function() {
          return _this.insertImage(activeEditor, imagesFolderName, imageFileName);
        };
      })(this));
    };

    ImageFactory.prototype.copyFile = function(sourcePath, targetPath) {
      return new Promise(function(resolve, reject) {
        return fs.readFile(sourcePath, function(error, content) {
          if (error != null) {
            reject(error);
          }
          return fs.writeFile(targetPath, content, function(error) {
            if (error != null) {
              return reject(error);
            } else {
              return resolve(targetPath);
            }
          });
        });
      });
    };

    ImageFactory.prototype.createDirectory = function(baseDirectory, imagesFolderName) {
      var imagesDirectory, imagesDirectoryPath;
      imagesDirectoryPath = path.join(baseDirectory, imagesFolderName);
      imagesDirectory = new Directory(imagesDirectoryPath);
      return imagesDirectory.create().then(function(created) {
        return imagesDirectoryPath;
      });
    };

    ImageFactory.prototype.writeImage = function(imagePath, buffer) {
      return new Promise(function(resolve, reject) {
        return fs.writeFile(imagePath, buffer, 'binary', function(error) {
          if (error != null) {
            return reject(error);
          } else {
            return resolve(imagePath);
          }
        });
      });
    };

    ImageFactory.prototype.insertImage = function(activeEditor, imagesFolderName, imageFileName) {
      var appendImagesFolder, imageMarkup, imagePath;
      appendImagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.append');
      imagePath = appendImagesFolder ? path.join(imagesFolderName, imageFileName) : imageFileName;
      imageMarkup = "image::" + imagePath + "[]";
      activeEditor.insertText(imageMarkup, activeEditor);
      return imageMarkup;
    };

    ImageFactory.prototype.makeImagesFolderName = function(currentFile) {
      var filePath;
      if (atom.config.get('asciidoc-image-helper.imageFolder.dynamicName')) {
        filePath = currentFile.getPath();
        return path.basename(filePath, path.extname(filePath));
      } else {
        return atom.config.get('asciidoc-image-helper.imageFolder.name');
      }
    };

    return ImageFactory;

  })();

  module.exports = new ImageFactory;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvbGliL2ltYWdlLWZhY3RvcnkuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFFQUFBOztBQUFBLEVBQUEsT0FBb0IsT0FBQSxDQUFRLE1BQVIsQ0FBcEIsRUFBQyxpQkFBQSxTQUFELEVBQVksWUFBQSxJQUFaLENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdBLE1BQUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsRUFJQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSxtQkFBUixDQUpqQixDQUFBOztBQUFBLEVBTU07OEJBSUo7O0FBQUEsMkJBQUEsU0FBQSxHQUFXLFNBQUMsWUFBRCxFQUFlLFlBQWYsRUFBNkIsYUFBN0IsR0FBQTtBQUNULFVBQUEsK0NBQUE7QUFBQSxNQUFBLFdBQUEsR0FBa0IsSUFBQSxJQUFBLENBQUssWUFBWSxDQUFDLE9BQWIsQ0FBQSxDQUFMLENBQWxCLENBQUE7QUFBQSxNQUVBLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixXQUF0QixDQUZuQixDQUFBO0FBQUEsTUFHQSxnQkFBQSxHQUFtQixXQUFXLENBQUMsU0FBWixDQUFBLENBQXVCLENBQUMsT0FBeEIsQ0FBQSxDQUhuQixDQUFBO2FBS0EsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsZ0JBQWpCLEVBQW1DLGdCQUFuQyxDQUNFLENBQUMsSUFESCxDQUNRLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLG1CQUFELEdBQUE7QUFDSixjQUFBLG1CQUFBO0FBQUEsVUFBQSxtQkFB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

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/lib/image-factory.coffee
