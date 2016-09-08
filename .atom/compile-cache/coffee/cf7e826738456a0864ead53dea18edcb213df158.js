(function() {
  var root, setFontSize, setLayoutMode, unsetFontSize, unsetLayoutMode;

  root = document.documentElement;

  module.exports = {
    config: {
      fontSize: {
        title: 'Font Size',
        description: 'Change the UI font size. Needs to be between 8 and 20.',
        type: ['integer', 'string'],
        minimum: 8,
        maximum: 20,
        "default": 'Auto'
      },
      layoutMode: {
        title: 'Layout Mode',
        description: 'In Auto mode, the UI will automatically adapt based on the window size.',
        type: 'string',
        "default": 'Auto',
        "enum": ['Compact', 'Auto', 'Spacious']
      }
    },
    activate: function(state) {
      atom.config.onDidChange('light-bint-ui.fontSize', function() {
        return setFontSize(atom.config.get('light-bint-ui.fontSize'));
      });
      atom.config.onDidChange('light-bint-ui.layoutMode', function() {
        return setLayoutMode(atom.config.get('light-bint-ui.layoutMode'));
      });
      setFontSize(atom.config.get('light-bint-ui.fontSize'));
      return setLayoutMode(atom.config.get('light-bint-ui.layoutMode'));
    },
    deactivate: function() {
      unsetFontSize();
      return unsetLayoutMode();
    }
  };

  setFontSize = function(currentFontSize) {
    if (Number.isInteger(currentFontSize)) {
      return root.style.fontSize = "" + currentFontSize + "px";
    } else if (currentFontSize === 'Auto') {
      return unsetFontSize();
    }
  };

  unsetFontSize = function() {
    return root.style.fontSize = '';
  };

  setLayoutMode = function(layoutMode) {
    return root.setAttribute('theme-light-bint-ui-layoutmode', layoutMode.toLowerCase());
  };

  unsetLayoutMode = function() {
    return root.removeAttribute('theme-light-bint-ui-layoutmode');
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9saWdodC1iaW50LXVpL2xpYi9tYWluLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUlBO0FBQUEsTUFBQSxnRUFBQTs7QUFBQSxFQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsZUFBaEIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsUUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sV0FBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHdEQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sQ0FBQyxTQUFELEVBQVksUUFBWixDQUZOO0FBQUEsUUFHQSxPQUFBLEVBQVMsQ0FIVDtBQUFBLFFBSUEsT0FBQSxFQUFTLEVBSlQ7QUFBQSxRQUtBLFNBQUEsRUFBUyxNQUxUO09BREY7QUFBQSxNQU9BLFVBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGFBQVA7QUFBQSxRQUNBLFdBQUEsRUFBYSx5RUFEYjtBQUFBLFFBRUEsSUFBQSxFQUFNLFFBRk47QUFBQSxRQUdBLFNBQUEsRUFBUyxNQUhUO0FBQUEsUUFJQSxNQUFBLEVBQU0sQ0FDSixTQURJLEVBRUosTUFGSSxFQUdKLFVBSEksQ0FKTjtPQVJGO0tBREY7QUFBQSxJQW1CQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFFUixNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3Qix3QkFBeEIsRUFBa0QsU0FBQSxHQUFBO2VBQ2hELFdBQUEsQ0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLENBQVosRUFEZ0Q7TUFBQSxDQUFsRCxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBWixDQUF3QiwwQkFBeEIsRUFBb0QsU0FBQSxHQUFBO2VBQ2xELGFBQUEsQ0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMEJBQWhCLENBQWQsRUFEa0Q7TUFBQSxDQUFwRCxDQUZBLENBQUE7QUFBQSxNQU1BLFdBQUEsQ0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLENBQVosQ0FOQSxDQUFBO2FBT0EsYUFBQSxDQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiwwQkFBaEIsQ0FBZCxFQVRRO0lBQUEsQ0FuQlY7QUFBQSxJQThCQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxhQUFBLENBQUEsQ0FBQSxDQUFBO2FBQ0EsZUFBQSxDQUFBLEVBRlU7SUFBQSxDQTlCWjtHQUhGLENBQUE7O0FBQUEsRUF1Q0EsV0FBQSxHQUFjLFNBQUMsZUFBRCxHQUFBO0FBQ1osSUFBQSxJQUFHLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGVBQWpCLENBQUg7YUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVgsR0FBc0IsRUFBQSxHQUFHLGVBQUgsR0FBbUIsS0FEM0M7S0FBQSxNQUVLLElBQUcsZUFBQSxLQUFtQixNQUF0QjthQUNILGFBQUEsQ0FBQSxFQURHO0tBSE87RUFBQSxDQXZDZCxDQUFBOztBQUFBLEVBNkNBLGFBQUEsR0FBZ0IsU0FBQSxHQUFBO1dBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFYLEdBQXNCLEdBRFI7RUFBQSxDQTdDaEIsQ0FBQTs7QUFBQSxFQWtEQSxhQUFBLEdBQWdCLFNBQUMsVUFBRCxHQUFBO1dBQ2QsSUFBSSxDQUFDLFlBQUwsQ0FBa0IsZ0NBQWxCLEVBQW9ELFVBQVUsQ0FBQyxXQUFYLENBQUEsQ0FBcEQsRUFEYztFQUFBLENBbERoQixDQUFBOztBQUFBLEVBcURBLGVBQUEsR0FBa0IsU0FBQSxHQUFBO1dBQ2hCLElBQUksQ0FBQyxlQUFMLENBQXFCLGdDQUFyQixFQURnQjtFQUFBLENBckRsQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/light-bint-ui/lib/main.coffee
