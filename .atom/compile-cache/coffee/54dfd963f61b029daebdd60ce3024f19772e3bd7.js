(function() {
  var executeAsciiDoctorPdf, opn, path;

  path = require('path');

  opn = require('opn');

  module.exports = {
    convert: function(_arg) {
      var cmd, message, sourceFilePath, target;
      target = _arg.target;
      if (atom.config.get('asciidoc-preview.exportAsPdf.enabled')) {
        sourceFilePath = target.dataset.path;
        cmd = executeAsciiDoctorPdf(sourceFilePath);
        cmd.stdout.on('data', function(data) {
          return atom.notifications.addInfo('Export as PDF:', {
            detail: data.toString() || '',
            dismissable: true
          });
        });
        cmd.stderr.on('data', function(data) {
          console.error("stderr: " + data);
          return atom.notifications.addError('Error:', {
            detail: data.toString() || '',
            dismissable: true
          });
        });
        return cmd.on('close', function(code) {
          var basename, pdfFilePath;
          basename = path.basename(sourceFilePath, path.extname(sourceFilePath));
          pdfFilePath = path.join(path.dirname(sourceFilePath), basename) + '.pdf';
          if (code === 0) {
            atom.notifications.addSuccess('Export as PDF completed!', {
              detail: pdfFilePath || '',
              dismissable: false
            });
            if (atom.config.get('asciidoc-preview.exportAsPdf.openWithExternal')) {
              return opn(pdfFilePath)["catch"](function(error) {
                atom.notifications.addError(error.toString(), {
                  detail: (error != null ? error.stack : void 0) || '',
                  dismissable: true
                });
                return console.error(error);
              });
            }
          } else {
            return atom.notifications.addWarning('Export as PDF completed with errors.', {
              detail: pdfFilePath || '',
              dismissable: false
            });
          }
        });
      } else {
        message = 'This feature is experimental.\nYou must manually activate this feature in the package settings.\n`asciidoctor-pdf` must be installed in you computer.';
        return atom.notifications.addWarning('Export as PDF:', {
          detail: message || '',
          dismissable: true
        });
      }
    }
  };

  executeAsciiDoctorPdf = function(sourceFilePath) {
    var shell, spawn;
    spawn = require('child_process').spawn;
    if (process.platform === 'win32') {
      shell = process.env['SHELL'] || 'cmd.exe';
      return spawn('asciidoctor-pdf.bat', [sourceFilePath], {
        shell: "" + shell + " -i -l"
      });
    } else {
      shell = process.env['SHELL'] || 'bash';
      return spawn('asciidoctor-pdf', [sourceFilePath], {
        shell: "" + shell + " -i -l"
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L2xpYi9wZGYtY29udmVydGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxnQ0FBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUFQLENBQUE7O0FBQUEsRUFDQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FETixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsT0FBQSxFQUFTLFNBQUMsSUFBRCxHQUFBO0FBQ1AsVUFBQSxvQ0FBQTtBQUFBLE1BRFMsU0FBRCxLQUFDLE1BQ1QsQ0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isc0NBQWhCLENBQUg7QUFFRSxRQUFBLGNBQUEsR0FBaUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFoQyxDQUFBO0FBQUEsUUFFQSxHQUFBLEdBQU0scUJBQUEsQ0FBc0IsY0FBdEIsQ0FGTixDQUFBO0FBQUEsUUFJQSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQVgsQ0FBYyxNQUFkLEVBQXNCLFNBQUMsSUFBRCxHQUFBO2lCQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QztBQUFBLFlBQUEsTUFBQSxFQUFRLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBQSxJQUFtQixFQUEzQjtBQUFBLFlBQStCLFdBQUEsRUFBYSxJQUE1QztXQUE3QyxFQURvQjtRQUFBLENBQXRCLENBSkEsQ0FBQTtBQUFBLFFBT0EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFYLENBQWMsTUFBZCxFQUFzQixTQUFDLElBQUQsR0FBQTtBQUNwQixVQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWUsVUFBQSxHQUFV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

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/lib/pdf-converter.coffee
