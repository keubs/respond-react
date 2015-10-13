'use strict';

const config = require('../config');
const gulp = require('gulp');
const jscs = require('gulp-jscs');

gulp.task('jscs', function() {
  return gulp.src([config.scripts.src, '!app/js/templates.js'])
    .pipe(jscs())
    .pipe(jscs.reporter());
});
