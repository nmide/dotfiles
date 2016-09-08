(function() {
  var scopesByFenceName;

  scopesByFenceName = {
    'bash': 'source.shell',
    'c': 'source.c',
    'c++': 'source.cpp',
    'clojure': 'source.clojure',
    'coffee': 'source.coffee',
    'coffeescript': 'source.coffee',
    'coffee-script': 'source.coffee',
    'cpp': 'source.cpp',
    'cs': 'source.cs',
    'csharp': 'source.cs',
    'css': 'source.css',
    'erlang': 'source.erl',
    'go': 'source.go',
    'golang': 'source.go',
    'html': 'text.html.basic',
    'java': 'source.java',
    'javascript': 'source.js',
    'js': 'source.js',
    'json': 'source.json',
    'less': 'source.css.less',
    'make': 'source.makefile',
    'makefile': 'source.makefile',
    'markdown': 'source.gfm',
    'md': 'source.gfm',
    'mdown': 'source.gfm',
    'mustache': 'text.html.mustache',
    'objc': 'source.objc',
    'objective-c': 'source.objc',
    'perl': 'source.perl',
    'php': 'text.html.php',
    'plist': 'text.xml.plist',
    'properties': 'source.git-config',
    'py': 'source.python',
    'python': 'source.python',
    'rb': 'source.ruby',
    'ruby': 'source.ruby',
    'sass': 'source.sass',
    'scss': 'source.css.scss',
    'sh': 'source.shell',
    'shell': 'source.shell',
    'sql': 'source.sql',
    'text': 'text.plain',
    'todo': 'text.todo',
    'toml': 'source.toml',
    'xml': 'text.xml',
    'yaml': 'source.yaml',
    'yml': 'source.yaml',
    'csv': 'text.csv',
    'diff': 'source.diff',
    'docker': 'source.dockerfile',
    'dockerfile': 'source.dockerfile',
    'elixir': 'source.elixir',
    'elm': 'source.elm',
    'groovy': 'source.groovy',
    'haskell': 'source.haskell',
    'jsx': 'source.js.jsx',
    'julia': 'source.julia',
    'ocaml': 'source.ocaml',
    'patch': 'source.diff',
    'r': 'source.r',
    'rej': 'source.diff',
    'rs': 'source.rust',
    'rust': 'source.rust',
    'scala': 'source.scala',
    'swift': 'source.swift',
    'typescript': 'source.ts',
    'ts': 'source.ts'
  };

  module.exports = {
    scopeForFenceName: function(fenceName) {
      var _ref;
      fenceName = fenceName.toLowerCase();
      return (_ref = scopesByFenceName[fenceName]) != null ? _ref : "source." + fenceName;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9oaWdobGlnaHRzLWhlbHBlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUJBQUE7O0FBQUEsRUFBQSxpQkFBQSxHQUVFO0FBQUEsSUFBQSxNQUFBLEVBQVEsY0FBUjtBQUFBLElBQ0EsR0FBQSxFQUFLLFVBREw7QUFBQSxJQUVBLEtBQUEsRUFBTyxZQUZQO0FBQUEsSUFHQSxTQUFBLEVBQVcsZ0JBSFg7QUFBQSxJQUlBLFFBQUEsRUFBVSxlQUpWO0FBQUEsSUFLQSxjQUFBLEVBQWdCLGVBTGhCO0FBQUEsSUFNQSxlQUFBLEVBQWlCLGVBTmpCO0FBQUEsSUFPQSxLQUFBLEVBQU8sWUFQUDtBQUFBLElBUUEsSUFBQSxFQUFNLFdBUk47QUFBQSxJQVNBLFFBQUEsRUFBVSxXQVRWO0FBQUEsSUFVQSxLQUFBLEVBQU8sWUFWUDtBQUFBLElBV0EsUUFBQSxFQUFVLFlBWFY7QUFBQSxJQVlBLElBQUEsRUFBTSxXQVpOO0FBQUEsSUFhQSxRQUFBLEVBQVUsV0FiVjtBQUFBLElBY0EsTUFBQSxFQUFRLGlCQWRSO0FBQUEsSUFlQSxNQUFBLEVBQVEsYUFmUjtBQUFBLElBZ0JBLFlBQUEsRUFBYyxXQWhCZDtBQUFBLElBaUJBLElBQUEsRUFBTSxXQWpCTjtBQUFBLElBa0JBLE1BQUEsRUFBUSxhQWxCUjtBQUFBLElBbUJBLE1BQUEsRUFBUSxpQkFuQlI7QUFBQSxJQW9CQSxNQUFBLEVBQVEsaUJBcEJSO0FBQUEsSUFxQkEsVUFBQSxFQUFZLGlCQXJCWjtBQUFBLElBc0JBLFVBQUEsRUFBWSxZQXRCWjtBQUFBLElBdUJBLElBQUEsRUFBTSxZQXZCTjtBQUFBLElBd0JBLE9BQUEsRUFBUyxZQXhCVDtBQUFBLElBeUJBLFVBQUEsRUFBWSxvQkF6Qlo7QUFBQSxJQTBCQSxNQUFBLEVBQVEsYUExQlI7QUFBQSxJQTJCQSxhQUFBLEVBQWUsYUEzQmY7QUFBQSxJQTRCQSxNQUFBLEVBQVEsYUE1QlI7QUFBQSxJQTZCQSxLQUFBLEVBQU8sZUE3QlA7QUFBQSxJQThCQSxPQUFBLEVBQVMsZ0JBOUJUO0FBQUEsSUErQkEsWUFBQSxFQUFjLG1CQS9CZDtBQUFBLElBZ0NBLElBQUEsRUFBTSxlQWhDTjtBQUFBLElBaUNBLFFBQUEsRUFBVSxlQWpDVjtBQUFBLElBa0NBLElBQUEsRUFBTSxhQWxDTjtBQUFBLElBbUNBLE1BQUEsRUFBUSxhQW5DUjtBQUFBLElBb0NBLE1BQUEsRUFBUSxhQXBDUjtBQUFBLElBcUNBLE1BQUEsRUFBUSxpQkFyQ1I7QUFBQSxJQXNDQSxJQUFBLEVBQU0sY0F0Q047QUFBQSxJQXVDQSxPQUFBLEVBQVMsY0F2Q1Q7QUFBQSxJQXdDQSxLQUFBLEVBQU8sWUF4Q1A7QUFBQSxJQXlDQSxNQUFBLEVBQVEsWUF6Q1I7QUFBQSxJQTBDQSxNQUFBLEVBQVEsV0ExQ1I7QUFBQSxJQTJDQSxNQUFBLEVBQVEsYUEzQ1I7QUFBQSxJQTRDQSxLQUFBLEVBQU8sVUE1Q1A7QUFBQSxJQTZDQSxNQUFBLEVBQVEsYUE3Q1I7QUFBQSxJQThDQSxLQUFBLEVBQU8sYUE5Q1A7QUFBQSxJQWdEQSxLQUFBLEVBQU8sVUFoRFA7QUFBQSxJQWlEQSxNQUFBLEVBQVEsYUFqRFI7QUFBQSxJQWtEQSxRQUFBLEVBQVUsbUJBbERWO0FBQUEsSUFtREEsWUFBQSxFQUFjLG1CQW5EZDtBQUFBLElBb0RBLFFBQUEsRUFBVSxlQXBEVjtBQUFBLElBcURBLEtBQUEsRUFBTyxZQXJEUDtBQUFBLElBc0RBLFFBQUEsRUFBVSxlQXREVjtBQUFBLElBdURBLFNBQUEsRUFBVyxnQkF2RFg7QUFBQSxJQXdEQSxLQUFBLEVBQU8sZUF4RFA7QUFBQSxJQXlEQSxPQUFBLEVBQVMsY0F6RFQ7QUFBQSxJQTBEQSxPQUFBLEVBQVMsY0ExRFQ7QUFBQSxJQTJEQSxPQUFBLEVBQVMsYUEzRFQ7QUFBQSxJQTREQSxHQUFBLEVBQUssVUE1REw7QUFBQSxJQTZEQSxLQUFBLEVBQU8sYUE3RFA7QUFBQSxJQThEQSxJQUFBLEVBQU0sYUE5RE47QUFBQSxJQStEQSxNQUFBLEVBQVEsYUEvRFI7QUFBQSxJQWdFQSxPQUFBLEVBQVMsY0FoRVQ7QUFBQSxJQWlFQSxPQUFBLEVBQVMsY0FqRVQ7QUFBQSxJQWtFQSxZQUFBLEVBQWMsV0FsRWQ7QUFBQSxJQW1FQSxJQUFBLEVBQU0sV0FuRU47R0FGRixDQUFBOztBQUFBLEVBdUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGlCQUFBLEVBQW1CLFNBQUMsU0FBRCxHQUFBO0FBQ2pCLFVBQUEsSUFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLFNBQVMsQ0FBQyxXQUFWLENBQUEsQ0FBWixDQUFBO29FQUNnQyxTQUFBLEdBQVMsVUFGeEI7SUFBQSxDQUFuQjtHQXhFRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/highlights-helper.coffee
