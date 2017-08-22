(function() {
  angular
    .module('color')
    .component('color', {
      transclude: true,
      bindings: {
        color: '<',
        maxSelections: '<',
        addColor: '&',
        removeColor: '&'
      },
      templateUrl: 'modules/main/color-options/color/color.template.html',
      controller: ['$window', function ColorController($window) {
        // Selects/deselects a given color on click.
        this.toggleSelect = () => {
          if (!this.isSelected && !this.maxSelections) {
            this.isSelected = true;
            return this.addColor({color: this.color});
          }
          if (this.isSelected) {
            this.isSelected = false;
            this.removeColor({color: this.color});
          } else {
            $window.alert('Hey, I said pick only five.');
          }
        };
      }]
    });
})();
