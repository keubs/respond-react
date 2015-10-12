'use strict';

const config      = require('../config');
const browserSync = require('browser-sync');
const gulp        = require('gulp');

gulp.task('browserSync', function() {

  browserSync({
  	port: config.browserport,
  	ui: {
    	port: config.uiport
    },
    proxy: 'localhost:' + config.serverport
  });

});
