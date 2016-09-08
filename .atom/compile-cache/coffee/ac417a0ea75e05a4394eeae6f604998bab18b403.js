(function() {
  describe('AsciiDoc preview', function() {
    var pack;
    pack = null;
    beforeEach(function() {
      return waitsForPromise(function() {
        return atom.packages.activatePackage('asciidoc-preview').then(function(p) {
          return pack = p;
        });
      });
    });
    return it('should load the package', function() {
      return expect(pack.name).toBe('asciidoc-preview');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hc2NpaWRvYy1wcmV2aWV3L3NwZWMvYWNzaWlkb2MtcHJldmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsa0JBQVQsRUFBNkIsU0FBQSxHQUFBO0FBQzNCLFFBQUEsSUFBQTtBQUFBLElBQUEsSUFBQSxHQUFPLElBQVAsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTthQUNULGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLGtCQUE5QixDQUNFLENBQUMsSUFESCxDQUNRLFNBQUMsQ0FBRCxHQUFBO2lCQUNKLElBQUEsR0FBTyxFQURIO1FBQUEsQ0FEUixFQURjO01BQUEsQ0FBaEIsRUFEUztJQUFBLENBQVgsQ0FGQSxDQUFBO1dBUUEsRUFBQSxDQUFHLHlCQUFILEVBQThCLFNBQUEsR0FBQTthQUM1QixNQUFBLENBQU8sSUFBSSxDQUFDLElBQVosQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixrQkFBdkIsRUFENEI7SUFBQSxDQUE5QixFQVQyQjtFQUFBLENBQTdCLENBQUEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/asciidoc-preview/spec/acsiidoc-preview-spec.coffee
