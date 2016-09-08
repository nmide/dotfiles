(function() {
  var asciiDocimageHelper, clipboard, fakeAsciiDocGrammarBuilder, fs, path, temp;

  clipboard = require('clipboard');

  temp = require('temp').track();

  path = require('path');

  fs = require('fs');

  asciiDocimageHelper = require('../lib/main');

  fakeAsciiDocGrammarBuilder = require('./fixtures/fake-asciidoc-grammar-builder');

  describe('URL with AsciiDoc Image helper should', function() {
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
    it('create a link and store the image in a directory when image folder append to link and URL in "file" format and use the default directory', function() {
      var called, imageUrl;
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
      imageUrl = 'file:///' + path.join(__dirname, 'fixtures', imageName);
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toMatch(/image::images(\/|\\)logo-atom\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
    it('create a link and store the image in a directory when image folder append to link and URL in quoted string and use the default directory', function() {
      var called, imageUrl;
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
      imageUrl = '"' + path.join(__dirname, 'fixtures', imageName) + '"';
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toMatch(/image::images(\/|\\)logo-atom\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
    it('create a link and store the image in a directory when image folder append to link and use the default directory', function() {
      var called, imageUrl;
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
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toMatch(/image::images(\/|\\)logo-atom\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
    it('create a link and store the image in a directory when image folder append to link and use custom directory', function() {
      var called, imageUrl;
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
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toMatch(/image::foo(\/|\\)logo-atom\.png\[\]/);
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
    it('create a link and store the image in a directory when image folder not append to link and use the default directory', function() {
      var called, imageUrl;
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
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toBe('image::logo-atom.png[]');
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
    return it('create a link and store the image in a directory when image folder not append to link and use custom directory', function() {
      var called, imageUrl;
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
      clipboard.writeText(imageUrl);
      atom.commands.dispatch(workspaceElement, 'core:paste');
      waitsFor('markup insertion', function() {
        return called === true;
      });
      return runs(function() {
        var imagesFolder, stat;
        editor.selectAll();
        expect(editor.getSelectedText()).toBe('image::logo-atom.png[]');
        imagesFolder = atom.config.get('asciidoc-image-helper.imageFolder.name');
        stat = fs.statSync(path.join(directory, imagesFolder, imageName));
        expect(stat).toBeDefined();
        return expect(stat.size).toBe(6258);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1pbWFnZS1oZWxwZXIvc3BlYy9tYWluLXVybC1zdXBwb3J0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBFQUFBOztBQUFBLEVBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBQVosQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFlLENBQUMsS0FBaEIsQ0FBQSxDQURQLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBSEwsQ0FBQTs7QUFBQSxFQUlBLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSxhQUFSLENBSnRCLENBQUE7O0FBQUEsRUFLQSwwQkFBQSxHQUE2QixPQUFBLENBQVEsMENBQVIsQ0FMN0IsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyx1Q0FBVCxFQUFrRCxTQUFBLEdBQUE7QUFFaEQsUUFBQSxvREFBQTtBQUFBLElBQUEsU0FBQSxHQUFZLGVBQVosQ0FBQTtBQUFBLElBQ0EsT0FBd0MsRUFBeEMsRUFBQyxtQkFBRCxFQUFZLGdCQUFaLEVBQW9CLDBCQURwQixDQUFBO0FBQUEsSUFHQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSxRQUFBO0FBQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsdUNBQWhCLEVBQXlELEtBQXpELENBQUEsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLElBQUksQ0FBQyxTQUFMLENBQUEsQ0FEWixDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQWIsQ0FBc0IsQ0FBQyxTQUFELENBQXRCLENBRkEsQ0FBQTtB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

//# sourceURL=/home/nick/.atom/packages/asciidoc-image-helper/spec/main-url-support-spec.coffee
