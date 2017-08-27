module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      // Load angular and application dependencies
      'node_modules/angular/angular.js',
      'node_modules/@uirouter/angularjs/release/ui-router-angularjs.js',

      // Load testing dependencies
      'node_modules/angular-mocks/angular-mocks.js',

      // Load the testable application
      'app/src/client/**/*.module.js',
      'app/src/client/**/*!(.module|.spec).js',

      'app/src/client/**/*.template.html',

      // Load unit tests
      'app/src/**/*.spec.js'
    ],

    preprocessors: {
      'app/src/**/*.html': ['ng-html2js'],
      'app/src/**/!(*.mock|*.spec).js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/src/client/',
      // create a single module that contains templates from all the files
      moduleName: 'test-templates'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type : 'html',
      // output coverage reports
      dir : 'coverage/'
    },

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    // phantomjsLauncher: {
    //   exitOnResourceError: true
    // },

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      // 'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage'
    ]

  });
};
