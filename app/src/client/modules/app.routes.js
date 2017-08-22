(function () {
  'use strict';
  // This is the routing configuration for the main application.
  angular
    .module('demoApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function config ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.rule(function($injector, $location) {
          // Normalize URL
          var path = $location.path();
          var normalized = path.toLowerCase();

          if (path !== normalized) {
            path = normalized;
          }

          // Correct URL for no trailing slashes.
          var hasTrailingSlash = path[path.length-1] !== '/';

          if(hasTrailingSlash) {
            // If last character is not slash, return the same url with the slash.
            return path + '/';
          }
        });

        $urlRouterProvider.otherwise('/');



        $locationProvider.html5Mode(true);

        $stateProvider

        .state('main', {
          url: '/',
          component: 'main'
        });
      }
    ]);
})();
