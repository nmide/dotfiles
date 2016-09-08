(function() {
  var $, Highlights, Task, cheerio, fs, highlighter, makeAttributes, makeOptions, packagePath, path, render, resolveImagePaths, resourcePath, sanitize, scopeForFenceName, tokenizeCodeBlocks, _ref;

  $ = require('atom-space-pen-views').$;

  Task = require('atom').Task;

  path = require('path');

  fs = require('fs-plus');

  cheerio = require('cheerio');

  Highlights = require(path.join(atom.packages.resolvePackagePath('markdown-preview'), '..', 'highlights'));

  scopeForFenceName = require('./highlights-helper').scopeForFenceName;

  _ref = require('./configuration-builder'), makeAttributes = _ref.makeAttributes, makeOptions = _ref.makeOptions;

  highlighter = null;

  resourcePath = atom.getLoadSettings().resourcePath;

  packagePath = path.dirname(__dirname);

  exports.toHtml = function(text, filePath) {
    if (text == null) {
      text = '';
    }
    return render(text, filePath).then(function(html) {
      return sanitize(html);
    }).then(function(html) {
      return resolveImagePaths(html, filePath);
    }).then(function(html) {
      return tokenizeCodeBlocks(html);
    });
  };

  exports.toRawHtml = function(text, filePath) {
    if (text == null) {
      text = '';
    }
    return render(text, filePath);
  };

  render = function(text, filePath) {
    if (text == null) {
      text = '';
    }
    if (atom.config.get('asciidoc-preview.defaultAttributes') == null) {
      return Promise.resolve();
    }
    return new Promise(function(resolve, reject) {
      var attributes, options, task, taskPath;
      attributes = makeAttributes();
      options = makeOptions(filePath);
      taskPath = require.resolve('./worker');
      task = Task.once(taskPath, text, attributes, options);
      task.on('asciidoctor-render:success', function(_arg) {
        var html;
        html = _arg.html;
        if (!html) {
          console.warn("Rendering is empty: " + filePath);
        }
        return resolve(html || '');
      });
      return task.on('asciidoctor-render:error', function(_arg) {
        var code, errno, stack, syscall;
        code = _arg.code, errno = _arg.errno, syscall = _arg.syscall, stack = _arg.stack;
        return resolve("<div>\n  <h1>Asciidoctor.js error</h1>\n  <h2>Rendering error</h2>\n  <div>\n    <p><b>Please verify your document syntax.</b></p>\n    <p>Details: " + (stack.split('\n')[0]) + "</p>\n    <p>[code: " + code + ", errno: " + errno + ", syscall: " + syscall + "]<p>\n    <div>" + stack + "</div>\n  </div>\n</div>");
      });
    });
  };

  sanitize = function(html) {
    var attribute, attributesToRemove, o, _i, _len;
    if (!html) {
      return html;
    }
    o = cheerio.load(html);
    o('script').remove();
    attributesToRemove = ['onabort', 'onblur', 'onchange', 'onclick', 'ondbclick', 'onerror', 'onfocus', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove', 'onmouseover', 'onmouseout', 'onmouseup', 'onreset', 'onresize', 'onscroll', 'onselect', 'onsubmit', 'onunload'];
    for (_i = 0, _len = attributesToRemove.length; _i < _len; _i++) {
      attribute = attributesToRemove[_i];
      o('*').removeAttr(attribute);
    }
    return o.html();
  };

  resolveImagePaths = function(html, filePath) {
    var appenderChar, img, imgElement, invalidateCache, o, rootDirectory, src, _i, _len, _ref1;
    if (!html) {
      return html;
    }
    rootDirectory = atom.project.relativizePath(filePath)[0];
    o = cheerio.load(html);
    _ref1 = o('img');
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      imgElement = _ref1[_i];
      img = o(imgElement);
      if (src = img.attr('src')) {
        appenderChar = src.indexOf('?') === -1 ? "?" : "&";
        invalidateCache = "" + appenderChar + "atomcache=" + (Date.now());
        if (src.match(/^(https?|atom):\/\// || src.startsWith(process.resourcesPath || src.startsWith(resourcePath || src.startsWith(packagePath))))) {
          img.attr('src', src + invalidateCache);
        } else if (src[0] === '/') {
          if (!fs.isFileSync(src)) {
            if (rootDirectory) {
              img.attr('src', path.join(rootDirectory, src.substring(1) + invalidateCache));
            }
          }
        } else {
          img.attr('src', path.resolve(path.dirname(filePath), "" + src + invalidateCache));
        }
      }
    }
    return o.html();
  };

  tokenizeCodeBlocks = function(html, defaultLanguage) {
    var codeBlock, fenceName, fontFamily, highlightedBlock, highlightedHtml, preElement, _i, _len, _ref1, _ref2, _ref3, _ref4;
    if (defaultLanguage == null) {
      defaultLanguage = 'text';
    }
    html = $(html);
    if (fontFamily = atom.config.get('editor.fontFamily')) {
      html.find('code').css('font-family', fontFamily);
    }
    _ref1 = $.merge(html.filter('pre'), html.find('pre'));
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      preElement = _ref1[_i];
      codeBlock = $(preElement.firstChild);
      if (((_ref2 = codeBlock[0]) != null ? _ref2.nodeType : void 0) !== Node.TEXT_NODE) {
        fenceName = (_ref3 = (_ref4 = codeBlock.attr('class')) != null ? _ref4.replace(/^language-/, '') : void 0) != null ? _ref3 : defaultLanguage;
        if (highlighter == null) {
          highlighter = new Highlights({
            registry: atom.grammars
          });
        }
        highlightedHtml = highlighter.highlightSync({
          fileContents: codeBlock.text(),
          scopeName: scopeForFenceName(fenceName)
        });
        highlightedBlock = $(highlightedHtml);
        highlightedBlock.removeClass('editor').addClass("lang-" + fenceName);
        highlightedBlock.insertAfter(preElement);
        preElement.remove();
      }
    }
    return html;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9yZW5kZXJlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNkxBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxzQkFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNDLE9BQVEsT0FBQSxDQUFRLE1BQVIsRUFBUixJQURELENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSEwsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUpWLENBQUE7O0FBQUEsRUFNQSxVQUFBLEdBQWEsT0FBQSxDQUFRLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxrQkFBakMsQ0FBVixFQUFnRSxJQUFoRSxFQUFzRSxZQUF0RSxDQUFSLENBTmIsQ0FBQTs7QUFBQSxFQU9DLG9CQUFxQixPQUFBLENBQVEscUJBQVIsRUFBckIsaUJBUEQsQ0FBQTs7QUFBQSxFQVNBLE9BQWdDLE9BQUEsQ0FBUSx5QkFBUixDQUFoQyxFQUFDLHNCQUFBLGNBQUQsRUFBaUIsbUJBQUEsV0FUakIsQ0FBQTs7QUFBQSxFQVdBLFdBQUEsR0FBYyxJQVhkLENBQUE7O0FBQUEsRUFZQyxlQUFnQixJQUFJLENBQUMsZUFBTCxDQUFBLEVBQWhCLFlBWkQsQ0FBQTs7QUFBQSxFQWFBLFdBQUEsR0FBYyxJQUFJLENBQUMsT0FBTCxDQUFhLFNBQWIsQ0FiZCxDQUFBOztBQUFBLEVBZUEsT0FBTyxDQUFDLE1BQVIsR0FBaUIsU0FBQyxJQUFELEVBQVUsUUFBVixHQUFBOztNQUFDLE9BQUs7S0FDckI7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

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/renderer.coffee
