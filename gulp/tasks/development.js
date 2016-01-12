'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['styles', 'images', 'fonts', 'views', 'lint', 'jscs', 'browserify'], 'watch', cb);

});
