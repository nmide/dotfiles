(function() {
  var Animal, OPERATOR, grade, heredoc, hi, math, race, square, two,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  grade = function(student, period, messages) {
    if (period == null) {
      period = (typeof b !== "undefined" && b !== null ? 7 : 6);
    }
    if (messages == null) {
      messages = {
        "A": "Excellent"
      };
    }
    if (student.excellentWork) {
      return "A+";
    } else if (student.okayStuff) {
      if (student.triedHard) {
        return "B";
      } else {
        return "B-";
      }
    } else {
      return "C";
    }
  };

  square = function(x) {
    return x * x;
  };

  two = function() {
    return 2;
  };

  math = {
    root: Math.sqrt,
    square: square,
    cube: function(x) {
      return x * square(x);
    }
  };

  race = function() {
    var runners, winner;
    winner = arguments[0], runners = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return print(winner, runners);
  };

  Animal = (function(_super) {
    __extends(Animal, _super);

    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.move = function(meters) {
      return alert(this.name + (" moved " + meters + "m."));
    };

    return Animal;

  })(Being);

  hi = function() {
  return [document.title, "Hello JavaScript"].join(": ");
};

  heredoc = "CoffeeScript subst test " + (0x8 + 0xf / 0x2 + ("nested string " + /\n/));


  /*
  CoffeeScript Compiler v1.2.0
  Released under the MIT License
   */

  OPERATOR = /^(?:[-=]>)/;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9saWdodC13YXZlcy1zeW50YXgvc3BlYy9jb2ZmZWVzY3JpcHQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsS0FBQSxHQUFRLFNBQUMsT0FBRCxFQUFVLE1BQVYsRUFBd0MsUUFBeEMsR0FBQTs7TUFBVSxTQUFPLENBQUksc0NBQUgsR0FBVyxDQUFYLEdBQWtCLENBQW5CO0tBQ3ZCOztNQUQ4QyxXQUFTO0FBQUEsUUFBQyxHQUFBLEVBQUssV0FBTjs7S0FDdkQ7QUFBQSxJQUFBLElBQUcsT0FBTyxDQUFDLGFBQVg7YUFDRSxLQURGO0tBQUEsTUFFSyxJQUFHLE9BQU8sQ0FBQyxTQUFYO0FBQ0gsTUFBQSxJQUFHLE9BQU8sQ0FBQyxTQUFYO2VBQTBCLElBQTFCO09BQUEsTUFBQTtlQUFtQyxLQUFuQztPQURHO0tBQUEsTUFBQTthQUdILElBSEc7S0FIQztFQUFBLENBQVIsQ0FBQTs7QUFBQSxFQVFBLE1BQUEsR0FBUyxTQUFDLENBQUQsR0FBQTtXQUFPLENBQUEsR0FBSSxFQUFYO0VBQUEsQ0FSVCxDQUFBOztBQUFBLEVBVUEsR0FBQSxHQUFNLFNBQUEsR0FBQTtXQUFHLEVBQUg7RUFBQSxDQVZOLENBQUE7O0FBQUEsRUFZQSxJQUFBLEdBQ0U7QUFBQSxJQUFBLElBQUEsRUFBUSxJQUFJLENBQUMsSUFBYjtBQUFBLElBQ0EsTUFBQSxFQUFRLE1BRFI7QUFBQSxJQUVBLElBQUEsRUFBUSxTQUFDLENBQUQsR0FBQTthQUFPLENBQUEsR0FBSSxNQUFBLENBQU8sQ0FBUCxFQUFYO0lBQUEsQ0FGUjtHQWJGLENBQUE7O0FBQUEsRUFpQkEsSUFBQSxHQUFPLFNBQUEsR0FBQTtBQUNMLFFBQUEsZUFBQTtBQUFBLElBRE0sdUJBQVEsaUVBQ2QsQ0FBQTtXQUFBLEtBQUEsQ0FBTSxNQUFOLEVBQWMsT0FBZCxFQURLO0VBQUEsQ0FqQlAsQ0FBQTs7QUFBQSxFQW9CTTtBQUNKLDZCQUFBLENBQUE7O0FBQWEsSUFBQSxnQkFBRSxJQUFGLEdBQUE7QUFBUyxNQUFSLElBQUMsQ0FBQSxPQUFBLElBQU8sQ0FBVDtJQUFBLENBQWI7O0FBQUEscUJBRUEsSUFBQSxHQUFNLFNBQUMsTUFBRCxHQUFBO2FBQ0osS0FBQSxDQUFNLElBQUMsQ0FBQSxJQUFELEdBQVEsQ0FBQyxTQUFBLEdBQVMsTUFBVCxHQUFnQixJQUFqQixDQUFkLEVBREk7SUFBQSxDQUZOLENBQUE7O2tCQUFBOztLQURtQixNQXBCckIsQ0FBQTs7QUFBQSxFQTBCQSxFQUFBLEdBQUs7O0NBMUJMLENBQUE7O0FBQUEsRUE4QkEsT0FBQSxHQUNBLDBCQUFBLEdBQXlCLENBQXhCLEdBQUEsR0FBUSxHQUFBLEdBQU0sR0FBZCxHQUFxQixDQUFDLGdCQUFBLEdBQXRCLElBQXFCLENBQUcsQ0EvQnpCLENBQUE7O0FBa0NBO0FBQUE7OztLQWxDQTs7QUFBQSxFQXVDQSxRQUFBLEdBQVcsWUF2Q1gsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/nick/.atom/packages/light-waves-syntax/spec/coffeescript.coffee
