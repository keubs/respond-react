'use strict';

const config = require('../config');
const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc');

gulp.task('jsdoc', function() {
  return gulp.src([config.scripts.src, '!app/js/templates.js'])
    .pipe(jsdoc(config.docs.dest));
});
