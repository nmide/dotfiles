(function() {
  var ScriptOptions;

  ScriptOptions = require('../lib/script-options');

  describe('ScriptOptions', function() {
    beforeEach(function() {
      this.scriptOptions = new ScriptOptions();
      this.dummyEnv = {
        SCRIPT_CI: 'true',
        SCRIPT_ENV: 'test',
        _NUMBERS: '123'
      };
      return this.dummyEnvString = "SCRIPT_CI=true;SCRIPT_ENV='test';_NUMBERS=\"123\"";
    });
    describe('getEnv', function() {
      it('should default to an empty env object', function() {
        var env;
        env = this.scriptOptions.getEnv();
        return expect(env).toEqual({});
      });
      return it('should parse a custom user environment', function() {
        var env;
        this.scriptOptions.env = this.dummyEnvString;
        env = this.scriptOptions.getEnv();
        return expect(env).toEqual;
      });
    });
    return describe('mergedEnv', function() {
      it('should default to the orignal env object', function() {
        var mergedEnv;
        mergedEnv = this.scriptOptions.mergedEnv(this.dummyEnv);
        return expect(mergedEnv).toEqual(this.dummyEnv);
      });
      it('should retain the original environment', function() {
        var mergedEnv;
        this.scriptOptions.env = "TEST_VAR_1=one;TEST_VAR_2=\"two\";TEST_VAR_3='three'";
        mergedEnv = this.scriptOptions.mergedEnv(this.dummyEnv);
        expect(mergedEnv.SCRIPT_CI).toEqual('true');
        expect(mergedEnv.SCRIPT_ENV).toEqual('test');
        expect(mergedEnv._NUMBERS).toEqual('123');
        expect(mergedEnv.TEST_VAR_1).toEqual('one');
        expect(mergedEnv.TEST_VAR_2).toEqual('two');
        return expect(mergedEnv.TEST_VAR_3).toEqual('three');
      });
      return it('should support special character values', function() {
        var mergedEnv;
        this.scriptOptions.env = "TEST_VAR_1=o-n-e;TEST_VAR_2=\"nested\\\"doublequotes\\\"\";TEST_VAR_3='nested\\\'singlequotes\\\'';TEST_VAR_4='s p a c e s'";
        mergedEnv = this.scriptOptions.mergedEnv(this.dummyEnv);
        expect(mergedEnv.TEST_VAR_1).toEqual('o-n-e');
        expect(mergedEnv.TEST_VAR_2).toEqual("nested\\\"doublequotes\\\"");
        expect(mergedEnv.TEST_VAR_3).toEqual("nested\\\'singlequotes\\\'");
        return expect(mergedEnv.TEST_VAR_4).toEqual('s p a c e s');
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9zY3JpcHQvc3BlYy9zY3JpcHQtb3B0aW9ucy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxhQUFBOztBQUFBLEVBQUEsYUFBQSxHQUFnQixPQUFBLENBQVEsdUJBQVIsQ0FBaEIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxlQUFULEVBQTBCLFNBQUEsR0FBQTtBQUN4QixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUMsQ0FBQSxhQUFELEdBQXFCLElBQUEsYUFBQSxDQUFBLENBQXJCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELEdBQ0U7QUFBQSxRQUFBLFNBQUEsRUFBVyxNQUFYO0FBQUEsUUFDQSxVQUFBLEVBQVksTUFEWjtBQUFBLFFBRUEsUUFBQSxFQUFVLEtBRlY7T0FGRixDQUFBO2FBS0EsSUFBQyxDQUFBLGNBQUQsR0FBa0Isb0RBTlQ7SUFBQSxDQUFYLENBQUEsQ0FBQTtBQUFBLElBUUEsUUFBQSxDQUFTLFFBQVQsRUFBbUIsU0FBQSxHQUFBO0FBQ2pCLE1BQUEsRUFBQSxDQUFHLHVDQUFILEVBQTRDLFNBQUEsR0FBQTtBQUMxQyxZQUFBLEdBQUE7QUFBQSxRQUFBLEdBQUEsR0FBTSxJQUFDLENBQUEsYUFBYSxDQUFDLE1BQWYsQ0FBQSxDQUFOLENBQUE7ZUFDQSxNQUFBLENBQU8sR0FBUCxDQUFXLENBQUMsT0FBWixDQUFvQixFQUFwQixFQUYwQztNQUFBLENBQTVDLENBQUEsQ0FBQTthQUlBLEVBQUEsQ0FBRyx3Q0FBSCxFQUE2QyxTQUFBLEdBQUE7QUFDM0MsWUFBQSxHQUFBO0FBQUEsUUFBQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsR0FBcUIsSUFBQyxDQUFBLGNBQXRCLENBQUE7QUFBQSxRQUNBLEdB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

//# sourceURL=/home/nick/.atom/packages/script/spec/script-options-spec.coffee