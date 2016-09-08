(function() {
  var root, setFontSize, setLayoutMode, unsetFontSize, unsetLayoutMode;

  root = document.documentElement;

  module.exports = {
    activate: function(state) {
      atom.config.observe('glacier-dark-ui.fontSize', function(value) {
        return setFontSize(value);
      });
      return atom.config.observe('glacier-dark-ui.layoutMode', function(value) {
        return setLayoutMode(value);
      });
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
    return root.setAttribute('theme-glacier-dark-ui-layoutmode', layoutMode.toLowerCase());
  };

  unsetLayoutMode = function() {
    return root.removeAttribute('theme-glacier-dark-ui-layoutmode');
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9nbGFjaWVyLWRhcmstdWkvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdFQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLFFBQVEsQ0FBQyxlQUFoQixDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsMEJBQXBCLEVBQWdELFNBQUMsS0FBRCxHQUFBO2VBQzlDLFdBQUEsQ0FBWSxLQUFaLEVBRDhDO01BQUEsQ0FBaEQsQ0FBQSxDQUFBO2FBR0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLDRCQUFwQixFQUFrRCxTQUFDLEtBQUQsR0FBQTtlQUNoRCxhQUFBLENBQWMsS0FBZCxFQURnRDtNQUFBLENBQWxELEVBSlE7SUFBQSxDQUFWO0FBQUEsSUFPQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxhQUFBLENBQUEsQ0FBQSxDQUFBO2FBQ0EsZUFBQSxDQUFBLEVBRlU7SUFBQSxDQVBaO0dBSEYsQ0FBQTs7QUFBQSxFQWVBLFdBQUEsR0FBYyxTQUFDLGVBQUQsR0FBQTtBQUNaLElBQUEsSUFBRyxNQUFNLENBQUMsU0FBUCxDQUFpQixlQUFqQixDQUFIO2FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFYLEdBQXNCLEVBQUEsR0FBRyxlQUFILEdBQW1CLEtBRDNDO0tBQUEsTUFFSyxJQUFHLGVBQUEsS0FBbUIsTUFBdEI7YUFDSCxhQUFBLENBQUEsRUFERztLQUhPO0VBQUEsQ0FmZCxDQUFBOztBQUFBLEVBcUJBLGFBQUEsR0FBZ0IsU0FBQSxHQUFBO1dBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFYLEdBQXNCLEdBRFI7RUFBQSxDQXJCaEIsQ0FBQTs7QUFBQSxFQXlCQSxhQUFBLEdBQWdCLFNBQUMsVUFBRCxHQUFBO1dBQ2QsSUFBSSxDQUFDLFlBQUwsQ0FBa0Isa0NBQWxCLEVBQXNELFVBQVUsQ0FBQyxXQUFYLENBQUEsQ0FBdEQsRUFEYztFQUFBLENBekJoQixDQUFBOztBQUFBLEVBNEJBLGVBQUEsR0FBa0IsU0FBQSxHQUFBO1dBQ2hCLElBQUksQ0FBQyxlQUFMLENBQXFCLGtDQUFyQixFQURnQjtFQUFBLENBNUJsQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/glacier-dark-ui/lib/main.coffee
