(function() {
  var BufferedProcess, Point, Q, TagGenerator, path, _ref;

  _ref = require('atom'), BufferedProcess = _ref.BufferedProcess, Point = _ref.Point;

  Q = require('q');

  path = require('path');

  module.exports = TagGenerator = (function() {
    function TagGenerator(path, scopeName) {
      this.path = path;
      this.scopeName = scopeName;
    }

    TagGenerator.prototype.parseTagLine = function(line) {
      var sections, tag;
      sections = line.split('\t');
      if (sections.length > 3) {
        tag = {
          position: new Point(parseInt(sections[2]) - 1),
          name: sections[0],
          type: sections[3],
          parent: null
        };
        if (sections.length > 4 && sections[4].search('signature:') === -1) {
          tag.parent = sections[4];
        }
        if (this.getLanguage() === 'Python' && tag.type === 'member') {
          tag.type = 'function';
        }
        return tag;
      } else {
        return null;
      }
    };

    TagGenerator.prototype.getLanguage = function() {
      var _ref1;
      if ((_ref1 = path.extname(this.path)) === '.cson' || _ref1 === '.gyp') {
        return 'Cson';
      }
      return {
        'source.c': 'C',
        'source.cpp': 'C++',
        'source.clojure': 'Lisp',
        'source.coffee': 'CoffeeScript',
        'source.css': 'Css',
        'source.css.less': 'Css',
        'source.css.scss': 'Css',
        'source.gfm': 'Markdown',
        'source.go': 'Go',
        'source.java': 'Java',
        'source.js': 'JavaScript',
        'source.js.jsx': 'JavaScript',
        'source.jsx': 'JavaScript',
        'source.json': 'Json',
        'source.makefile': 'Make',
        'source.objc': 'C',
        'source.objcpp': 'C++',
        'source.python': 'Python',
        'source.ruby': 'Ruby',
        'source.sass': 'Sass',
        'source.yaml': 'Yaml',
        'text.html': 'Html',
        'text.html.php': 'Php',
        'source.livecodescript': 'LiveCode',
        'source.c++': 'C++',
        'source.objc++': 'C++'
      }[this.scopeName];
    };

    TagGenerator.prototype.generate = function() {
      var args, command, defaultCtagsFile, deferred, exit, language, stderr, stdout, tags;
      deferred = Q.defer();
      tags = [];
      command = path.resolve(__dirname, '..', 'vendor', "universal-ctags-" + process.platform);
      defaultCtagsFile = require.resolve('./.ctags');
      args = ["--options=" + defaultCtagsFile, '--fields=KsS'];
      if (atom.config.get('symbols-view.useEditorGrammarAsCtagsLanguage')) {
        if (language = this.getLanguage()) {
          args.push("--language-force=" + language);
        }
      }
      args.push('-nf', '-', this.path);
      stdout = (function(_this) {
        return function(lines) {
          var line, tag, _i, _len, _ref1, _results;
          _ref1 = lines.split('\n');
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            line = _ref1[_i];
            if (tag = _this.parseTagLine(line.trim())) {
              _results.push(tags.push(tag));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      stderr = function(lines) {};
      exit = function() {
        return deferred.resolve(tags);
      };
      new BufferedProcess({
        command: command,
        args: args,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
      return deferred.promise;
    };

    return TagGenerator;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9zeW1ib2xzLXRyZWUtdmlldy9saWIvdGFnLWdlbmVyYXRvci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsbURBQUE7O0FBQUEsRUFBQSxPQUEyQixPQUFBLENBQVEsTUFBUixDQUEzQixFQUFDLHVCQUFBLGVBQUQsRUFBa0IsYUFBQSxLQUFsQixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxHQUFSLENBREosQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ1MsSUFBQSxzQkFBRSxJQUFGLEVBQVMsU0FBVCxHQUFBO0FBQXFCLE1BQXBCLElBQUMsQ0FBQSxPQUFBLElBQW1CLENBQUE7QUFBQSxNQUFiLElBQUMsQ0FBQSxZQUFBLFNBQVksQ0FBckI7SUFBQSxDQUFiOztBQUFBLDJCQUVBLFlBQUEsR0FBYyxTQUFDLElBQUQsR0FBQTtBQUNaLFVBQUEsYUFBQTtBQUFBLE1BQUEsUUFBQSxHQUFXLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxDQUFYLENBQUE7QUFDQSxNQUFBLElBQUcsUUFBUSxDQUFDLE1BQVQsR0FBa0IsQ0FBckI7QUFDRSxRQUFBLEdBQUEsR0FBTTtBQUFBLFVBQ0osUUFBQSxFQUFjLElBQUEsS0FBQSxDQUFNLFFBQUEsQ0FBUyxRQUFTLENBQUEsQ0FBQSxDQUFsQixDQUFBLEdBQXdCLENBQTlCLENBRFY7QUFBQSxVQUVKLElBQUEsRUFBTSxRQUFTLENBQUEsQ0FBQSxDQUZYO0FBQUEsVUFHSixJQUFBLEVBQU0sUUFBUyxDQUFBLENBQUEsQ0FIWDtBQUFBLFVBSUosTUFBQSxFQUFRLElBSko7U0FBTixDQUFBO0FBTUEsUUFBQSxJ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

//# sourceURL=/home/nick/.atom/packages/symbols-tree-view/lib/tag-generator.coffee
