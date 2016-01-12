'use strict';

const config       = require('../config');
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const gulpif       = require('gulp-if');
const handleErrors = require('../util/handleErrors');
const browserSync  = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {

  return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested',
    }))
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({stream: true})));

});
