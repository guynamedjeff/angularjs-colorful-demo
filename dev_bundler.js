/* eslint-disable */

global.$ = require('jquery');
const angular = require('angular');
const bootstrap = require('angular-ui-bootstrap');
const uiRouter = require('@uirouter/angularjs');
const angularAnimate = require('angular-animate');
const angularResource = require('angular-resource');

// // Add bootstrap styles
const cssify = require('cssify');
cssify.byUrl('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
