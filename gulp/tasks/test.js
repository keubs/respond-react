'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('test', ['server'], function() {

  return runSequence('unit', 'protractor');

});
