'use strict';

const gulp   = require('gulp');
const gzip   = require('gulp-gzip');
const config = require('../config');

gulp.task('gzip', function() {

  return gulp.src(config.gzip.src)
    .pipe(gzip(config.gzip.options))
    .pipe(gulp.dest(config.gzip.dest));

});
