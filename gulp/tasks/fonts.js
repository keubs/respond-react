'use strict';

const config      = require('../config');
const changed     = require('gulp-changed');
const gulp        = require('gulp');
const gulpif      = require('gulp-if');
const browserSync = require('browser-sync');

gulp.task('fonts', function() {

  return gulp.src(config.fonts.src)
    .pipe(changed(config.fonts.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({stream: true, once: true})));

});
