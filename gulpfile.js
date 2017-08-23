const gulp = require('gulp');
const del = require('del');

// Stylings
const sass = require('gulp-sass');
// const minifycss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');

// Minification
const minifyHTML = require('gulp-minify-html');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Server
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');

// JS
// const sourcemaps = require('gulp-sourcemaps');
const ngAnnotate = require('gulp-ng-annotate');
const babel = require('gulp-babel');

// Paths
const src = {
  scss: './app/src/client/static/styles/sass/**/*.scss',
  css: './app/css',
  html: './app/src/client/**/*.html',
  js: './app/src/client/modules/**/*.js',
  specjs: '!./app/src/client/modules/**/*spec.js',
  modules: './app/src/client/modules/**/*.module.js',
  nodejs: './app/src/server/**/*.js',
  staticImages: './app/src/client/static/images/*.ico',
  staticBundle: './app/src/client/static/bundle.js'
};

// Clean
gulp.task('clean', function() {
  return del.sync('./app/build');
});

// Copy
gulp.task('nodeCopy', function() {
  gulp.src(src.nodejs).pipe(gulp.dest('./app/build/server')).pipe(reload({stream: true}));
});

gulp.task('imageCopy', function() {
  gulp.src(src.staticImages).pipe(gulp.dest('./app/build/client/static/images/'));
});

gulp.task('dependenciesCopy', function() {
  gulp.src(src.staticBundle).pipe(gulp.dest('./app/build/client/static/'));
});

// Handle HTML
gulp.task('html', function() {
  gulp.src(src.html).pipe(minifyHTML()).pipe(gulp.dest('./app/build/client'));
});

// Handle scripts.
gulp.task('js', function() {
  gulp.src([src.modules, src.js, src.specjs])
  // .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015']})).pipe(concat('./app/build/client/static/app.js')).pipe(ngAnnotate()).pipe(uglify())
  // .pipe(sourcemaps.write())
    .pipe(gulp.dest('.')).pipe(reload({stream: true}));
});

// Handle stylings.
gulp.task('sass', function() {
  gulp.src(src.scss).pipe(sass().on('error', sass.logError)).pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false})).pipe(gulp.dest('./app/build/client/static/styles'))
  // .pipe(minifycss())
  // .pipe(gulp.dest('app/src/client/static/styles/prod'));
    .pipe(reload({stream: true}));
});

// Serve application
gulp.task('nodemon', function(cb) {
  setTimeout(function() {
    let called = false;
    return nodemon({script: 'app/build/server/routes/main.js'}).on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    }).on('restart', function() {
      setTimeout(function() {
        reload({stream: false});
      }, 1000);
    });
  }, 1000);
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({proxy: 'localhost:5000', notify: true});
});

gulp.task('serve', [
  'clean',
  'nodeCopy',
  'imageCopy',
  'dependenciesCopy',
  'sass',
  'js',
  'html',
  'browser-sync'
], function() {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html, ['html']);
  gulp.watch(src.nodejs, ['copy']);
  gulp.watch(src.js, ['js']);
});
