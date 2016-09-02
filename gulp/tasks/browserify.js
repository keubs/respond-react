'use strict';

const config       = require('../config');
const gulp         = require('gulp');
const gulpif       = require('gulp-if');
const gutil        = require('gulp-util');
const source       = require('vinyl-source-stream');
const sourcemaps   = require('gulp-sourcemaps');
const buffer       = require('vinyl-buffer');
const streamify    = require('gulp-streamify');
const watchify     = require('watchify');
const browserify   = require('browserify');
const babelify     = require('babelify');
const uglify       = require('gulp-uglify');
const handleErrors = require('../util/handleErrors');
const browserSync  = require('browser-sync');
const debowerify   = require('debowerify');
const ngAnnotate   = require('browserify-ngannotate');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

  let bundler = browserify({
    entries: config.browserify.entries,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
  }, watchify.args);

  if (!global.isProd) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      rebundle();
    });
  }

  const transforms = [
    babelify,
    debowerify,
    ngAnnotate,
    'brfs',
    'bulkify',
  ];

  transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  function rebundle() {
    const stream = bundler.bundle();
    const createSourcemap = global.isProd && config.browserify.sourcemap;

    gutil.log('Rebundle...');

    return stream.on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulpif(createSourcemap, buffer()))
      .pipe(gulpif(createSourcemap, sourcemaps.init()))
      // .pipe(gulpif(global.isProd, streamify(uglify({
      //   compress: {drop_console: true},
      // }))))
      .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(gulpif(browserSync.active, browserSync.reload({stream: true, once: true})));
  }

  return rebundle();

}

gulp.task('browserify', function() {

  return buildScript('main.js');

});
