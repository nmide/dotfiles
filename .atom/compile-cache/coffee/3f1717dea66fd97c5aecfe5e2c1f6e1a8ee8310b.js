(function() {
  var AtomPhpNavigationView;

  module.exports = AtomPhpNavigationView = (function() {
    function AtomPhpNavigationView(serializedState) {
      var loading, message;
      this.element = document.createElement('div');
      this.element.classList.add('atom-php-navigation');
      message = document.createElement('div');
      message.textContent = "Indexation: please wait!";
      message.classList.add('message');
      loading = document.createElement('span');
      loading.classList.add('loading');
      message.appendChild(loading);
      this.element.appendChild(message);
    }

    AtomPhpNavigationView.prototype.serialize = function() {};

    AtomPhpNavigationView.prototype.destroy = function() {
      return this.element.remove();
    };

    AtomPhpNavigationView.prototype.getElement = function() {
      return this.element;
    };

    return AtomPhpNavigationView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9hdG9tLXBocC1uYXZpZ2F0aW9uL2xpYi9hdG9tLXBocC1uYXZpZ2F0aW9uLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsK0JBQUMsZUFBRCxHQUFBO0FBRVgsVUFBQSxnQkFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUFYLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQW5CLENBQXVCLHFCQUF2QixDQURBLENBQUE7QUFBQSxNQUlBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUpWLENBQUE7QUFBQSxNQUtBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLDBCQUx0QixDQUFBO0FBQUEsTUFNQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQWxCLENBQXNCLFNBQXRCLENBTkEsQ0FBQTtBQUFBLE1BUUEsT0FBQSxHQUFVLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLENBUlYsQ0FBQTtBQUFBLE1BU0EsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFsQixDQUFzQixTQUF0QixDQVRBLENBQUE7QUFBQSxNQVVBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLE9BQXBCLENBVkEsQ0FBQTtBQUFBLE1BWUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULENBQXFCLE9BQXJCLENBWkEsQ0FGVztJQUFBLENBQWI7O0FBQUEsb0NBaUJBLFNBQUEsR0FBVyxTQUFBLEdBQUEsQ0FqQlgsQ0FBQTs7QUFBQSxvQ0FvQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFBLEVBRE87SUFBQSxDQXBCVCxDQUFBOztBQUFBLG9DQXVCQSxVQUFBLEdBQVksU0FBQSxHQUFBO2FBQ1YsSUFBQyxDQUFBLFFBRFM7SUFBQSxDQXZCWixDQUFBOztpQ0FBQTs7TUFGRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/nick/.atom/packages/atom-php-navigation/lib/atom-php-navigation-view.coffee
