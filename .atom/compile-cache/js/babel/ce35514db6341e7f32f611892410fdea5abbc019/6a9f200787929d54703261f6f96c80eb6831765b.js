function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _path = require('path');

var path = _interopRequireWildcard(_path);

'use babel';

var goodPath = path.join(__dirname, 'files', 'good.py');
var badPath = path.join(__dirname, 'files', 'bad.py');
var emptyPath = path.join(__dirname, 'files', 'empty.py');
var lint = require('../lib/main.js').provideLinter().lint;

describe('The pylint provider for Linter', function () {
  beforeEach(function () {
    waitsForPromise(function () {
      return Promise.all([atom.packages.activatePackage('linter-pylint'), atom.packages.activatePackage('language-python').then(function () {
        return atom.workspace.open(goodPath);
      })]);
    });
  });

  it('should be in the packages list', function () {
    return expect(atom.packages.isPackageLoaded('linter-pylint')).toBe(true);
  });

  it('should be an active package', function () {
    return expect(atom.packages.isPackageActive('linter-pylint')).toBe(true);
  });

  describe('checks bad.py and', function () {
    var editor = null;
    beforeEach(function () {
      waitsForPromise(function () {
        return atom.workspace.open(badPath).then(function (openEditor) {
          editor = openEditor;
        });
      });
    });

    it('finds at least one message', function () {
      return waitsForPromise(function () {
        return lint(editor).then(function (messages) {
          expect(messages.length).toBeGreaterThan(0);
        });
      });
    });

    it('verifies that message', function () {
      return waitsForPromise(function () {
        return lint(editor).then(function (messages) {
          expect(messages[0].type).toBeDefined();
          expect(messages[0].type).toEqual('convention');
          expect(messages[0].html).not.toBeDefined();
          expect(messages[0].text).toBeDefined();
          expect(messages[0].text).toEqual('C0111 Missing module docstring');
          expect(messages[0].filePath).toBeDefined();
          expect(messages[0].filePath).toMatch(/.+spec[\\\/]files[\\\/]bad\.py$/);
          expect(messages[0].range).toBeDefined();
          expect(messages[0].range.length).toEqual(2);
          expect(messages[0].range).toEqual([[0, 0], [0, 4]]);
        });
      });
    });
  });

  it('finds nothing wrong with an empty file', function () {
    waitsForPromise(function () {
      return atom.workspace.open(emptyPath).then(function (editor) {
        return lint(editor).then(function (messages) {
          expect(messages.length).toEqual(0);
        });
      });
    });
  });

  it('finds nothing wrong with a valid file', function () {
    waitsForPromise(function () {
      return atom.workspace.open(goodPath).then(function (editor) {
        return lint(editor).then(function (messages) {
          expect(messages.length).toEqual(0);
        });
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL25pY2svLmF0b20vcGFja2FnZXMvbGludGVyLXB5bGludC9zcGVjL2xpbnRlci1weWxpbnQtc3BlYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztvQkFFc0IsTUFBTTs7SUFBaEIsSUFBSTs7QUFGaEIsV0FBVyxDQUFDOztBQUlaLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMxRCxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDeEQsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQzs7QUFFNUQsUUFBUSxDQUFDLGdDQUFnQyxFQUFFLFlBQU07QUFDL0MsWUFBVSxDQUFDLFlBQU07QUFDZixtQkFBZSxDQUFDO2FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxFQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQztlQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7T0FBQSxDQUM5QixDQUNGLENBQUM7S0FBQSxDQUNILENBQUM7R0FDSCxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLGdDQUFnQyxFQUFFO1dBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7R0FBQSxDQUNsRSxDQUFDOztBQUVGLElB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Q0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FBQztPQUFBLENBQ0g7S0FBQSxDQUNGLENBQUM7R0FDSCxDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLHVDQUF1QyxFQUFFLFlBQU07QUFDaEQsbUJBQWUsQ0FBQzthQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07ZUFDdkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVEsRUFBSTtBQUM1QixnQkFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FBQztPQUFBLENBQ0g7S0FBQSxDQUNGLENBQUM7R0FDSCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9saW50ZXItcHlsaW50L3NwZWMvbGludGVyLXB5bGludC1zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmNvbnN0IGdvb2RQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJ2ZpbGVzJywgJ2dvb2QucHknKTtcbmNvbnN0IGJhZFBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZmlsZXMnLCAnYmFkLnB5Jyk7XG5jb25zdCBlbXB0eVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnZmlsZXMnLCAnZW1wdHkucHknKTtcbmNvbnN0IGxpbnQgPSByZXF1aXJlKCcuLi9saWIvbWFpbi5qcycpLnByb3ZpZGVMaW50ZXIoKS5saW50O1xuXG5kZXNjcmliZSgnVGhlIHB5bGludCBwcm92aWRlciBmb3IgTGludGVyJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICB3YWl0c0ZvclByb21pc2UoKCkgPT5cbiAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xpbnRlci1weWxpbnQnKSxcbiAgICAgICAgYXRvbS5wYWNrYWdlcy5hY3RpdmF0ZVBhY2thZ2UoJ2xhbmd1YWdlLXB5dGhvbicpLnRoZW4oKCkgPT5cbiAgICAgICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGdvb2RQYXRoKVxuICAgICAgICApLFxuICAgICAgXSlcbiAgICApO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGJlIGluIHRoZSBwYWNrYWdlcyBsaXN0JywgKCkgPT5cbiAgICBleHBlY3QoYXRvbS5wYWNrYWdlcy5pc1BhY2thZ2VMb2FkZWQoJ2xpbnRlci1weWxpbnQnKSkudG9CZSh0cnVlKVxuICApO1xuXG4gIGl0KCdzaG91bGQgYmUgYW4gYWN0aXZlIHBhY2thZ2UnLCAoKSA9PlxuICAgIGV4cGVjdChhdG9tLnBhY2thZ2VzLmlzUGFja2FnZUFjdGl2ZSgnbGludGVyLXB5bGludCcpKS50b0JlKHRydWUpXG4gICk7XG5cbiAgZGVzY3JpYmUoJ2NoZWNrcyBiYWQucHkgYW5kJywgKCkgPT4ge1xuICAgIGxldCBlZGl0b3IgPSBudWxsO1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgd2FpdHNGb3JQcm9taXNlKCgpID0+XG4gICAgICAgIGF0b20ud29ya3NwYWNlLm9wZW4oYmFkUGF0aCkudGhlbihvcGVuRWRpdG9yID0+IHtcbiAgICAgICAgICBlZGl0b3IgPSBvcGVuRWRpdG9yO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdmaW5kcyBhdCBsZWFzdCBvbmUgbWVzc2FnZScsICgpID0+XG4gICAgICB3YWl0c0ZvclByb21pc2UoKCkgPT5cbiAgICAgICAgbGludChlZGl0b3IpLnRoZW4obWVzc2FnZXMgPT4ge1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlcy5sZW5ndGgpLnRvQmVHcmVhdGVyVGhhbigwKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgaXQoJ3ZlcmlmaWVzIHRoYXQgbWVzc2FnZScsICgpID0+XG4gICAgICB3YWl0c0ZvclByb21pc2UoKCkgPT5cbiAgICAgICAgbGludChlZGl0b3IpLnRoZW4obWVzc2FnZXMgPT4ge1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS50eXBlKS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS50eXBlKS50b0VxdWFsKCdjb252ZW50aW9uJyk7XG4gICAgICAgICAgZXhwZWN0KG1lc3NhZ2VzWzBdLmh0bWwpLm5vdC50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS50ZXh0KS50b0JlRGVmaW5lZCgpO1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS50ZXh0KS50b0VxdWFsKCdDMDExMSBNaXNzaW5nIG1vZHVsZSBkb2NzdHJpbmcnKTtcbiAgICAgICAgICBleHBlY3QobWVzc2FnZXNbMF0uZmlsZVBhdGgpLnRvQmVEZWZpbmVkKCk7XG4gICAgICAgICAgZXhwZWN0KG1lc3NhZ2VzWzBdLmZpbGVQYXRoKS50b01hdGNoKC8uK3NwZWNbXFxcXFxcL11maWxlc1tcXFxcXFwvXWJhZFxcLnB5JC8pO1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS5yYW5nZSkudG9CZURlZmluZWQoKTtcbiAgICAgICAgICBleHBlY3QobWVzc2FnZXNbMF0ucmFuZ2UubGVuZ3RoKS50b0VxdWFsKDIpO1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlc1swXS5yYW5nZSkudG9FcXVhbChbWzAsIDBdLCBbMCwgNF1dKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9KTtcblxuICBpdCgnZmluZHMgbm90aGluZyB3cm9uZyB3aXRoIGFuIGVtcHR5IGZpbGUnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+XG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGVtcHR5UGF0aCkudGhlbihlZGl0b3IgPT5cbiAgICAgICAgbGludChlZGl0b3IpLnRoZW4obWVzc2FnZXMgPT4ge1xuICAgICAgICAgIGV4cGVjdChtZXNzYWdlcy5sZW5ndGgpLnRvRXF1YWwoMCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ2ZpbmRzIG5vdGhpbmcgd3Jvbmcgd2l0aCBhIHZhbGlkIGZpbGUnLCAoKSA9PiB7XG4gICAgd2FpdHNGb3JQcm9taXNlKCgpID0+XG4gICAgICBhdG9tLndvcmtzcGFjZS5vcGVuKGdvb2RQYXRoKS50aGVuKGVkaXRvciA9PlxuICAgICAgICBsaW50KGVkaXRvcikudGhlbihtZXNzYWdlcyA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1lc3NhZ2VzLmxlbmd0aCkudG9FcXVhbCgwKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9KTtcbn0pO1xuIl19
//# sourceURL=/home/nick/.atom/packages/linter-pylint/spec/linter-pylint-spec.js