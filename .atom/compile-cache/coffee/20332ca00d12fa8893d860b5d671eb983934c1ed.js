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
      atom.config.onDidChange('two-light-ui.fontSize', function() {
        return setFontSize(atom.config.get('two-light-ui.fontSize'));
      });
      atom.config.onDidChange('two-light-ui.layoutMode', function() {
        return setLayoutMode(atom.config.get('two-light-ui.layoutMode'));
      });
      setFontSize(atom.config.get('two-light-ui.fontSize'));
      return setLayoutMode(atom.config.get('two-light-ui.layoutMode'));
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
    return root.setAttribute('theme-two-light-ui-layoutmode', layoutMode.toLowerCase());
  };

  unsetLayoutMode = function() {
    return root.removeAttribute('theme-two-light-ui-layoutmode');
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy90d28tbGlnaHQtdWkvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBSUE7QUFBQSxNQUFBLGdFQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxlQUFoQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxRQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxXQUFQO0FBQUEsUUFDQSxXQUFBLEVBQWEsd0RBRGI7QUFBQSxRQUVBLElBQUEsRUFBTSxDQUFDLFNBQUQsRUFBWSxRQUFaLENBRk47QUFBQSxRQUdBLE9BQUEsRUFBUyxDQUhUO0FBQUEsUUFJQSxPQUFBLEVBQVMsRUFKVDtBQUFBLFFBS0EsU0FBQSxFQUFTLE1BTFQ7T0FERjtBQUFBLE1BT0EsVUFBQSxFQUNFO0FBQUEsUUFBQSxLQUFBLEVBQU8sYUFBUDtBQUFBLFFBQ0EsV0FBQSxFQUFhLHlFQURiO0FBQUEsUUFFQSxJQUFBLEVBQU0sUUFGTjtBQUFBLFFBR0EsU0FBQSxFQUFTLE1BSFQ7QUFBQSxRQUlBLE1BQUEsRUFBTSxDQUNKLFNBREksRUFFSixNQUZJLEVBR0osVUFISSxDQUpOO09BUkY7S0FERjtBQUFBLElBbUJBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUVSLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLHVCQUF4QixFQUFpRCxTQUFBLEdBQUE7ZUFDL0MsV0FBQSxDQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsQ0FBWixFQUQrQztNQUFBLENBQWpELENBQUEsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFaLENBQXdCLHlCQUF4QixFQUFtRCxTQUFBLEdBQUE7ZUFDakQsYUFBQSxDQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5QkFBaEIsQ0FBZCxFQURpRDtNQUFBLENBQW5ELENBRkEsQ0FBQTtBQUFBLE1BTUEsV0FBQSxDQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsQ0FBWixDQU5BLENBQUE7YUFPQSxhQUFBLENBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHlCQUFoQixDQUFkLEVBVFE7SUFBQSxDQW5CVjtBQUFBLElBOEJBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLGFBQUEsQ0FBQSxDQUFBLENBQUE7YUFDQSxlQUFBLENBQUEsRUFGVTtJQUFBLENBOUJaO0dBSEYsQ0FBQTs7QUFBQSxFQXVDQSxXQUFBLEdBQWMsU0FBQyxlQUFELEdBQUE7QUFDWixJQUFBLElBQUcsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsZUFBakIsQ0FBSDthQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBWCxHQUFzQixFQUFBLEdBQUcsZUFBSCxHQUFtQixLQUQzQztLQUFBLE1BRUssSUFBRyxlQUFBLEtBQW1CLE1BQXRCO2FBQ0gsYUFBQSxDQUFBLEVBREc7S0FITztFQUFBLENBdkNkLENBQUE7O0FBQUEsRUE2Q0EsYUFBQSxHQUFnQixTQUFBLEdBQUE7V0FDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVgsR0FBc0IsR0FEUjtFQUFBLENBN0NoQixDQUFBOztBQUFBLEVBa0RBLGFBQUEsR0FBZ0IsU0FBQyxVQUFELEdBQUE7V0FDZCxJQUFJLENBQUMsWUFBTCxDQUFrQiwrQkFBbEIsRUFBbUQsVUFBVSxDQUFDLFdBQVgsQ0FBQSxDQUFuRCxFQURjO0VBQUEsQ0FsRGhCLENBQUE7O0FBQUEsRUFxREEsZUFBQSxHQUFrQixTQUFBLEdBQUE7V0FDaEIsSUFBSSxDQUFDLGVBQUwsQ0FBcUIsK0JBQXJCLEVBRGdCO0VBQUEsQ0FyRGxCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/nick/.atom/packages/two-light-ui/lib/main.coffee
