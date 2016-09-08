(function() {
  describe("AsciiDoc autocompletions", function() {
    var completions, editor, getCompletions, pack, provider, _ref;
    _ref = [], pack = _ref[0], editor = _ref[1], provider = _ref[2], completions = _ref[3];
    getCompletions = function(options) {
      var cursor, end, prefix, request, start, _ref1;
      if (options == null) {
        options = {};
      }
      cursor = editor.getLastCursor();
      start = cursor.getBeginningOfCurrentWordBufferPosition();
      end = cursor.getBufferPosition();
      prefix = editor.getTextInRange([start, end]);
      request = {
        editor: editor,
        bufferPosition: end,
        scopeDescriptor: cursor.getScopeDescriptor(),
        prefix: prefix,
        activatedManually: (_ref1 = options.activatedManually) != null ? _ref1 : true
      };
      return provider.getSuggestions(request);
    };
    beforeEach(function() {
      completions = null;
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-asciidoc');
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('autocomplete-asciidoc').then(function(p) {
          return pack = p;
        });
      });
      runs(function() {
        return provider = pack.mainModule.provide();
      });
      waitsFor('provider is loaded', function() {
        return Object.keys(provider.attributes).length > 0;
      });
      return waitsForPromise(function() {
        return atom.workspace.open('test.adoc').then(function(e) {
          return editor = e;
        });
      });
    });
    describe('should provide completion when', function() {
      it('is in an attribute reference without letter prefix', function() {
        editor.setText('{b}');
        editor.setCursorBufferPosition([0, 1]);
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          return expect(completions.length).toBe(57);
        });
      });
      it('is in an attribute reference', function() {
        editor.setText('{b}');
        editor.setCursorBufferPosition([0, 2]);
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          expect(completions.length).toBe(6);
          expect(completions[0]).toEqualJson({
            text: 'backend',
            displayText: 'backend',
            type: 'variable',
            description: 'Backend used to create the output file.',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          expect(completions[1]).toEqualJson({
            text: 'backslash',
            displayText: 'backslash',
            type: 'variable',
            description: '\\',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          expect(completions[2]).toEqualJson({
            text: 'backtick',
            displayText: 'backtick',
            type: 'variable',
            description: '`',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          expect(completions[3]).toEqualJson({
            text: 'basebackend',
            displayText: 'basebackend',
            type: 'variable',
            description: 'The backend value minus any trailing numbers.',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          expect(completions[4]).toEqualJson({
            text: 'blank',
            displayText: 'blank',
            type: 'variable',
            description: 'nothing',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          return expect(completions[5]).toEqualJson({
            text: 'brvbar',
            displayText: 'brvbar',
            type: 'variable',
            description: '¦',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
        });
      });
      it('with a local attribute definition', function() {
        editor.setText(':zzzzz:\n\n{zz}');
        editor.setCursorBufferPosition([2, 3]);
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          expect(completions.length).toBe(2);
          expect(completions[0]).toEqualJson({
            text: 'zwsp',
            displayText: 'zwsp',
            type: 'variable',
            description: '&#8203;',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
          return expect(completions[1]).toEqualJson({
            text: 'zzzzz',
            displayText: 'zzzzz',
            type: 'variable',
            description: 'Local attribute',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#using-attributes-set-assign-and-reference',
            rightLabel: 'local'
          });
        });
      });
      return it('with a local attribute definition after the current position', function() {
        editor.setText('{zz}\n\n:zzzzz:');
        editor.setCursorBufferPosition([0, 3]);
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          expect(completions.length).toBe(1);
          return expect(completions[0]).toEqualJson({
            text: 'zwsp',
            displayText: 'zwsp',
            type: 'variable',
            description: '&#8203;',
            descriptionMoreURL: 'http://asciidoctor.org/docs/user-manual/#attribute-catalog',
            rightLabel: 'asciidoc'
          });
        });
      });
    });
    return describe('should not provide completion when', function() {
      it('editor does not contains text', function() {
        editor.setText('');
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          return expect(completions.length).toBe(0);
        });
      });
      return it('is not in an attribute reference', function() {
        editor.setText('a');
        waitsForPromise(function() {
          return getCompletions().then(function(c) {
            return completions = c;
          });
        });
        return runs(function() {
          return expect(completions.length).toBe(0);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdXRvY29tcGxldGUtYXNjaWlkb2Mvc3BlYy9jb21wbGV0aW9ucy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsMEJBQVQsRUFBcUMsU0FBQSxHQUFBO0FBQ25DLFFBQUEseURBQUE7QUFBQSxJQUFBLE9BQXdDLEVBQXhDLEVBQUMsY0FBRCxFQUFPLGdCQUFQLEVBQWUsa0JBQWYsRUFBeUIscUJBQXpCLENBQUE7QUFBQSxJQUVBLGNBQUEsR0FBaUIsU0FBQyxPQUFELEdBQUE7QUFDZixVQUFBLDBDQUFBOztRQURnQixVQUFRO09BQ3hCO0FBQUEsTUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLGFBQVAsQ0FBQSxDQUFULENBQUE7QUFBQSxNQUNBLEtBQUEsR0FBUSxNQUFNLENBQUMsdUNBQVAsQ0FBQSxDQURSLENBQUE7QUFBQSxNQUVBLEdBQUEsR0FBTSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUZOLENBQUE7QUFBQSxNQUdBLE1BQUEsR0FBUyxNQUFNLENBQUMsY0FBUCxDQUFzQixDQUFDLEtBQUQsRUFBUSxHQUFSLENBQXRCLENBSFQsQ0FBQTtBQUFBLE1BS0EsT0FBQSxHQUNFO0FBQUEsUUFBQSxNQUFBLEVBQVEsTUFBUjtBQUFBLFFBQ0EsY0FBQSxFQUFnQixHQURoQjtBQUFBLFFBRUEsZUFBQSxFQUFpQixNQUFNLENBQUMsa0JBQVAsQ0FBQSxDQUZqQjtBQUFBLFFBR0EsTUFBQSxFQUFRLE1BSFI7QUFBQSxRQUlBLGlCQUFBLHdEQUErQyxJQUovQztPQU5GLENBQUE7YUFXQSxRQUFRLENBQUMsY0FBVCxDQUF3QixPQUF4QixFQVplO0lBQUEsQ0FGakIsQ0FBQTtBQUFBLElBZ0JBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLFdB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

//# sourceURL=/home/nick/.atom/packages/autocomplete-asciidoc/spec/completions-spec.coffee
