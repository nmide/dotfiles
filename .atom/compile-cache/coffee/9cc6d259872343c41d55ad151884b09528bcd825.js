(function() {
  module.exports = {
    apply: function() {
      var root, setFontSize, setLayoutMode;
      root = document.documentElement;
      setFontSize = function(currentFontSize) {
        if (Number.isInteger(currentFontSize)) {
          return root.style.fontSize = currentFontSize + 'px';
        } else if (currentFontSize === 'Auto') {
          return root.style.fontSize = '';
        }
      };
      atom.config.onDidChange('one-light-ui.fontSize', function() {
        return setFontSize(atom.config.get('one-light-ui.fontSize'));
      });
      setFontSize(atom.config.get('one-light-ui.fontSize'));
      setLayoutMode = function(layoutMode) {
        return root.setAttribute('theme-one-light-ui-layoutmode', layoutMode.toLowerCase());
      };
      atom.config.onDidChange('one-light-ui.layoutMode', function() {
        return setLayoutMode(atom.config.get('one-light-ui.layoutMode'));
      });
      return setLayoutMode(atom.config.get('one-light-ui.layoutMode'));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9vbmUtbGlnaHQtdWktYWR3YWl0YS9saWIvY29uZmlnLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxLQUFBLEVBQU8sU0FBQSxHQUFBO0FBRUwsVUFBQSxnQ0FBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxlQUFoQixDQUFBO0FBQUEsTUFJQSxXQUFBLEdBQWMsU0FBQyxlQUFELEdBQUE7QUFDWixRQUFBLElBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsZUFBakIsQ0FBSDtpQkFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVgsR0FBc0IsZUFBQSxHQUFrQixLQUQxQztTQUFBLE1BRUssSUFBRyxlQUFBLEtBQW1CLE1BQXRCO2lCQUNILElBQUksQ0FBQyxLQUFLLENBQUMsUUFBWCxHQUFzQixHQURuQjtTQUhPO01BQUEsQ0FKZCxDQUFBO0FBQUEsTUFVQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IsdUJBQXhCLEVBQWlELFNBQUEsR0FBQTtlQUMvQyxXQUFBLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVCQUFoQixDQUFaLEVBRCtDO01BQUEsQ0FBakQsQ0FWQSxDQUFBO0FBQUEsTUFhQSxXQUFBLENBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVCQUFoQixDQUFaLENBYkEsQ0FBQTtBQUFBLE1BaUJBLGFBQUEsR0FBZ0IsU0FBQyxVQUFELEdBQUE7ZUFDZCxJQUFJLENBQUMsWUFBTCxDQUFrQiwrQkFBbEIsRUFBbUQsVUFBVSxDQUFDLFdBQVgsQ0FBQSxDQUFuRCxFQURjO01BQUEsQ0FqQmhCLENBQUE7QUFBQSxNQW9CQSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVosQ0FBd0IseUJBQXhCLEVBQW1ELFNBQUEsR0FBQTtlQUNqRCxhQUFBLENBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQixDQUFkLEVBRGlEO01BQUEsQ0FBbkQsQ0FwQkEsQ0FBQTthQXVCQSxhQUFBLENBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQixDQUFkLEVBekJLO0lBQUEsQ0FBUDtHQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/one-light-ui-adwaita/lib/config.coffee
