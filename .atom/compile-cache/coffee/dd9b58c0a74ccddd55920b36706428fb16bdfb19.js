(function() {
  var Asciidoctor, Opal, ajs, path, stdStream;

  ajs = require('asciidoctor.js')();

  Asciidoctor = ajs.Asciidoctor();

  Opal = ajs.Opal;

  path = require('path');

  stdStream = require('./std-stream-hook');

  module.exports = function(text, attributes, options) {
    var callback, code, concatAttributes, errno, error, html, stack, syscall;
    callback = this.async();
    concatAttributes = [attributes.defaultAttributes, 'icons=font@', attributes.numbered, attributes.skipFrontMatter, attributes.showTitle, attributes.compatMode, attributes.tocType, attributes.forceExperimental].join(' ').trim();
    Opal.ENV['$[]=']('PWD', path.dirname(options.opalPwd));
    options = Opal.hash({
      base_dir: options.baseDir,
      safe: options.safeMode,
      doctype: 'article',
      backend: 'html5',
      attributes: concatAttributes
    });
    try {
      stdStream.hook();
      html = Asciidoctor.$convert(text, options);
      stdStream.restore();
      emit('asciidoctor-render:success', {
        html: html
      });
    } catch (_error) {
      error = _error;
      console.error(error);
      code = error.code, errno = error.errno, syscall = error.syscall, stack = error.stack;
      console.error(stack);
      emit('asciidoctor-render:error', {
        code: code,
        errno: errno,
        syscall: syscall,
        stack: stack
      });
    }
    return callback();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi93b3JrZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxnQkFBUixDQUFBLENBQUEsQ0FBTixDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLEdBQUcsQ0FBQyxXQUFKLENBQUEsQ0FEZCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLEdBQUcsQ0FBQyxJQUZYLENBQUE7O0FBQUEsRUFHQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FIUCxDQUFBOztBQUFBLEVBSUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxtQkFBUixDQUpaLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLE9BQW5CLEdBQUE7QUFDZixRQUFBLG9FQUFBO0FBQUEsSUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFYLENBQUE7QUFBQSxJQUVBLGdCQUFBLEdBQW1CLENBQ2pCLFVBQVUsQ0FBQyxpQkFETSxFQUVqQixhQUZpQixFQUdqQixVQUFVLENBQUMsUUFITSxFQUlqQixVQUFVLENBQUMsZUFKTSxFQUtqQixVQUFVLENBQUMsU0FMTSxFQU1qQixVQUFVLENBQUMsVUFOTSxFQU9qQixVQUFVLENBQUMsT0FQTSxFQVFqQixVQUFVLENBQUMsaUJBUk0sQ0FTbEIsQ0FBQyxJQVRpQixDQVNaLEdBVFksQ0FTUixDQUFDLElBVE8sQ0FBQSxDQUZuQixDQUFBO0FBQUEsSUFhQSxJQUFJLENBQUMsR0FBSSxDQUFBLE1BQUEsQ0FBVCxDQUFpQixLQUFqQixFQUF3QixJQUFJLENBQUMsT0FBTCxDQUFhLE9BQU8sQ0FBQyxPQUFyQixDQUF4QixDQWJBLENBQUE7QUFBQSxJQWVBLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBTCxDQUNSO0FBQUEsTUFBQSxRQUFBLEVBQVUsT0FBTyxDQUFDLE9BQWxCO0FBQUEsTUFDQSxJQUFBLEVBQU0sT0FBTyxDQUFDLFFBRGQ7QUFBQSxNQUVBLE9BQUEsRUFBUyxTQUZUO0FBQUEsTUFJQSxPQUFBLEVBQVMsT0FKVDtBQUFBLE1BS0EsVUFBQSxFQUFZLGdCQUxaO0tBRFEsQ0FmVixDQUFBO0FBdUJBO0FBQ0UsTUFBQSxTQUFTLENBQUMsSUFBVixDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPLFdBQVcsQ0FBQyxRQUFaLENBQXFCLElBQXJCLEVBQTJCLE9BQTNCLENBRFAsQ0FBQTtBQUFBLE1BRUEsU0FBUyxDQUFDLE9BQVYsQ0FBQSxDQUZBLENBQUE7QUFBQSxNQUdBLElBQUEsQ0FBSyw0QkFBTCxFQUFtQztBQUFBLFFBQUEsSUFBQSxFQUFNLElBQU47T0FBbkMsQ0FIQSxDQURGO0tBQUEsY0FBQTtBQU1FLE1BREksY0FDSixDQUFBO0FBQUEsTUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLEtBQWQsQ0FBQSxDQUFBO0FBQUEsTUFDQyxhQUFBLElBQUQsRUFBTyxjQUFBLEtBQVAsRUFBYyxnQkFBQSxPQUFkLEVBQXVCLGNBQUEsS0FEdkIsQ0FBQTtBQUFBLE1BRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxLQUFkLENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQSxDQUFLLDBCQUFMLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsUUFDQSxLQUFBLEVBQU8sS0FEUDtBQUFBLFFBRUEsT0FBQSxFQUFTLE9BRlQ7QUFBQSxRQUdBLEtBQUEsRUFBTyxLQUhQO09BREYsQ0FIQSxDQU5GO0tBdkJBO1dBc0NBLFFBQUEsQ0FBQSxFQXZDZTtFQUFBLENBTmpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/worker.coffee
