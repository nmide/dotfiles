'use babel';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LinterConfig = require('./linter-config.js');

var cp = require('child-process-es6-promise');
var genericRegexp = /(.*):(\d+):(\d+):\s(.\d+)\s*(.*)/;
var pyflakesRegexp = /(.*):(\d+):(\d+):\s*(.*)/;

var fs = require('fs');
var os = require('os');
var temp = require('temp');
var path = require('path');

var LinterPython = (function () {
    function LinterPython() {
        _classCallCheck(this, LinterPython);

        temp.track();

        this.running = false;

        this.lint = this.lint.bind(this);
        this.buildMessage = this.buildMessage.bind(this);
        this.createUnderlineRange = this.createUnderlineRange.bind(this);

        this.config = new LinterConfig();
        this.config.initialPlugin();
    }

    _createClass(LinterPython, [{
        key: 'lint',
        value: function lint(textEditor) {
            var _this = this;

            var filePath = textEditor.getPath();
            var projectDir = this.calculateProjectDir(atom.project.relativizePath(textEditor.getPath())[0], filePath);
            var cmd = this.config.executablePath;
            var args = [];

            // Return if lintOnFly is not allowed
            if (textEditor.isModified() && !this.config.lintOnFly) {
                return Promise.resolve(null);
            }

            // Return if lintOnSave is not allowed
            else if (!textEditor.isModified() && !this.config.lintOnSave) {
                    return Promise.resolve(null);
                }

            // Return if path is wrong
            if (!this.canExecute(cmd)) {
                atom.notifications.addError("Provided path doesn't exist.\n\n" + cmd + "\n\nPlease fix pylama path.");
                return Promise.resolve(null);
            }

            // Set parameters for lintOnFly
            if (textEditor.isModified() && this.config.lintOnFly) {
                tempFile = this.createTempFile(textEditor.getText());
                var pylama_options_file = path.join(projectDir, 'pylama.ini');
                projectDir = path.dirname(tempFile.path);
                if (!this.config.optionsFileSet && this.canRead(pylama_options_file)) {
                    args = this.config.pylamaArgs.concat(['-o', pylama_options_file, '-f', 'pep8', tempFile.path]);
                } else {
                    args = this.config.pylamaArgs.concat(['-f', 'pep8', tempFile.path]);
                }
            }

            // Set parameters for lintOnSave
            else if (!textEditor.isModified() && this.config.lintOnSave) {
                    args = this.config.pylamaArgs.concat(['-f', 'pep8', filePath]);
                }

            // Return if limit is set and other lint process is working
            if (this.running && this.config.limitToSingleInstance) {
                console.log("[Linter-Python] Not executed because of limit");
                return Promise.resolve(null);
            }

            this.running = true;

            console.log("[Linter-Python] Command: " + cmd);
            console.log("[Linter-Python] Arguments: " + args);

            return new Promise(function (resolve) {
                var messages = [];

                cp.spawn(cmd, args, { cwd: projectDir }).then(function (result) {
                    console.log("[Linter-Python] Raw output \n " + result.stdout);
                    lines = _this.parseLines(result.stdout);
                    console.log("[Linter-Python] Output: \n " + lines);

                    for (var line of lines) {
                        if (line) {
                            var message = _this.buildMessage(textEditor, line);
                            messages.push(message);
                        }
                    }
                    messages = messages.sort(function (a, b) {
                        return _this.sortBy('type', a, b);
                    });
                    _this.cleanTempFiles();
                    _this.running = false;
                    return resolve(messages);
                })['catch'](function (error) {
                    atom.notifications.addError("Execution finished with error:\n\n" + error);
                    console.log("[Linter-Python] Execution error: \n " + error);
                    _this.cleanTempFiles();
                    _this.running = false;
                    return resolve(null);
                });
            });
        }
    }, {
        key: 'calculateProjectDir',
        value: function calculateProjectDir(projectDir, filePath) {
            if (projectDir) {
                console.log("[Linter-Python] Project dir: " + projectDir);
                return projectDir;
            }
            fileDir = path.dirname(filePath);
            if (fileDir) {
                console.log("[Linter-Python] Project dir: " + fileDir);
                return fileDir;
            }
            console.log("[Linter-Python] Project dir: " + os.tmpdir());
            return os.tmpdir();
        }
    }, {
        key: 'createTempFile',
        value: function createTempFile(text) {
            var tempFile = temp.openSync({ suffix: '.py' });
            fs.writeSync(tempFile.fd, text);
            fs.closeSync(tempFile.fd);
            return tempFile;
        }
    }, {
        key: 'cleanTempFiles',
        value: function cleanTempFiles() {
            temp.cleanupSync();
        }
    }, {
        key: 'canExecute',
        value: function canExecute(path) {
            try {
                fs.accessSync(path, fs.R_OK | fs.X_OK);
                console.log("[Linter-Python] Pylama path looks ok.");
                return true;
            } catch (err) {
                console.log("[Linter-Python] There is a problem with pylama path: \n " + err);
                return false;
            }
        }
    }, {
        key: 'canRead',
        value: function canRead(path) {
            try {
                fs.accessSync(path, fs.R_OK);
                console.log("[Linter-Python] File looks ok.");
                return true;
            } catch (err) {
                console.log("[Linter-Python] There is a problem with file path: \n " + err);
                return false;
            }
        }
    }, {
        key: 'parseLines',
        value: function parseLines(data) {
            var results = [];
            var lines = data.split('\n');
            for (var line of lines) {
                found = line.match(genericRegexp);
                if (found) {
                    results.push(found);
                } else {
                    found = line.match(pyflakesRegexp);
                    if (found) {
                        results.push(found);
                    }
                }
            }
            return results;
        }
    }, {
        key: 'sortBy',
        value: function sortBy(key, a, b) {
            if (a[key] == 'Error' && b[key] == 'Warning') {
                return -1;
            }
            if (a[key] == 'Warning' && b[key] == 'Error') {
                return 1;
            }
            return 0;
        }
    }, {
        key: 'buildMessage',
        value: function buildMessage(textEditor, result) {
            var line = textEditor.getBuffer().lineForRow(result[2] - 1);
            var filePath = textEditor.getPath();
            var resultType = 'Warning';

            if (result[4].indexOf('E') > -1 || result[4].indexOf('F') > -1) {
                resultType = 'Error';
            }

            text = result.length > 5 ? result[4] + ' ' + result[5] : result[4];
            range = this.createUnderlineRange(line, parseInt(result[2]), parseInt(result[3]));
            console.log("[Linter-Python] New message: \n    type: " + resultType + "\n    text: " + text + "\n    filePath: " + filePath + "\n    range: " + range);
            return {
                type: resultType,
                text: text,
                filePath: filePath,
                range: range
            };
        }
    }, {
        key: 'createUnderlineRange',
        value: function createUnderlineRange(line, rowNumber, colNumber) {
            if (!line) {
                return [[rowNumber - 1, 0], [rowNumber - 1, 0]];
            }
            if (this.config.underlineType == "Whole line" || colNumber === 0) {
                return [[rowNumber - 1, 0], [rowNumber - 1, line.length]];
            }

            startCol = colNumber - this.config.underlineSize >= 0 ? colNumber - this.config.underlineSize : 0;
            endCol = colNumber + this.config.underlineSize <= line.length ? colNumber + this.config.underlineSize : line.length;
            return [[rowNumber - 1, startCol], [rowNumber - 1, endCol]];
        }
    }]);

    return LinterPython;
})();

