module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      // Load angular and application dependencies
      'node_modules/angular/angular.js',

      // Load testing dependencies
      'node_modules/angular-mocks/angular-mocks.js',

      // Load the testable application
      'app/src/client/**/*.module.js',
      'app/src/client/**/*!(.module|.spec).js',

      // Load unit tests
      'app/src/**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    // phantomjsLauncher: {
    //   exitOnResourceError: true
    // },

    plugins: [
      'karma-chrome-launcher',
      // 'karma-firefox-launcher',
      // 'karma-phantomjs-launcher',
      'karma-jasmine'
    ]

  });
};
