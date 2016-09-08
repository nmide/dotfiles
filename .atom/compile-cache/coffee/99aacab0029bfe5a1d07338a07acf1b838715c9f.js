(function() {
  var asciiDocimageHelper, clipboard, fakeAsciiDocGrammarBuilder, fs, nativeImage, path, remote, temp;

  temp = require('temp').track();

  path = require('path');

  fs = require('fs');

  remote = require('remote');

  nativeImage = remote.require('native-image');

  clipboard = remote.require('clipboard');

  asciiDocimageHelper = require('../lib/main');

  fakeAsciiDocGrammarBuilder = require('./fixtures/fake-asciidoc-grammar-builder');

  describe('Native image with AsciiDoc Image helper should', function() {
    var directory, editor, imageName, workspaceElement, _ref;
    imageName = 'logo-atom.png';
    _ref = [], directory = _ref[0], editor = _ref[1], workspaceElement = _ref[2];
    beforeEach(function() {
      var filePath;
      atom.config.set('asciidoc-image-helper.customFilenames', false);
      directory = temp.mkdirSync();
      atom.project.setPaths([directory]);
      workspaceElement = atom.views.getView(atom.workspace);
      filePath = path.join(directory, 'foobar.adoc');
      fs.writeFileSync(filePath, 'foobar');
      waitsForPromise(function() {
        return atom.packages.activatePackage('asciidoc-image-helper');
      });
      return waitsForPromise(function() {
        return Promise.resolve().then(function() {
          return atom.workspace.open(filePath);
        }).then(function(ed) {
          return editor = ed;
        }).then(function(ed) {
          return fakeAsciiDocGrammarBuilder.createGrammar();
        }).then(function(grammar) {
          return editor.setGrammar(grammar);
        });
      });
    });
    afterEach(function() {
      clipboard.clear();
      if (editor != null) {
        editor.destroy();
      }
      return temp.cleanupSync();
    });
    it('create a link and store the image in a directory when image folder append to link and use the default directory', function() {
      var called, imageUrl, img;
      called = false;
      asciiDocimageHelper.onDidInsert(function() {
        return called = true;
      });
      atom.config.set('asciidoc-image-helper.imageFolder.append', true);
      atom.config.set('asciidoc-image-helper.urlSupport.enable', true);
      editor = atom.workspace.getActiveTextEditor();
      expect(editor.getPath()).toMatch(/^.*(\/|\\)foobar\.adoc$/);
      editor.selectAll();
      expect(editor.getSelectedText()).toMatch(/^foobar$/);
      editor["delete"]();
      imageUrl = path.join(__dirname, 'fixtures', imageName);
      img = nativeImage.createFromPath(imageUrl);
      clipboard.writeImage(img);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, link, result, stat;
        editor.selectAll();
        link = editor.getSelectedText();
        expect(link).toMatch(/image::images(\/|\\)foobar-[\w]+\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        result = /image::images(\/|\\)(foobar[\w\-.]+)\[\]/ig.exec(link);
        stat = fs.statSync(path.join(directory, imagesFolder, result[2]));
        expect(stat).toBeDefined();
        return expect(stat.size).toBeGreaterThan(6256);
      });
    });
    it('create a link and store the image in a directory when image folder append to link and use custom directory', function() {
      var called, imageUrl, img;
      called = false;
      asciiDocimageHelper.onDidInsert(function() {
        return called = true;
      });
      atom.config.set('asciidoc-image-helper.imageFolder.append', true);
      atom.config.set('asciidoc-image-helper.urlSupport.enable', true);
      atom.config.set('asciidoc-image-helper.imageFolder.name', 'foo');
      editor = atom.workspace.getActiveTextEditor();
      expect(editor.getPath()).toMatch(/^.*(\/|\\)foobar\.adoc$/);
      editor.selectAll();
      expect(editor.getSelectedText()).toMatch(/^foobar$/);
      editor["delete"]();
      imageUrl = path.join(__dirname, 'fixtures', imageName);
      img = nativeImage.createFromPath(imageUrl);
      clipboard.writeImage(img);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, link, result, stat;
        editor.selectAll();
        link = editor.getSelectedText();
        expect(link).toMatch(/image::foo(\/|\\)foobar-[\w]+\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        result = /image::foo(\/|\\)(foobar[\w\-.]+)\[\]/ig.exec(link);
        stat = fs.statSync(path.join(directory, imagesFolder, result[2]));
        expect(stat).toBeDefined();
        return expect(stat.size).toBeGreaterThan(6256);
      });
    });
    it('create a link and store the image in a directory when image folder not append to link and use the default directory', function() {
      var called, imageUrl, img;
      called = false;
      asciiDocimageHelper.onDidInsert(function() {
        return called = true;
      });
      atom.config.set('asciidoc-image-helper.imageFolder.append', false);
      atom.config.set('asciidoc-image-helper.urlSupport.enable', true);
      editor = atom.workspace.getActiveTextEditor();
      expect(editor.getPath()).toMatch(/^.*(\/|\\)foobar\.adoc$/);
      editor.selectAll();
      expect(editor.getSelectedText()).toMatch(/^foobar$/);
      editor["delete"]();
      imageUrl = path.join(__dirname, 'fixtures', imageName);
      img = nativeImage.createFromPath(imageUrl);
      clipboard.writeImage(img);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, link, result, stat;
        editor.selectAll();
        link = editor.getSelectedText();
        expect(link).toMatch(/image::foobar-[\w]+\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        result = /image::(foobar[\w\-.]+)\[\]/ig.exec(link);
        stat = fs.statSync(path.join(directory, imagesFolder, result[1]));
        expect(stat).toBeDefined();
        return expect(stat.size).toBeGreaterThan(6256);
      });
    });
    return it('create a link and store the image in a directory when image folder not append to link and use custom directory', function() {
      var called, imageUrl, img;
      called = false;
      asciiDocimageHelper.onDidInsert(function() {
        return called = true;
      });
      atom.config.set('asciidoc-image-helper.imageFolder.append', false);
      atom.config.set('asciidoc-image-helper.urlSupport.enable', true);
      atom.config.set('asciidoc-image-helper.imageFolder.name', 'bar');
      editor = atom.workspace.getActiveTextEditor();
      expect(editor.getPath()).toMatch(/^.*(\/|\\)foobar\.adoc$/);
      editor.selectAll();
      expect(editor.getSelectedText()).toMatch(/^foobar$/);
      editor["delete"]();
      imageUrl = path.join(__dirname, 'fixtures', imageName);
      img = nativeImage.createFromPath(imageUrl);
      clipboard.writeImage(img);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, link, result, stat;
        editor.selectAll();
        link = editor.getSelectedText();
        expect(link).toMatch(/image::foobar-[\w]+\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        result = /image::(foobar[\w\-.]+)\[\]/ig.exec(link);
        stat = fs.statSync(path.join(directory, imagesFolder, result[1]));
        expect(stat).toBeDefined();
        return expect(stat.size).toBeGreaterThan(6256);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvc3BlYy9tYWluLW5hdGl2ZS1pbWFnZS1zdXBwb3J0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtGQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQWUsQ0FBQyxLQUFoQixDQUFBLENBQVAsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FGTCxDQUFBOztBQUFBLEVBR0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQSxFQUlBLFdBQUEsR0FBYyxNQUFNLENBQUMsT0FBUCxDQUFlLGNBQWYsQ0FKZCxDQUFBOztBQUFBLEVBS0EsU0FBQSxHQUFZLE1BQU0sQ0FBQyxPQUFQLENBQWUsV0FBZixDQUxaLENBQUE7O0FBQUEsRUFNQSxtQkFBQSxHQUFzQixPQUFBLENBQVEsYUFBUixDQU50QixDQUFBOztBQUFBLEVBT0EsMEJBQUEsR0FBNkIsT0FBQSxDQUFRLDBDQUFSLENBUDdCLENBQUE7O0FBQUEsRUFTQSxRQUFBLENBQVMsZ0RBQVQsRUFBMkQsU0FBQSxHQUFBO0FBRXpELFFBQUEsb0RBQUE7QUFBQSxJQUFBLFNBQUEsR0FBWSxlQUFaLENBQUE7QUFBQSxJQUNBLE9BQXdDLEVBQXhDLEVBQUMsbUJBQUQsRUFBWSxnQkFBWixFQUFvQiwwQkFEcEIsQ0FBQTtBQUFBLElBR0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsUUFBQTtBQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVDQUFoQixFQUF5RCxLQUF6RCxDQUFBLENB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

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/spec/main-native-image-support-spec.coffee
