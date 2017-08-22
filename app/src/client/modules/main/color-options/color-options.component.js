(function() {
  angular
    .module('colorOptions')
    .component('colorOptions', {
      templateUrl: 'modules/main/color-options/color-options.template.html',
      controller: function ColorOptionsController() {
        // Set defaults.
        this.colorPalette = [];
        this.favoriteColors = [];
        this.favoriteColor = 'rgb(255,255,255)';
        this.maxColors = 5;
        this.maxSelections = false;
        this.count = 0;

        // Generates 100 colors and pushes them to the colorPalette array.
        this.$onInit = () => {
          for (var i = 0; i < 100; i++) {
            this.colorPalette.push(this.generateColor());
          }
        };

        // Returns a number between 0 and 256.
        this.generateRgbValue = () => {
          return Math.floor(Math.random() * 256);
        };

        // Returns an rgb color string.
        this.generateColor = () => {
          let red = this.generateRgbValue();
          let blue = this.generateRgbValue();
          let green = this.generateRgbValue();
          return red + ',' + blue + ',' + green;
        };

        // Adds a color to the favorite colors array and computes the background.
        this.addColor = (color) => {
          if (!this.maxSelection) {
            this.favoriteColors.push(color);
            this.count++;
          }
          this.maxSelections = (this.count !== this.maxColors) ? false : true;
          this.computeBackground();
        };

        // Removes a color from the favorite colors array and computes the background.
        this.removeColor = (color) => {
          for (let i = this.favoriteColors.length - 1; i >= 0; i--) {
            if (this.favoriteColors[i] === color) {
              this.favoriteColors.splice(i, 1);
              break;
            }
          }
          this.count--;
          this.maxSelections = (this.count !== this.maxColors) ? false : true;
          this.computeBackground();
        };

        // Returns the average RGB values of the favoriteColors array.
        this.computeBackground = () => {
          if (this.favoriteColors.length === 0) {
            return this.favoriteColor = 'rgb(255,255,255)';
          }
          if (this.favoriteColors.length === 5) {
            return this.buildColorGradient();
          }
          let [red, blue, green] = [0, 0, 0];
          for (let i = 0; i <= this.favoriteColors.length - 1; i++) {
            let segments = this.favoriteColors[i].split(',');
            red =+ parseInt(segments[0]);
            blue += parseInt(segments[1]);
            green += parseInt(segments[2]);
          }
          let newRed = Math.floor(red/this.favoriteColors.length);
          let newBlue = Math.floor(blue/this.favoriteColors.length);
          let newGreen = Math.floor(green/this.favoriteColors.length);
          this.favoriteColor = 'rgba(' + newRed + ',' + newBlue + ',' + newGreen + ',0.2)';
        };

        // Returns a linear gradient if five colors are chosen.
        this.buildColorGradient = () => {
          let linearGradient = 'linear-gradient(45deg,';
          for (let i = 0; i <= this.favoriteColors.length - 1; i++) {
            let shade = 'rgb(' + this.favoriteColors[i] + '),';
            linearGradient = linearGradient + shade;
          }
          this.favoriteColor = linearGradient.toString().substring(',', linearGradient.toString().length - 1) + ')';
        };
      }
    });
})();
