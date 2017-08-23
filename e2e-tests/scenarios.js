/* eslint-disable */

'use strict';

describe('Colorful Application', function() {

  it('should set `index.html` to `/`', function() {
    browser.get('index.html');
    expect(browser.getCurrentUrl()).toMatch('http://localhost:3000/');
  });

  describe('View: Main', function() {

    beforeEach(function() {
      browser.get('index.html');
    });

    it('should populate 100 colors from color options', function() {
      var colorList = element.all(by.repeater('color in $ctrl.colorPalette'));

      expect(colorList.count()).toBe(100);
    });

    describe('color palette background style', function() {

      var colorPalette = element(by.css('.color-palette'));
      var colors = element.all(by.css('.color-palette .color-box'));

      it('should revert to default after two clicks on the same color', function() {
        var defaultPaletteColor = colorPalette.getAttribute('style');
        expect(colorPalette.getAttribute('style')).toEqual(defaultPaletteColor);
        colors.get(0).click();
        expect(colorPalette.getAttribute('style')).not.toEqual(defaultPaletteColor);
        colors.get(0).click();
        expect(colorPalette.getAttribute('style')).toEqual(defaultPaletteColor);
      });

      it('should default to rgb(255,255,255)', function() {
        var defaultPaletteColor = colorPalette.getAttribute('style');
        expect(defaultPaletteColor).toMatch(/^background.+rgb.\d+.+\d+.+\d+.+$/);
      });

      it('should change to a linear-gradient after 5 colors are selected, rgba for 4 colors', function() {
        expect(colorPalette.getAttribute('style')).toMatch(/^background.+rgb.\d+.+\d+.+\d+.+$/);
        for(var i = 0; i < 5; i++) {
          colors.get(i).click();
        }
        expect(colorPalette.getAttribute('style'))
          .toMatch(/^background.+linear-gradient.+rgb.\d+.+\d+.+\d+.+rgb.\d+.+\d+.+\d+.+rgb.\d+.+\d+.+\d+.+rgb.\d+.+\d+.+\d+.+rgb.\d+.+\d+.+\d+.+$/);
        colors.get(4).click();
        expect(colorPalette.getAttribute('style')).toMatch(/background.+rgba.\d+.+\d+.+\d+.+/);
      });
    });


  });
});
