'use strict';

const config = require('../config');
const gulp   = require('gulp');
const rimraf    = require('gulp-rimraf');

gulp.task('clean', function() {
  return gulp.src([config.dist.root], {read: false})
    .pipe(rimraf());

});
