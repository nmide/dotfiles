(function() {
  var Dom;

  Dom = require(atom.packages.getLoadedPackage('seti-ui').path + '/lib/dom');

  module.exports = {
    addWhenFalse: function(obj) {
      if (!Array.isArray(obj.el)) {
        obj.el = [obj.el];
      }
      return obj.el.forEach(function(element) {
        var el;
        el = Dom.queryAll(element);
        if (!obj.bool) {
          return Dom.addClass(el, obj.className);
        } else {
          return Dom.removeClass(el, obj.className);
        }
      });
    },
    addWhenTrue: function(obj) {
      if (!Array.isArray(obj.el)) {
        obj.el = [obj.el];
      }
      return obj.el.forEach(function(element) {
        var el;
        el = Dom.queryAll(element);
        if (obj.bool) {
          return Dom.addClass(el, obj.className);
        } else {
          return Dom.removeClass(el, obj.className);
        }
      });
    },
    applySetting: function(obj) {
      atom.config.set(obj.config, obj.val);
      return this[obj.action]({
        el: obj.el,
        className: obj.className,
        bool: obj.val
      }, atom.config.onDidChange(obj.config, function(value) {
        if (value.oldValue !== value.newValue && typeof obj.cb === 'function') {
          return obj.cb(value.newValue);
        }
      }));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9zZXRpLXVpL2xpYi91dGlsaXR5LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxHQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFkLENBQStCLFNBQS9CLENBQXlDLENBQUMsSUFBMUMsR0FBaUQsVUFBekQsQ0FBTixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FHRTtBQUFBLElBQUEsWUFBQSxFQUFjLFNBQUMsR0FBRCxHQUFBO0FBSVosTUFBQSxJQUFHLENBQUEsS0FBTSxDQUFDLE9BQU4sQ0FBYyxHQUFHLENBQUMsRUFBbEIsQ0FBSjtBQUNFLFFBQUEsR0FBRyxDQUFDLEVBQUosR0FBUyxDQUFFLEdBQUcsQ0FBQyxFQUFOLENBQVQsQ0FERjtPQUFBO2FBR0EsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFQLENBQWUsU0FBQyxPQUFELEdBQUE7QUFFYixZQUFBLEVBQUE7QUFBQSxRQUFBLEVBQUEsR0FBSyxHQUFHLENBQUMsUUFBSixDQUFhLE9BQWIsQ0FBTCxDQUFBO0FBRUEsUUFBQSxJQUFHLENBQUEsR0FBSSxDQUFDLElBQVI7aUJBQ0UsR0FBRyxDQUFDLFFBQUosQ0FBYSxFQUFiLEVBQWlCLEdBQUcsQ0FBQyxTQUFyQixFQURGO1NBQUEsTUFBQTtpQkFHRSxHQUFHLENBQUMsV0FBSixDQUFnQixFQUFoQixFQUFvQixHQUFHLENBQUMsU0FBeEIsRUFIRjtTQUphO01BQUEsQ0FBZixFQVBZO0lBQUEsQ0FBZDtBQUFBLElBa0JBLFdBQUEsRUFBYSxTQUFDLEdBQUQsR0FBQTtBQUlYLE1BQUEsSUFBRyxDQUFBLEtBQU0sQ0FBQyxPQUFOLENBQWMsR0FBRyxDQUFDLEVBQWxCLENBQUo7QUFDRSxRQUFBLEdBQUcsQ0FBQyxFQUFKLEdBQVMsQ0FBRSxHQUFHLENBQUMsRUFBTixDQUFULENBREY7T0FBQTthQUdBLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBUCxDQUFlLFNBQUMsT0FBRCxHQUFBO0FBRWIsWUFBQSxFQUFBO0FBQUEsUUFBQSxFQUFBLEdBQUssR0FBRyxDQUFDLFFBQUosQ0FBYSxPQUFiLENBQUwsQ0FBQTtBQUVBLFFBQUEsSUFBRyxHQUFHLENBQUMsSUFBUDtpQkFDRSxHQUFHLENBQUMsUUFBSixDQUFhLEVBQWIsRUFBaUIsR0FBRyxDQUFDLFNBQXJCLEVBREY7U0FBQSxNQUFBO2lCQUdFLEdBQUcsQ0FBQyxXQUFKLENBQWdCLEVBQWhCLEVBQW9CLEdBQUcsQ0FBQyxTQUF4QixFQUhGO1NBSmE7TUFBQSxDQUFmLEVBUFc7SUFBQSxDQWxCYjtBQUFBLElBbUNBLFlBQUEsRUFBYyxTQUFDLEdBQUQsR0FBQTtBQUlaLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLEdBQUcsQ0FBQyxNQUFwQixFQUE0QixHQUFHLENBQUMsR0FBaEMsQ0FBQSxDQUFBO2FBRUEsSUFBRSxDQUFBLEdBQUcsQ0FBQyxNQUFKLENBQUYsQ0FDRTtBQUFBLFFBQUEsRUFBQSxFQUFJLEdBQUcsQ0FBQyxFQUFSO0FBQUEsUUFDQSxTQUFBLEVBQVcsR0FBRyxDQUFDLFNBRGY7QUFBQSxRQUVBLElBQUEsRUFBTSxHQUFHLENBQUMsR0FGVjtPQURGLEVBS0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLEdBQUcsQ0FBQyxNQUE1QixFQUFvQyxTQUFDLEtBQUQsR0FBQTtBQUNsQyxRQUFBLElBQUcsS0FBSyxDQUFDLFFBQU4sS0FBa0IsS0FBSyxDQUFDLFFBQXhCLElBQXFDLE1BQUEsQ0FBQSxHQUFVLENBQUMsRUFBWCxLQUFpQixVQUF6RDtpQkFDRSxHQUFHLENBQUMsRUFBSixDQUFPLEtBQUssQ0FBQyxRQUFiLEVBREY7U0FEa0M7TUFBQSxDQUFwQyxDQUxGLEVBTlk7SUFBQSxDQW5DZDtHQUxGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/seti-ui/lib/utility.coffee
