(function() {
  module.exports = {
    oldStdoutWrite: process.stdout.write,
    oldStderrWrite: process.stderr.write,
    hook: function() {
      if (process.platform === 'win32') {
        process.stdout.write = function(string, encoding, fd) {
          return console.log(string);
        };
        return process.stderr.write = function(string, encoding, fd) {
          return console.error(string);
        };
      }
    },
    restore: function() {
      if (process.platform === 'win32') {
        process.stdout.write = this.oldStdoutWrite;
        return process.stderr.write = this.oldStderrWrite;
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9zdGQtc3RyZWFtLWhvb2suY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR0E7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFBZ0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUEvQjtBQUFBLElBQ0EsY0FBQSxFQUFnQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBRC9CO0FBQUEsSUFHQSxJQUFBLEVBQU0sU0FBQSxHQUFBO0FBQ0osTUFBQSxJQUFHLE9BQU8sQ0FBQyxRQUFSLEtBQW9CLE9BQXZCO0FBQ0UsUUFBQSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQWYsR0FBdUIsU0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixFQUFuQixHQUFBO2lCQUEwQixPQUFPLENBQUMsR0FBUixDQUFZLE1BQVosRUFBMUI7UUFBQSxDQUF2QixDQUFBO2VBQ0EsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFmLEdBQXVCLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsRUFBbkIsR0FBQTtpQkFBMEIsT0FBTyxDQUFDLEtBQVIsQ0FBYyxNQUFkLEVBQTFCO1FBQUEsRUFGekI7T0FESTtJQUFBLENBSE47QUFBQSxJQVFBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLElBQUcsT0FBTyxDQUFDLFFBQVIsS0FBb0IsT0FBdkI7QUFDRSxRQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixHQUF1QixJQUFDLENBQUEsY0FBeEIsQ0FBQTtlQUNBLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBZixHQUF1QixJQUFDLENBQUEsZUFGMUI7T0FETztJQUFBLENBUlQ7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/std-stream-hook.coffee
