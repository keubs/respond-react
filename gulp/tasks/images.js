'use strict';

const config      = require('../config');
const changed     = require('gulp-changed');
const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const imagemin    = require('gulp-imagemin');
const browserSync = require('browser-sync');

gulp.task('images', function() {

  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(gulpif(global.isProd, imagemin())) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));

});