module.exports = LinterPython;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvbGludGVyLXB5dGhvbi9saWIvbGludGVyLXB5dGhvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxXQUFXLENBQUM7Ozs7OztBQUVaLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVuRCxJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNoRCxJQUFNLGFBQWEsR0FBRyxrQ0FBa0MsQ0FBQztBQUN6RCxJQUFNLGNBQWMsR0FBRywwQkFBMEIsQ0FBQzs7QUFFbEQsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0IsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztJQUd2QixZQUFZO0FBRUgsYUFGVCxZQUFZLEdBRUE7OEJBRlosWUFBWTs7QUFHVixZQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRWIsWUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0FBRXJCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsWUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqRCxZQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFakUsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2pDLFlBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDL0I7O2lCQWJDLFlBQVk7O2VBZVYsY0FBQyxVQUFVLEVBQUU7OztBQUNiLGdCQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDcEMsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxRyxnQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7QUFDckMsZ0JBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7O0FBR2QsZ0JBQUksVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbkQsdUJBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQzs7O2lCQUdJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUMxRCwyQkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQzs7O0FBR0QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLG9CQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsR0FBRyxHQUFHLEdBQUcsNkJBQTZCLENBQUMsQ0FBQztBQUN0Ryx1QkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDOzs7QUFHRCxnQkFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDbEQsd0JBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELG9CQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzlELDBCQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsb0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDbEUsd0JBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDbEcsTUFDSTtBQUNELHdCQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDdkU7YUFDSjs7O2lCQUdJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDekQsd0JBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2xFOzs7QUFHRCxnQkFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7QUFDbkQsdUJBQU8sQ0FBQyxHQUFHLENBQUMsK0NBQStDLENBQUMsQ0FBQztBQUM3RCx1QkFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hDOztBQUVELGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7QUFFcEIsbUJBQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0MsbUJBQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDLENBQUM7O0FBRWxELG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQzVCLG9CQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLGtCQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FDakMsSUFBSSxDQUFDLFVBQUMsTUFBTSxFQUFLO0FBQ2QsMkJBQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlELHlCQUFLLEdBQUcsTUFBSyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLDJCQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQyxDQUFDOztBQUVuRCx5QkFBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDcEIsNEJBQUksSUFBSSxFQUFFO0FBQ04sZ0NBQUksT0FBTyxHQUFHLE1BQUssWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsRCxvQ0FBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDMUI7cUJBQ0o7QUFDRCw0QkFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQy9CLCtCQUFPLE1BQUssTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3BDLENBQUMsQ0FBQztBQUNILDBCQUFLLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLDBCQUFLLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDckIsMkJBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUM1QixDQUFDLFNBQ0ksQ0FBQyxVQUFDLEtBQUssRUFBSztBQUNkLHdCQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxvQ0FBb0MsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUMxRSwyQkFBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUM1RCwwQkFBSyxjQUFjLEVBQUUsQ0FBQztBQUN0QiwwQkFBSyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLDJCQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDeEIsQ0FBQyxDQUFDO2FBQ1YsQ0FBQyxDQUFDO1NBQ047OztlQUVrQiw2QkFBQyxVQUFVLEVBQUUsUUFBUSxFQUFFO0FBQ3RDLGdCQUFJLFVBQVUsRUFBRTtBQUNaLHVCQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixHQUFHLFVBQVUsQ0FBQyxDQUFDO0FBQzFELHVCQUFPLFVBQVUsQ0FBQzthQUNyQjtBQUNELG1CQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxPQUFPLEVBQUU7QUFDVCx1QkFBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUN2RCx1QkFBTyxPQUFPLENBQUM7YUFDbEI7QUFDRCxtQkFBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUMzRCxtQkFBTyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7OztlQUVhLHdCQUFDLElBQUksRUFBRTtBQUNqQixnQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzlDLGNBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoQyxjQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQixtQkFBTyxRQUFRLENBQUM7U0FDbkI7OztlQUVhLDBCQUFHO0FBQ2IsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0Qjs7O2VBRVMsb0JBQUMsSUFBSSxFQUFFO0FBQ2IsZ0JBQUk7QUFDQSxrQkFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsdUJBQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQztBQUNyRCx1QkFBTyxJQUFJLENBQUM7YUFDZixDQUNELE9BQU0sR0FBRyxFQUFFO0FBQ1AsdUJBQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDOUUsdUJBQU8sS0FBSyxDQUFDO2FBQ2hCO1NBQ0o7OztlQUVNLGlCQUFDLElBQUksRUFBRTtBQUNWLGdCQUFJO0FBQ0Esa0JBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3Qix1QkFBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQzlDLHVCQUFPLElBQUksQ0FBQzthQUNmLENBQ0QsT0FBTSxHQUFHLEVBQUU7QUFDUCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1RSx1QkFBTyxLQUFLLENBQUM7YUFDaEI7U0FDSjs7O2VBRVMsb0JBQUMsSUFBSSxFQUFFO0FBQ2IsZ0JBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixpQkFBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDcEIscUJBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xDLG9CQUFJLEtBQUssRUFBRTtBQUNQLDJCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2QixNQUNJO0FBQ0QseUJBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ25DLHdCQUFJLEtBQUssRUFBRTtBQUNQLCtCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN2QjtpQkFDSjthQUNKO0FBQ0QsbUJBQU8sT0FBTyxDQUFDO1NBQ2xCOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNkLGdCQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtBQUMxQyx1QkFBTyxDQUFDLENBQUMsQ0FBQzthQUNiO0FBQ0QsZ0JBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxFQUFFO0FBQzFDLHVCQUFPLENBQUMsQ0FBQzthQUNaO0FBQ0QsbUJBQU8sQ0FBQyxDQUFDO1NBQ1o7OztlQUVXLHNCQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUU7QUFDN0IsZ0JBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVELGdCQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDcEMsZ0JBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQzs7QUFFM0IsZ0JBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzVELDBCQUFVLEdBQUcsT0FBTyxDQUFDO2FBQ3hCOztBQUVELGdCQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25FLGlCQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEYsbUJBQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLEdBQUcsVUFBVSxHQUFHLGNBQWMsR0FBRyxJQUFJLEdBQUcsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUN4SixtQkFBTztBQUNILG9CQUFJLEVBQUUsVUFBVTtBQUNoQixvQkFBSSxFQUFFLElBQUk7QUFDVix3QkFBUSxFQUFFLFFBQVE7QUFDbEIscUJBQUssRUFBRSxLQUFLO2FBQ2YsQ0FBQztTQUNMOzs7ZUFFbUIsOEJBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFDN0MsZ0JBQUksQ0FBQyxJQUFJLEVBQUU7QUFDUCx1QkFBTyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwRDtBQUNELGdCQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLFlBQVksSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO0FBQzlELHVCQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUM1RDs7QUFFRCxvQkFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUNsRyxrQkFBTSxHQUFHLFNBQVMsR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JILG1CQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzlEOzs7V0E5TUMsWUFBWTs7O0FBaU5sQixNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiIvaG9tZS9uaWNrLy5hdG9tL3BhY2thZ2VzL2xpbnRlci1weXRob24vbGliL2xpbnRlci1weXRob24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgTGludGVyQ29uZmlnID0gcmVxdWlyZSgnLi9saW50ZXItY29uZmlnLmpzJyk7XG5cbmNvbnN0IGNwID0gcmVxdWlyZSgnY2hpbGQtcHJvY2Vzcy1lczYtcHJvbWlzZScpO1xuY29uc3QgZ2VuZXJpY1JlZ2V4cCA9IC8oLiopOihcXGQrKTooXFxkKyk6XFxzKC5cXGQrKVxccyooLiopLztcbmNvbnN0IHB5Zmxha2VzUmVnZXhwID0gLyguKik6KFxcZCspOihcXGQrKTpcXHMqKC4qKS87XG5cbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcbmNvbnN0IHRlbXAgPSByZXF1aXJlKCd0ZW1wJyk7XG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xuXG5cbmNsYXNzIExpbnRlclB5dGhvbiB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGVtcC50cmFjaygpO1xuXG4gICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubGludCA9IHRoaXMubGludC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJ1aWxkTWVzc2FnZSA9IHRoaXMuYnVpbGRNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlVW5kZXJsaW5lUmFuZ2UgPSB0aGlzLmNyZWF0ZVVuZGVybGluZVJhbmdlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy5jb25maWcgPSBuZXcgTGludGVyQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuY29uZmlnLmluaXRpYWxQbHVnaW4oKTtcbiAgICB9XG5cbiAgICBsaW50KHRleHRFZGl0b3IpIHtcbiAgICAgICAgbGV0IGZpbGVQYXRoID0gdGV4dEVkaXRvci5nZXRQYXRoKCk7XG4gICAgICAgIGxldCBwcm9qZWN0RGlyID0gdGhpcy5jYWxjdWxhdGVQcm9qZWN0RGlyKGF0b20ucHJvamVjdC5yZWxhdGl2aXplUGF0aCh0ZXh0RWRpdG9yLmdldFBhdGgoKSlbMF0sIGZpbGVQYXRoKTtcbiAgICAgICAgbGV0IGNtZCA9IHRoaXMuY29uZmlnLmV4ZWN1dGFibGVQYXRoO1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuXG4gICAgICAgIC8vIFJldHVybiBpZiBsaW50T25GbHkgaXMgbm90IGFsbG93ZWRcbiAgICAgICAgaWYgKHRleHRFZGl0b3IuaXNNb2RpZmllZCgpICYmICF0aGlzLmNvbmZpZy5saW50T25GbHkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgbGludE9uU2F2ZSBpcyBub3QgYWxsb3dlZFxuICAgICAgICBlbHNlIGlmICghdGV4dEVkaXRvci5pc01vZGlmaWVkKCkgJiYgIXRoaXMuY29uZmlnLmxpbnRPblNhdmUpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgcGF0aCBpcyB3cm9uZ1xuICAgICAgICBpZiAoIXRoaXMuY2FuRXhlY3V0ZShjbWQpKSB7XG4gICAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJQcm92aWRlZCBwYXRoIGRvZXNuJ3QgZXhpc3QuXFxuXFxuXCIgKyBjbWQgKyBcIlxcblxcblBsZWFzZSBmaXggcHlsYW1hIHBhdGguXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBwYXJhbWV0ZXJzIGZvciBsaW50T25GbHlcbiAgICAgICAgaWYgKHRleHRFZGl0b3IuaXNNb2RpZmllZCgpICYmIHRoaXMuY29uZmlnLmxpbnRPbkZseSkge1xuICAgICAgICAgICAgdGVtcEZpbGUgPSB0aGlzLmNyZWF0ZVRlbXBGaWxlKHRleHRFZGl0b3IuZ2V0VGV4dCgpKTtcbiAgICAgICAgICAgIGxldCBweWxhbWFfb3B0aW9uc19maWxlID0gcGF0aC5qb2luKHByb2plY3REaXIsICdweWxhbWEuaW5pJyk7XG4gICAgICAgICAgICBwcm9qZWN0RGlyID0gcGF0aC5kaXJuYW1lKHRlbXBGaWxlLnBhdGgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5vcHRpb25zRmlsZVNldCAmJiB0aGlzLmNhblJlYWQocHlsYW1hX29wdGlvbnNfZmlsZSkpIHtcbiAgICAgICAgICAgICAgICBhcmdzID0gdGhpcy5jb25maWcucHlsYW1hQXJncy5jb25jYXQoWyctbycsIHB5bGFtYV9vcHRpb25zX2ZpbGUsICctZicsICdwZXA4JywgdGVtcEZpbGUucGF0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJncyA9IHRoaXMuY29uZmlnLnB5bGFtYUFyZ3MuY29uY2F0KFsnLWYnLCAncGVwOCcsIHRlbXBGaWxlLnBhdGhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBwYXJhbWV0ZXJzIGZvciBsaW50T25TYXZlXG4gICAgICAgIGVsc2UgaWYgKCF0ZXh0RWRpdG9yLmlzTW9kaWZpZWQoKSAmJiB0aGlzLmNvbmZpZy5saW50T25TYXZlKSB7XG4gICAgICAgICAgICBhcmdzID0gdGhpcy5jb25maWcucHlsYW1hQXJncy5jb25jYXQoWyctZicsICdwZXA4JywgZmlsZVBhdGhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiBpZiBsaW1pdCBpcyBzZXQgYW5kIG90aGVyIGxpbnQgcHJvY2VzcyBpcyB3b3JraW5nXG4gICAgICAgIGlmICh0aGlzLnJ1bm5pbmcgJiYgdGhpcy5jb25maWcubGltaXRUb1NpbmdsZUluc3RhbmNlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltMaW50ZXItUHl0aG9uXSBOb3QgZXhlY3V0ZWQgYmVjYXVzZSBvZiBsaW1pdFwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0xpbnRlci1QeXRob25dIENvbW1hbmQ6IFwiICsgY21kKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gQXJndW1lbnRzOiBcIiArIGFyZ3MpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzID0gW107XG5cbiAgICAgICAgICAgIGNwLnNwYXduKGNtZCwgYXJncywge2N3ZDogcHJvamVjdERpcn0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltMaW50ZXItUHl0aG9uXSBSYXcgb3V0cHV0IFxcbiBcIiArIHJlc3VsdC5zdGRvdXQpO1xuICAgICAgICAgICAgICAgICAgICBsaW5lcyA9IHRoaXMucGFyc2VMaW5lcyhyZXN1bHQuc3Rkb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gT3V0cHV0OiBcXG4gXCIgKyBsaW5lcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuYnVpbGRNZXNzYWdlKHRleHRFZGl0b3IsIGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zb3J0QnkoJ3R5cGUnLCBhLCBiKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYW5UZW1wRmlsZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFwiRXhlY3V0aW9uIGZpbmlzaGVkIHdpdGggZXJyb3I6XFxuXFxuXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xpbnRlci1QeXRob25dIEV4ZWN1dGlvbiBlcnJvcjogXFxuIFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFuVGVtcEZpbGVzKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlUHJvamVjdERpcihwcm9qZWN0RGlyLCBmaWxlUGF0aCkge1xuICAgICAgICBpZiAocHJvamVjdERpcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gUHJvamVjdCBkaXI6IFwiICsgcHJvamVjdERpcik7XG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdERpcjtcbiAgICAgICAgfVxuICAgICAgICBmaWxlRGlyID0gcGF0aC5kaXJuYW1lKGZpbGVQYXRoKTtcbiAgICAgICAgaWYgKGZpbGVEaXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xpbnRlci1QeXRob25dIFByb2plY3QgZGlyOiBcIiArIGZpbGVEaXIpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbGVEaXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gUHJvamVjdCBkaXI6IFwiICsgb3MudG1wZGlyKCkpO1xuICAgICAgICByZXR1cm4gb3MudG1wZGlyKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlVGVtcEZpbGUodGV4dCkge1xuICAgICAgICBsZXQgdGVtcEZpbGUgPSB0ZW1wLm9wZW5TeW5jKHtzdWZmaXg6ICcucHknfSk7XG4gICAgICAgIGZzLndyaXRlU3luYyh0ZW1wRmlsZS5mZCwgdGV4dCk7XG4gICAgICAgIGZzLmNsb3NlU3luYyh0ZW1wRmlsZS5mZCk7XG4gICAgICAgIHJldHVybiB0ZW1wRmlsZTtcbiAgICB9XG5cbiAgICBjbGVhblRlbXBGaWxlcygpIHtcbiAgICAgICAgdGVtcC5jbGVhbnVwU3luYygpO1xuICAgIH1cblxuICAgIGNhbkV4ZWN1dGUocGF0aCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZnMuYWNjZXNzU3luYyhwYXRoLCBmcy5SX09LIHwgZnMuWF9PSyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltMaW50ZXItUHl0aG9uXSBQeWxhbWEgcGF0aCBsb29rcyBvay5cIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xpbnRlci1QeXRob25dIFRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIHB5bGFtYSBwYXRoOiBcXG4gXCIgKyBlcnIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuUmVhZChwYXRoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmcy5hY2Nlc3NTeW5jKHBhdGgsIGZzLlJfT0spO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbTGludGVyLVB5dGhvbl0gRmlsZSBsb29rcyBvay5cIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0xpbnRlci1QeXRob25dIFRoZXJlIGlzIGEgcHJvYmxlbSB3aXRoIGZpbGUgcGF0aDogXFxuIFwiICsgZXJyKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhcnNlTGluZXMoZGF0YSkge1xuICAgICAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgICAgICBsZXQgbGluZXMgPSBkYXRhLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgZm9yIChsZXQgbGluZSBvZiBsaW5lcykge1xuICAgICAgICAgICAgZm91bmQgPSBsaW5lLm1hdGNoKGdlbmVyaWNSZWdleHApO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZvdW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvdW5kID0gbGluZS5tYXRjaChweWZsYWtlc1JlZ2V4cCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChmb3VuZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH1cblxuICAgIHNvcnRCeShrZXksIGEsIGIpIHtcbiAgICAgICAgaWYgKGFba2V5XSA9PSAnRXJyb3InICYmIGJba2V5XSA9PSAnV2FybmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYVtrZXldID09ICdXYXJuaW5nJyAmJiBiW2tleV0gPT0gJ0Vycm9yJykge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgYnVpbGRNZXNzYWdlKHRleHRFZGl0b3IsIHJlc3VsdCkge1xuICAgICAgICBsZXQgbGluZSA9IHRleHRFZGl0b3IuZ2V0QnVmZmVyKCkubGluZUZvclJvdyhyZXN1bHRbMl0gLSAxKTtcbiAgICAgICAgbGV0IGZpbGVQYXRoID0gdGV4dEVkaXRvci5nZXRQYXRoKCk7XG4gICAgICAgIGxldCByZXN1bHRUeXBlID0gJ1dhcm5pbmcnO1xuXG4gICAgICAgIGlmIChyZXN1bHRbNF0uaW5kZXhPZignRScpID4gLTEgfHwgcmVzdWx0WzRdLmluZGV4T2YoJ0YnKSA+IC0xKSB7XG4gICAgICAgICAgICByZXN1bHRUeXBlID0gJ0Vycm9yJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRleHQgPSByZXN1bHQubGVuZ3RoID4gNSA/IHJlc3VsdFs0XSArICcgJyArIHJlc3VsdFs1XSA6IHJlc3VsdFs0XTtcbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNyZWF0ZVVuZGVybGluZVJhbmdlKGxpbmUsIHBhcnNlSW50KHJlc3VsdFsyXSksIHBhcnNlSW50KHJlc3VsdFszXSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIltMaW50ZXItUHl0aG9uXSBOZXcgbWVzc2FnZTogXFxuICAgIHR5cGU6IFwiICsgcmVzdWx0VHlwZSArIFwiXFxuICAgIHRleHQ6IFwiICsgdGV4dCArIFwiXFxuICAgIGZpbGVQYXRoOiBcIiArIGZpbGVQYXRoICsgXCJcXG4gICAgcmFuZ2U6IFwiICsgcmFuZ2UpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogcmVzdWx0VHlwZSxcbiAgICAgICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgICAgICBmaWxlUGF0aDogZmlsZVBhdGgsXG4gICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY3JlYXRlVW5kZXJsaW5lUmFuZ2UobGluZSwgcm93TnVtYmVyLCBjb2xOdW1iZXIpIHtcbiAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gW1tyb3dOdW1iZXIgLSAxICwgMF0sIFtyb3dOdW1iZXIgLSAxLCAwXV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnVuZGVybGluZVR5cGUgPT0gXCJXaG9sZSBsaW5lXCIgfHwgY29sTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW1tyb3dOdW1iZXIgLSAxLCAwXSxbcm93TnVtYmVyIC0gMSwgbGluZS5sZW5ndGhdXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0Q29sID0gY29sTnVtYmVyIC0gdGhpcy5jb25maWcudW5kZXJsaW5lU2l6ZSA+PSAwID8gY29sTnVtYmVyIC0gdGhpcy5jb25maWcudW5kZXJsaW5lU2l6ZSA6IDA7XG4gICAgICAgIGVuZENvbCA9IGNvbE51bWJlciAgKyB0aGlzLmNvbmZpZy51bmRlcmxpbmVTaXplIDw9IGxpbmUubGVuZ3RoID8gY29sTnVtYmVyICsgdGhpcy5jb25maWcudW5kZXJsaW5lU2l6ZSA6IGxpbmUubGVuZ3RoO1xuICAgICAgICByZXR1cm4gW1tyb3dOdW1iZXIgLSAxLCBzdGFydENvbF0sW3Jvd051bWJlciAtIDEsIGVuZENvbF1dO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaW50ZXJQeXRob247XG4iXX0=
//# sourceURL=/home/nick/.atom/packages/linter-python/lib/linter-python.js
