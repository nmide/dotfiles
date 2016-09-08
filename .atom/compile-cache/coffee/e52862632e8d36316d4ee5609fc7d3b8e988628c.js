(function() {
  var ArgumentEntry, ClassEntry, Main, MethodEntry, PhpClassTree, Point, TreeView, XRegExp, activeTree, argumentRegExp, classRegExp, methodRegExp, nextTreeId, phpRegExp, toggled;

  XRegExp = require('xregexp').XRegExp;

  Point = require('atom').Point;

  TreeView = require('./views/tree-view');

  phpRegExp = '\\\\?[a-zA-Z_\\x7f-\\xff][\\\\a-zA-Z0-9_\\x7f-\\xff]*';

  classRegExp = new XRegExp('(?:(?<abstract>abstract)\\s+)?(?<type>class|interface)\\s+(?<name>' + phpRegExp + ')(?:\\s+extends\\s+(?<extends>' + phpRegExp + '))?(?:\\s+implements\\s+(?<implements>' + phpRegExp + '))?\\s*{', 'i');

  methodRegExp = new XRegExp('(?:(?<abstract>abstract)\\s+)?(?:(?<access>private|protected|public)\\s+)?(?:(?<static>static)\\s+)?function\\s+(?<name>' + phpRegExp + ')\\s*\\(', 'i');

  argumentRegExp = new XRegExp('(?:(?<type>' + phpRegExp + ')\\s+)?\\$(?<name>' + phpRegExp + ')', 'i');

  nextTreeId = 1;

  activeTree = null;

  toggled = null;

  PhpClassTree = (function() {
    function PhpClassTree(textEditor) {
      var matches;
      if (textEditor == null) {
        throw new Error('You must provide TextEditor');
      }
      this.id = nextTreeId++;
      this.textEditor = textEditor;
      matches = this.getMatches();
      if (matches.length === 0) {
        return;
      }
      this.treeView = new TreeView(matches);
    }

    PhpClassTree.prototype.attach = function() {
      return this.treeView.attach();
    };

    PhpClassTree.prototype.detach = function() {
      return this.treeView.detach();
    };

    PhpClassTree.prototype.toggle = function() {
      if (atom.workspace.getActiveTextEditor().getGrammar().name !== 'PHP') {
        return;
      }
      return toggled = this.treeView.toggle();
    };

    PhpClassTree.prototype.rebuild = function() {
      var matches;
      matches = this.getMatches();
      if (this.treeView != null) {
        this.detach();
      }
      this.treeView = new TreeView(matches);
      return this.attach();
    };

    PhpClassTree.prototype.getMatches = function() {
      var matches, text;
      text = this.textEditor.getText();
      return matches = this.scanText(text);
    };

    PhpClassTree.prototype.getPoint = function(text, index) {
      var column, cursor, lastLineCursor, row;
      cursor = 0;
      row = 0;
      lastLineCursor = 0;
      while (cursor < index) {
        if (text[cursor] === '\n') {
          row++;
          lastLineCursor = cursor;
        }
        cursor++;
      }
      column = index - lastLineCursor - 1;
      return new Point(row, column);
    };

    PhpClassTree.prototype.matchBracket = function(text, index, bracket) {
      var closeBracket, closedBrackets, openBracket, openedBrackets;
      switch (bracket) {
        case '(':
        case ')':
          openBracket = '(';
          closeBracket = ')';
          break;
        default:
          openBracket = '{';
          closeBracket = '}';
      }
      openedBrackets = 1;
      closedBrackets = 0;
      while (index < text.length) {
        if (text[index] === openBracket) {
          openedBrackets++;
        }
        if (text[index] === closeBracket) {
          closedBrackets++;
        }
        if (openedBrackets === closedBrackets) {
          return index;
        }
        index++;
      }
    };

    PhpClassTree.prototype.scanText = function(text) {
      var argumentIndex, argumentResult, classEnd, classIndex, classRanges, classResult, classes, methodEnd, methodEntry, methodIndex, methodIndexes, methodResult, methods, root;
      classIndex = 0;
      classes = [];
      classRanges = [];
      methodIndexes = [];
      root = [];
      while (classResult = XRegExp.exec(text, classRegExp, classIndex)) {
        classIndex = classResult.index + classResult[0].length;
        classEnd = this.matchBracket(text, classIndex);
        classes.push(new ClassEntry(classResult.name, classResult.type, classResult.abstract, classResult["extends"], classResult["implements"], this.getPoint(text, classResult.index)));
        classRanges.push({
          start: classIndex,
          end: classEnd
        });
      }
      classIndex = 0;
      methodIndex = 0;
      methods = [];
      while (methodResult = XRegExp.exec(text, methodRegExp, methodIndex)) {
        methodIndex = methodResult.index + methodResult[0].length;
        methodEnd = this.matchBracket(text, methodIndex, ')');
        methodEntry = new MethodEntry(methodResult.name, methodResult.abstract, methodResult.access, methodResult["static"], this.getPoint(text, methodResult.index));
        methodIndexes.push(methodResult.index);
        argumentIndex = methodIndex;
        while (argumentResult = XRegExp.exec(text, argumentRegExp, argumentIndex)) {
          if (argumentResult.index > methodEnd) {
            break;
          }
          argumentIndex = argumentResult.index + argumentResult[0].length;
          methodEntry["arguments"].push(new ArgumentEntry(argumentResult.name, argumentResult.type, this.getPoint(text, argumentResult.index)));
        }
        methods.push(methodEntry);
      }
      methodIndex = 0;
      classIndex = 0;
      while (methodIndex < methods.length || classIndex < classes.length) {
        if ((classes[classIndex] != null) && (methods[methodIndex] != null) && methodIndexes[methodIndex] > classRanges[classIndex].start && methodIndexes[methodIndex] < classRanges[classIndex].end) {
          classes[classIndex].methods.push(methods[methodIndex]);
          methods.splice(methodIndex, 1);
          methodIndexes.splice(methodIndex, 1);
        } else if (((classes[classIndex] != null) && methodIndexes[methodIndex] > classRanges[classIndex].end) || ((classes[classIndex] != null) && (methods[methodIndex] == null))) {
          root.push(classes[classIndex]);
          classIndex++;
        } else {
          root.push(methods[methodIndex]);
          methodIndex++;
        }
      }
      return root;
    };

    return PhpClassTree;

  })();

  ClassEntry = function(name, type, abstract, extending, implementing, point) {
    this.methods = [];
    this.icons = ['icon-' + type];
    this.point = point;
    this.name = name;
    this.type = type;
    if (abstract != null) {
      this.abstract = true;
      this.icons.push('icon-abstract');
    } else {
      this.abstract = false;
    }
    if (extending != null) {
      this.extending = extending;
      this.icons.push('icon-extends');
    } else {
      this.extending = false;
    }
    if (implementing != null) {
      this.implementing = implementing;
      this.icons.push('icon-implements');
    } else {
      this.implementing = false;
    }
  };

  MethodEntry = function(name, abstract, access, isStatic, point) {
    this["arguments"] = [];
    this.icons = ['icon-method'];
    this.point = point;
    this.name = name;
    if (abstract != null) {
      this.abstract = true;
      this.icons.push('icon-abstract');
    } else {
      this.abstract = false;
    }
    if (access != null) {
      this.access = access;
      this.icons.push('icon-' + access);
    } else {
      this.access = 'public';
    }
    if (isStatic != null) {
      this.isStatic = true;
      this.icons.push('icon-static');
    } else {
      this.isStatic = false;
    }
  };

  ArgumentEntry = function(name, type, point) {
    this.icons = ['icon-argument'];
    this.point = point;
    this.name = name;
    this.type = type != null ? type : 'var';
  };

  Main = (function() {
    var active;

    Main.prototype.config = {
      autoToggle: {
        type: 'boolean',
        "default": true
      },
      displayOnRight: {
        type: 'boolean',
        "default": false
      }
    };

    active = false;

    Main.phpClassTrees = [];

    function Main() {
      atom.workspace.onDidChangeActivePaneItem((function(_this) {
        return function(paneItem) {
          if (paneItem == null) {
            return;
          }
          if (paneItem.constructor.name === 'TextEditor') {
            _this.constructor.getPhpClassTreeByEditor(paneItem);
          }
        };
      })(this));
      toggled = atom.config.get('php-class-tree.autoToggle');
    }

    Main.prototype.activate = function() {
      active = true;
      atom.commands.add('atom-workspace', 'php-class-tree:build', (function(_this) {
        return function() {
          return _this.build();
        };
      })(this));
      atom.commands.add('atom-workspace', 'php-class-tree:toggle', (function(_this) {
        return function() {
          return activeTree.toggle();
        };
      })(this));
      atom.commands.add('atom-workspace', 'php-class-tree:rebuild', (function(_this) {
        return function() {
          return activeTree.rebuild();
        };
      })(this));
    };

    Main.prototype.build = function() {
      var phpClassTree, textEditor;
      textEditor = atom.workspace.getActiveTextEditor();
      return phpClassTree = this.constructor.getPhpClassTreeByEditor(textEditor);
    };

    Main.getPhpClassTreeByEditor = function(textEditor) {
      var phpClassTree, tree, _i, _len, _ref;
      if (textEditor == null) {
        throw new Error('You must provide TextEditor');
      }
      if (textEditor.getGrammar().name !== 'PHP') {
        phpClassTree = false;
      }
      _ref = this.phpClassTrees;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tree = _ref[_i];
        if (tree.textEditor === textEditor) {
          phpClassTree = tree;
          break;
        }
      }
      if (phpClassTree == null) {
        phpClassTree = new PhpClassTree(textEditor);
        this.phpClassTrees.push(phpClassTree);
      }
      if (activeTree != null) {
        activeTree.detach();
      }
      if (phpClassTree) {
        activeTree = phpClassTree;
        if (toggled == null) {
          toggled = atom.config.get('php-class-tree.autoToggle');
        }
        if (toggled) {
          activeTree.attach();
        }
      }
      return phpClassTree;
    };

    return Main;

  })();

  module.exports = new Main;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9waHAtY2xhc3MtdHJlZS9saWIvcGhwLWNsYXNzLXRyZWUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJLQUFBOztBQUFBLEVBQUMsVUFBVyxPQUFBLENBQVEsU0FBUixFQUFYLE9BQUQsQ0FBQTs7QUFBQSxFQUNDLFFBQVMsT0FBQSxDQUFRLE1BQVIsRUFBVCxLQURELENBQUE7O0FBQUEsRUFFQSxRQUFBLEdBQVcsT0FBQSxDQUFRLG1CQUFSLENBRlgsQ0FBQTs7QUFBQSxFQUlBLFNBQUEsR0FBWSx1REFKWixDQUFBOztBQUFBLEVBS0EsV0FBQSxHQUFrQixJQUFBLE9BQUEsQ0FBUSxvRUFBQSxHQUF1RSxTQUF2RSxHQUFtRixnQ0FBbkYsR0FBc0gsU0FBdEgsR0FBa0ksd0NBQWxJLEdBQTZLLFNBQTdLLEdBQXlMLFVBQWpNLEVBQTZNLEdBQTdNLENBTGxCLENBQUE7O0FBQUEsRUFNQSxZQUFBLEdBQW1CLElBQUEsT0FBQSxDQUFRLDBIQUFBLEdBQTZILFNBQTdILEdBQXlJLFVBQWpKLEVBQTZKLEdBQTdKLENBTm5CLENBQUE7O0FBQUEsRUFPQSxjQUFBLEdBQXFCLElBQUEsT0FBQSxDQUFRLGFBQUEsR0FBZ0IsU0FBaEIsR0FBNEIsb0JBQTVCLEdBQW1ELFNBQW5ELEdBQStELEdBQXZFLEVBQTRFLEdBQTVFLENBUHJCLENBQUE7O0FBQUEsRUFTQSxVQUFBLEdBQWEsQ0FUYixDQUFBOztBQUFBLEVBVUEsVUFBQSxHQUFhLElBVmIsQ0FBQTs7QUFBQSxFQVdBLE9BQUEsR0FBVSxJQVhWLENBQUE7O0FBQUEsRUFhTTtBQUNTLElBQUEsc0JBQUMsVUFBRCxHQUFBO0FBQ1gsVUFBQSxPQUFBO0FBQUEsTUFBQSxJQUFPLGtCQUFQO0FBQ0UsY0FBVSxJQUFBLEtBQUEsQ0FB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

//# sourceURL=/home/nick/.atom/packages/php-class-tree/lib/php-class-tree.coffee
