(function() {
  describe("One Dark UI theme", function() {
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('one-dark-ui');
      });
    });
    it("allows the font size to be set via config", function() {
      expect(document.documentElement.style.fontSize).toBe('');
      atom.config.set('one-dark-ui.fontSize', '10');
      expect(document.documentElement.style.fontSize).toBe('10px');
      atom.config.set('one-dark-ui.fontSize', 'Auto');
      return expect(document.documentElement.style.fontSize).toBe('');
    });
    return it("allows the layout mode to be set via config", function() {
      expect(document.documentElement.getAttribute('theme-one-dark-ui-layoutmode')).toBe('auto');
      atom.config.set('one-dark-ui.layoutMode', 'Spacious');
      return expect(document.documentElement.getAttribute('theme-one-dark-ui-layoutmode')).toBe('spacious');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9nbGFjaWVyLWRhcmstdWkvc3BlYy90aGVtZS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsbUJBQVQsRUFBOEIsU0FBQSxHQUFBO0FBQzVCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGFBQTlCLEVBRGM7TUFBQSxDQUFoQixFQURTO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQUlBLEVBQUEsQ0FBRywyQ0FBSCxFQUFnRCxTQUFBLEdBQUE7QUFDOUMsTUFBQSxNQUFBLENBQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBdEMsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxFQUFyRCxDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixzQkFBaEIsRUFBd0MsSUFBeEMsQ0FGQSxDQUFBO0FBQUEsTUFHQSxNQUFBLENBQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBdEMsQ0FBK0MsQ0FBQyxJQUFoRCxDQUFxRCxNQUFyRCxDQUhBLENBQUE7QUFBQSxNQUtBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixzQkFBaEIsRUFBd0MsTUFBeEMsQ0FMQSxDQUFBO2FBTUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQXRDLENBQStDLENBQUMsSUFBaEQsQ0FBcUQsRUFBckQsRUFQOEM7SUFBQSxDQUFoRCxDQUpBLENBQUE7V0FhQSxFQUFBLENBQUcsNkNBQUgsRUFBa0QsU0FBQSxHQUFBO0FBQ2hELE1BQUEsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBekIsQ0FBc0MsOEJBQXRDLENBQVAsQ0FBNkUsQ0FBQyxJQUE5RSxDQUFtRixNQUFuRixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3QkFBaEIsRUFBMEMsVUFBMUMsQ0FGQSxDQUFBO2FBR0EsTUFBQSxDQUFPLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBekIsQ0FBc0MsOEJBQXRDLENBQVAsQ0FBNkUsQ0FBQyxJQUE5RSxDQUFtRixVQUFuRixFQUpnRDtJQUFBLENBQWxELEVBZDRCO0VBQUEsQ0FBOUIsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/glacier-dark-ui/spec/theme-spec.coffee
