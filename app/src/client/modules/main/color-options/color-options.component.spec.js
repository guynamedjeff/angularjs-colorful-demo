/* eslint-disable */

'use strict';

describe('Color Options Component', function() {
  beforeEach(module('colorOptions'));

  // Tests the component's controller.
  describe('Color Options Controller', function() {
    var ctrl;

    // Instantiates the component's controller.
    beforeEach(inject(function($componentController) {
      ctrl = $componentController('colorOptions');
    }));

    // Tests the component's controller for correct defaults.
    describe('Color Options Controller Defaults', function() {
      it('should default colorPalette to an empty array', function() {
        expect(ctrl.colorPalette).toEqual([]);
      });

      it('should default favoriteColors to an empty array', function() {
        expect(ctrl.favoriteColors).toEqual([]);
      });

      it('should default favoriteColor to rgb(255,255,255)', function() {
        expect(ctrl.favoriteColor).toEqual('rgb(255,255,255)');
      });

      it('should default maxColor to 5', function() {
        expect(ctrl.maxColors).toBe(5);
      });

      it('should default maxSeelections to false', function() {
        expect(ctrl.maxSelections).toBeFalsy();
      });

      it('should default count to 0', function() {
        expect(ctrl.count).toBe(0);
      });
    });

    // Tests the component's controller for correct function outcomes.
    describe('Color Options Controller Function Tests', function(){
      // Tests $onInit prepopulation of color palette.
      it('should populate 100 colors', function() {
        expect(ctrl.colorPalette).toEqual([]);
        ctrl.$onInit();
        expect(ctrl.colorPalette.length).toBe(100);
      });

      // Tests function generateRgbValue().
      it('should return a random number below 256', function() {
        var someNumber = ctrl.generateRgbValue();
        expect(someNumber).not.toBeLessThan(0);
        expect(someNumber).not.toBeGreaterThan(256);
      });

      // Tests function generateColor().
      it('should return an string of rgb numbers.', function() {
        var someString = ctrl.generateColor();
        expect(someString.length).toBeLessThan(12);
        expect(someString.length).toBeGreaterThan(4);
        expect(someString).toMatch(/^\d+,\d+,\d+$/);
      });

      // Tests function addColor().
      describe('tests the add color function', function() {

        it('should increment the counter after adding a color', function() {
          expect(ctrl.count).toBe(0);
          ctrl.addColor('255,255,255');
          expect(ctrl.count).toBe(1);
        });

        it('should add a color to the favoriteColors array', function() {
          expect(ctrl.favoriteColors.length).toBe(0);
          ctrl.addColor('255,255,255');
          expect(ctrl.favoriteColors.length).toBe(1);
          expect(ctrl.favoriteColors).toContain('255,255,255');
        });

        it('should not add a color', function() {
          ctrl.maxSelections = true;
          ctrl.addColor('255,255,255');
          expect(ctrl.favoriteColors).not.toContain('255,255,255');
        });

        it('should change the maxSelections variable from false to true', function() {
          ctrl.count = 4;
          expect(ctrl.maxSelections).toBeFalsy();
          ctrl.addColor('255,255,255');
          expect(ctrl.maxSelections).toBeTruthy();
        });
      });


      // Tests function removeColor().
      describe('tests the remove color function', function() {

        beforeEach(function() {
          ctrl.favoriteColors = ['255,255,255'];
        });

        it('should decrement the counter after removing a color', function() {
          ctrl.count = 1;
          ctrl.removeColor('255,255,255');
          expect(ctrl.count).toBe(0);
        });

        it('should remove a color from the favoriteColors array', function() {
          expect(ctrl.favoriteColors.length).toBe(1);
          ctrl.removeColor('255,255,255');
          expect(ctrl.favoriteColors.length).toBe(0);
        });

        it('should change the maxSelections variable from true to false', function() {
          ctrl.maxSelections = true;
          ctrl.count = 5;
          expect(ctrl.maxSelections).toBeTruthy();
          ctrl.removeColor('255,255,255');
          expect(ctrl.maxSelections).toBeFalsy();
        });
      });

      describe('tests color options controller functions that impact the favorite color variable', function() {

        // Tests function computeBackground().
        it('should change the favorite color to an rgba string', function() {
          expect(ctrl.favoriteColor).toEqual('rgb(255,255,255)');
          ctrl.favoriteColors = ['244,244,244'];
          ctrl.computeBackground();
          expect(ctrl.favoriteColor).toEqual('rgba(244,244,244,0.2)');
        });

        it('should not change the favorite color to an rgba string', function() {
          expect(ctrl.favoriteColor).toEqual('rgb(255,255,255)');
          ctrl.favoriteColors = ['244,244,244','244,244,244','244,244,244','244,244,244'];
          ctrl.computeBackground();
          expect(ctrl.favoriteColor).not.toEqual('rgba(244,244,244,0.2)');
        });

        // Tests function buildColorGradient().
        it('should change the favorite color from an rgba to a linear gradient string.', function() {
          expect(ctrl.favoriteColor).toEqual('rgb(255,255,255)');
          ctrl.favoriteColors = ['244,244,244','244,244,244','244,244,244','244,244,244','244,244,244'];
          ctrl.buildColorGradient();
          expect(ctrl.favoriteColor).toEqual('linear-gradient(45deg,rgb(244,244,244),rgb(244,244,244),rgb(244,244,244),rgb(244,244,244),rgb(244,244,244))');
        });
      });
    });
  });
});
