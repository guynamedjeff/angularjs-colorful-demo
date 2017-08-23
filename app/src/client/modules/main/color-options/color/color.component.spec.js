/* eslint-disable */

'use strict';

describe('color component', function() {
  beforeEach(module('color'));

  describe('ColorController', function() {
    var ctrl;

    beforeEach(inject(function($componentController) {
      ctrl = $componentController('color');
    }));

    // Tests color component's toggleSelect() function.
    it('should add a color', function() {
      expect(ctrl.isSelected).toBeUndefined();
      ctrl.addColor = function(color){};
      ctrl.toggleSelect();
      expect(ctrl.isSelected).toBeTruthy();
    });

    it('should remove a color', function() {
      expect(ctrl.isSelected).toBeUndefined();
      ctrl.isSelected = true;
      expect(ctrl.isSelected).toBeTruthy();
      ctrl.removeColor = function(color){};
      ctrl.toggleSelect();
      expect(ctrl.isSelected).toBeFalsy();
    });
  });
});
