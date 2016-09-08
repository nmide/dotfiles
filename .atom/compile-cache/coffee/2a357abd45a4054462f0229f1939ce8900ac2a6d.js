(function() {
  describe("Two Light UI theme", function() {
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('two-light-ui');
      });
    });
    it("allows the font size to be set via config", function() {
      expect(document.documentElement.style.fontSize).toBe('');
      atom.config.set('two-light-ui.fontSize', '10');
      expect(document.documentElement.style.fontSize).toBe('10px');
      atom.config.set('two-light-ui.fontSize', 'Auto');
      return expect(document.documentElement.style.fontSize).toBe('');
    });
    return it("allows the layout mode to be set via config", function() {
      expect(document.documentElement.getAttribute('theme-two-light-ui-layoutmode')).toBe('auto');
      atom.config.set('two-light-ui.layoutMode', 'Spacious');
      return expect(document.documentElement.getAttribute('theme-two-light-ui-layoutmode')).toBe('spacious');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy90d28tbGlnaHQtdWkvc3BlYy90aGVtZS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsb0JBQVQsRUFBK0IsU0FBQSxHQUFBO0FBQzdCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGNBQTlCLEVBRGM7TUFBQSxDQUFoQixFQURTO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQUlBLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBLEdBQUE7QUFDOUMsTUFBQSxNQUFBLENBQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBdEMsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxFQUFyRCxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsRUFBeUMsSUFBekMsQ0FGQSxDQUFBO0FBQUEsTUFHQSxNQUFBLENBQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBdEMsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxNQUFyRCxDQUhBLENBQUE7QUFBQSxNQUtBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1QkFBaEIsRUFBeUMsTUFBekMsQ0FMQSxDQUFBO2FBTUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQXRDLENBQStDLENBQUMsSUFBaEQsQ0FBcUQsRUFBckQsRUFQOEM7SUFBQSxDQUFoRCxDQUpBLENBQUE7V0FhQSxFQUFBLENBQUcsNkNBQUgsRUFBa0QsU0FBQSxHQUFBO0FBQ2hELE1BQUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBekIsQ0FBc0MsK0JBQXRDLENBQVAsQ0FBOEUsQ0FBQyxJQUEvRSxDQUFvRixNQUFwRixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5QkFBaEIsRUFBMkMsVUFBM0MsQ0FGQSxDQUFBO2FBR0EsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBekIsQ0FBc0MsK0JBQXRDLENBQVAsQ0FBOEUsQ0FBQyxJQUEvRSxDQUFvRixVQUFwRixFQUpnRDtJQUFBLENBQWxELEVBZDZCO0VBQUEsQ0FBL0IsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/two-light-ui/spec/theme-spec.coffee
