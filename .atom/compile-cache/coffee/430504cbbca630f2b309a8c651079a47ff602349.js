(function() {
  var File, fs, imageFactory, path, temp;

  File = require('atom').File;

  fs = require('fs');

  path = require('path');

  temp = require('temp').track();

  imageFactory = require('../lib/image-factory');

  describe('Image factory', function() {
    var rootDirectory;
    rootDirectory = null;
    describe('createDirectory should', function() {
      rootDirectory = null;
      beforeEach(function() {
        return rootDirectory = temp.mkdirSync();
      });
      it('return directory path if directory already exists', function() {
        var directory, result;
        result = null;
        directory = path.join(rootDirectory, 'imagesFolder');
        fs.mkdirSync(directory);
        waitsForPromise(function() {
          return imageFactory.createDirectory(rootDirectory, 'imagesFolder').then(function(r) {
            return result = r;
          });
        });
        return runs(function() {
          expect(result).toBe(directory);
          return expect(result).toMatch(/^.*imagesFolder$/);
        });
      });
      return it('create directory and his path if directory doesn\'t exist', function() {
        var result;
        result = null;
        rootDirectory = temp.mkdirSync();
        waitsForPromise(function() {
          return imageFactory.createDirectory(rootDirectory, 'imagesFolder').then(function(r) {
            return result = r;
          });
        });
        return runs(function() {
          expect(result).toBe(path.join(rootDirectory, 'imagesFolder'));
          return expect(result).toMatch(/^.*imagesFolder$/);
        });
      });
    });
    describe('createDirectory should', function() {
      rootDirectory = null;
      beforeEach(function() {
        return rootDirectory = temp.mkdirSync();
      });
      it('create a file when image has a valid name', function() {
        var buffer, imagePath, result;
        result = null;
        imagePath = path.join(rootDirectory, 'fake.png');
        buffer = 'fake content';
        waitsForPromise(function() {
          return imageFactory.writeImage(imagePath, buffer).then(function(r) {
            return result = r;
          });
        });
        return runs(function() {
          return expect(result).toMatch(/^.*fake.png$/);
        });
      });
      return it('thrown an error when image have a same name as a folder', function() {
        var buffer, directory, error, imagePath;
        error = null;
        directory = path.join(rootDirectory, 'fake');
        fs.mkdirSync(directory);
        imagePath = path.join(rootDirectory, 'fake');
        buffer = 'fake content';
        waitsForPromise(function() {
          return imageFactory.writeImage(imagePath, buffer)["catch"](function(r) {
            return error = r;
          });
        });
        return runs(function() {
          expect(error.errno).toBeLessThan(0);
          expect(error.code).toBe('EISDIR');
          return expect(error.syscall).toBe('open');
        });
      });
    });
    return describe('makeImagesFolderName should', function() {
      beforeEach(function() {
        return waitsForPromise(function() {
          return atom.packages.activatePackage('asciidoc-image-helper');
        });
      });
      it('return the imagesFolder when dynamicImageFolderName is disabled', function() {
        var currentFile, imagesFolderName;
        atom.config.set('asciidoc-image-helper.imageFolder.dynamicName', false);
        currentFile = new File(path.join(__dirname, '..', 'spec/fixtures/logo-atom.png'));
        imagesFolderName = imageFactory.makeImagesFolderName(currentFile);
        return expect(imagesFolderName).toBe('images');
      });
      return it('return a folder build from the name of the current file when dynamicImageFolderName is enabled', function() {
        var currentFile, imagesFolderName;
        atom.config.set('asciidoc-image-helper.imageFolder.dynamicName', true);
        currentFile = new File(path.join(__dirname, '..', 'spec/fixtures/fakefile.adoc'));
        imagesFolderName = imageFactory.makeImagesFolderName(currentFile);
        return expect(imagesFolderName).toBe('fakefile');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvc3BlYy9pbWFnZS1mYWN0b3J5LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtDQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQyxLQUFoQixDQUFBLENBSFAsQ0FBQTs7QUFBQSxFQUlBLFlBQUEsR0FBZSxPQUFBLENBQVEsc0JBQVIsQ0FKZixDQUFBOztBQUFBLEVBTUEsUUFBQSxDQUFTLGVBQVQsRUFBMEIsU0FBQSxHQUFBO0FBRXhCLFFBQUEsYUFBQTtBQUFBLElBQUEsYUFBQSxHQUFnQixJQUFoQixDQUFBO0FBQUEsSUFFQSxRQUFBLENBQVMsd0JBQVQsRUFBbUMsU0FBQSxHQUFBO0FBRWpDLE1BQUEsYUFBQSxHQUFnQixJQUFoQixDQUFBO0FBQUEsTUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1QsYUFBQSxHQUFnQixJQUFJLENBQUMsU0FBTCxDQUFBLEVBRFA7TUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLE1BS0EsRUFBQSxDQUFHLG1EQUFILEVBQXdELFNBQUEsR0FBQTtBQUN0RCxZQUFBLGlCQUFBO0FBQUEsUUFBQSxNQUFBLEdBQVMsSUFBVCxDQUFBO0FBQUEsUUFDQSxTQUFBLEdBQVksSUFBSSxDQUFDLElBQUwsQ0FBVSxhQUFWLEVBQXlCLGNBQXpCLENBRFosQ0FBQTtBQUFBLFFBRUEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxTQUFiLENBRkEsQ0FBQTtBQUFBLFFBSUEsZUFBQSxDQUFnQixTQUFBLEdBQUE7aUJBQ2QsWUFBWSxDQUFDLGVBQWIsQ0FBNkIsYUFBN0IsRUFBNEMsY0FBNUMsQ0FBMkQsQ0FBQyxJQUE1RCxDQUFpRSxTQUFDLENBQUQsR0FBQTttQkFBTyxNQUFBLEdBQVMsRUFBaEI7VUFBQSxDQUFqRSxFQURjO1FBQUEsQ0FBaEIsQ0FKQSxDQUFBO2VBT0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLElBQWYsQ0FBb0IsU0FBcEIsQ0FBQSxDQUFBO2lCQUNBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxPQUFmLENBQXVCLGtCQUF2QixFQUZHO1FBQUEsQ0FBTCxFQVJzRDtNQUFBLENBQXhELENBTEEsQ0FBQTthQWlCQSxFQUFBLENBQUcsMkRBQUgsRUFBZ0UsU0FBQSxHQUFBO0FBQzlELFlBQUEsTUFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLElBQVQsQ0FBQTtBQUFBLFFBQ0EsYUFBQSxHQUFnQixJQUFJLENBQUMsU0FBTCxDQUFBLENBRGhCLENBQUE7QUFBQSxRQUdBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLFlBQVksQ0FBQyxlQUFiLENBQTZCLGFBQTdCLEVBQTRDLGNBQTVDLENBQTJELENBQUMsSUFBNUQsQ0FBaUUsU0FBQyxDQUFELEdBQUE7bUJBQU8sTUFBQSxHQUFTLEVBQWhCO1VBQUEsQ0FBakUsRUFEYztRQUFBLENBQWhCLENBSEEsQ0FBQTtlQU1BLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxVQUFBLE1BQUEsQ0FBTyxNQUFQLENBQWMsQ0FBQyxJQUFmLENBQW9CLElBQUksQ0FBQyxJQUFMLENBQVUsYUFBVixFQUF5QixjQUF6QixDQUFwQixDQUFBLENBQUE7aUJBQ0EsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLE9BQWYsQ0FBdUIsa0JBQXZCLEVBRkc7UUFBQSxDQUFMLEVBUDhEO01BQUEsQ0FBaEUsRUFuQmlDO0lBQUEsQ0FBbkMsQ0FGQSxDQUFBO0FBQUEsSUFnQ0EsUUFBQSxDQUFTLHdCQUFULEVBQW1DLFNBQUEsR0FBQTtBQUVqQyxNQUFBLGFBQUEsR0FBZ0IsSUFBaEIsQ0FBQTtBQUFBLE1BRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUNULGFBQUEsR0FBZ0IsSUFBSSxDQUFDLFNBQUwsQ0FBQSxFQURQO01BQUEsQ0FBWCxDQUZBLENBQUE7QUFBQSxNQUtBLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBLEdBQUE7QUFDOUMsWUFBQSx5QkFBQTtBQUFBLFFBQUEsTUFBQSxHQUFTLElBQVQsQ0FBQTtBQUFBLFFBQ0EsU0FBQSxHQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsYUFBVixFQUF5QixVQUF6QixDQURaLENBQUE7QUFBQSxRQUVBLE1BQUEsR0FBUyxjQUZULENBQUE7QUFBQSxRQUlBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLFlBQVksQ0FBQyxVQUFiLENBQXdCLFNBQXhCLEVBQW1DLE1BQW5DLENBQTBDLENBQUMsSUFBM0MsQ0FBZ0QsU0FBQyxDQUFELEdBQUE7bUJBQU8sTUFBQSxHQUFTLEVBQWhCO1VBQUEsQ0FBaEQsRUFEYztRQUFBLENBQWhCLENBSkEsQ0FBQTtlQU9BLElBQUEsQ0FBSyxTQUFBLEdBQUE7aUJBQ0gsTUFBQSxDQUFPLE1BQVAsQ0FBYyxDQUFDLE9BQWYsQ0FBdUIsY0FBdkIsRUFERztRQUFBLENBQUwsRUFSOEM7TUFBQSxDQUFoRCxDQUxBLENBQUE7YUFnQkEsRUFBQSxDQUFHLHlEQUFILEVBQThELFNBQUEsR0FBQTtBQUM1RCxZQUFBLG1DQUFBO0FBQUEsUUFBQSxLQUFBLEdBQVEsSUFBUixDQUFBO0FBQUEsUUFDQSxTQUFBLEdBQVksSUFBSSxDQUFDLElBQUwsQ0FBVSxhQUFWLEVBQXlCLE1BQXpCLENBRFosQ0FBQTtBQUFBLFFBRUEsRUFBRSxDQUFDLFNBQUgsQ0FBYSxTQUFiLENBRkEsQ0FBQTtBQUFBLFFBR0EsU0FBQSxHQUFZLElBQUksQ0FBQyxJQUFMLENBQVUsYUFBVixFQUF5QixNQUF6QixDQUhaLENBQUE7QUFBQSxRQUlBLE1BQUEsR0FBUyxjQUpULENBQUE7QUFBQSxRQU1BLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLFlBQVksQ0FBQyxVQUFiLENBQXdCLFNBQXhCLEVBQW1DLE1BQW5DLENBQTBDLENBQUMsT0FBRCxDQUExQyxDQUFpRCxTQUFDLENBQUQsR0FBQTttQkFBTyxLQUFBLEdBQVEsRUFBZjtVQUFBLENBQWpELEVBRGM7UUFBQSxDQUFoQixDQU5BLENBQUE7ZUFTQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFBLENBQU8sS0FBSyxDQUFDLEtBQWIsQ0FBbUIsQ0FBQyxZQUFwQixDQUFpQyxDQUFqQyxDQUFBLENBQUE7QUFBQSxVQUNBLE1BQUEsQ0FBTyxLQUFLLENBQUMsSUFBYixDQUFrQixDQUFDLElBQW5CLENBQXdCLFFBQXhCLENBREEsQ0FBQTtpQkFFQSxNQUFBLENBQU8sS0FBSyxDQUFDLE9BQWIsQ0FBcUIsQ0FBQyxJQUF0QixDQUEyQixNQUEzQixFQUhHO1FBQUEsQ0FBTCxFQVY0RDtNQUFBLENBQTlELEVBbEJpQztJQUFBLENBQW5DLENBaENBLENBQUE7V0FpRUEsUUFBQSxDQUFTLDZCQUFULEVBQXdDLFNBQUEsR0FBQTtBQUV0QyxNQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7ZUFDVCxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsdUJBQTlCLEVBRGM7UUFBQSxDQUFoQixFQURTO01BQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxNQUlBLEVBQUEsQ0FBRyxpRUFBSCxFQUFzRSxTQUFBLEdBQUE7QUFDcEUsWUFBQSw2QkFBQTtBQUFBLFFBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLCtDQUFoQixFQUFpRSxLQUFqRSxDQUFBLENBQUE7QUFBQSxRQUNBLFdBQUEsR0FBa0IsSUFBQSxJQUFBLENBQUssSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLDZCQUEzQixDQUFMLENBRGxCLENBQUE7QUFBQSxRQUVBLGdCQUFBLEdBQW1CLFlBQVksQ0FBQyxvQkFBYixDQUFrQyxXQUFsQyxDQUZuQixDQUFBO2VBSUEsTUFBQSxDQUFPLGdCQUFQLENBQXdCLENBQUMsSUFBekIsQ0FBOEIsUUFBOUIsRUFMb0U7TUFBQSxDQUF0RSxDQUpBLENBQUE7YUFXQSxFQUFBLENBQUcsZ0dBQUgsRUFBcUcsU0FBQSxHQUFBO0FBQ25HLFlBQUEsNkJBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwrQ0FBaEIsRUFBaUUsSUFBakUsQ0FBQSxDQUFBO0FBQUEsUUFDQSxXQUFBLEdBQWtCLElBQUEsSUFBQSxDQUFLLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixJQUFyQixFQUEyQiw2QkFBM0IsQ0FBTCxDQURsQixDQUFBO0FBQUEsUUFFQSxnQkFBQSxHQUFtQixZQUFZLENBQUMsb0JBQWIsQ0FBa0MsV0FBbEMsQ0FGbkIsQ0FBQTtlQUlBLE1BQUEsQ0FBTyxnQkFBUCxDQUF3QixDQUFDLElBQXpCLENBQThCLFVBQTlCLEVBTG1HO01BQUEsQ0FBckcsRUFic0M7SUFBQSxDQUF4QyxFQW5Fd0I7RUFBQSxDQUExQixDQU5BLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/spec/image-factory-spec.coffee
