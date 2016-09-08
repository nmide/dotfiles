(function() {
  describe("One Light UI theme", function() {
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('light-bint-ui');
      });
    });
    it("allows the font size to be set via config", function() {
      expect(document.documentElement.style.fontSize).toBe('');
      atom.config.set('light-bint-ui.fontSize', '10');
      expect(document.documentElement.style.fontSize).toBe('10px');
      atom.config.set('light-bint-ui.fontSize', 'Auto');
      return expect(document.documentElement.style.fontSize).toBe('');
    });
    return it("allows the layout mode to be set via config", function() {
      expect(document.documentElement.getAttribute('theme-light-bint-ui-layoutmode')).toBe('auto');
      atom.config.set('light-bint-ui.layoutMode', 'Spacious');
      return expect(document.documentElement.getAttribute('theme-light-bint-ui-layoutmode')).toBe('spacious');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9saWdodC1iaW50LXVpL3NwZWMvdGhlbWUtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTtBQUM3QixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7YUFDVCxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixlQUE5QixFQURjO01BQUEsQ0FBaEIsRUFEUztJQUFBLENBQVgsQ0FBQSxDQUFBO0FBQUEsSUFJQSxFQUFBLENBQUcsMkNBQUgsRUFBZ0QsU0FBQSxHQUFBO0FBQzlDLE1BQUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQXRDLENBQStDLENBQUMsSUFBaEQsQ0FBcUQsRUFBckQsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLEVBQTBDLElBQTFDLENBRkEsQ0FBQTtBQUFBLE1BR0EsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQXRDLENBQStDLENBQUMsSUFBaEQsQ0FBcUQsTUFBckQsQ0FIQSxDQUFBO0FBQUEsTUFLQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isd0JBQWhCLEVBQTBDLE1BQTFDLENBTEEsQ0FBQTthQU1BLE1BQUEsQ0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUF0QyxDQUErQyxDQUFDLElBQWhELENBQXFELEVBQXJELEVBUDhDO0lBQUEsQ0FBaEQsQ0FKQSxDQUFBO1dBYUEsRUFBQSxDQUFHLDZDQUFILEVBQWtELFNBQUEsR0FBQTtBQUNoRCxNQUFBLE1BQUEsQ0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQXpCLENBQXNDLGdDQUF0QyxDQUFQLENBQStFLENBQUMsSUFBaEYsQ0FBcUYsTUFBckYsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsMEJBQWhCLEVBQTRDLFVBQTVDLENBRkEsQ0FBQTthQUdBLE1BQUEsQ0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQXpCLENBQXNDLGdDQUF0QyxDQUFQLENBQStFLENBQUMsSUFBaEYsQ0FBcUYsVUFBckYsRUFKZ0Q7SUFBQSxDQUFsRCxFQWQ2QjtFQUFBLENBQS9CLENBQUEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/light-bint-ui/spec/theme-spec.coffee
