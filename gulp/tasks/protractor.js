'use strict';

const gulp            = require('gulp');
const protractor      = require('gulp-protractor').protractor;
const webdriver       = require('gulp-protractor').webdriver;
const webdriverUpdate = require('gulp-protractor').webdriver_update;
const config          = require('../config');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver', 'server'], function() {

  return gulp.src('test/e2e/**/*.js')
    .pipe(protractor({
        configFile: config.test.protractor,
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });

});
