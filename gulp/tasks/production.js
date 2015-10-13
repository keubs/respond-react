'use strict';

const gulp        = require('gulp');
const runSequence = require('run-sequence');

gulp.task('prod', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = true;

  runSequence(['styles', 'images', 'fonts', 'views', 'lint', 'jscs', 'jsdoc', 'browserify'], 'gzip', cb);

});
