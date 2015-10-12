'use strict';

const config        = require('../config');
const gulp          = require('gulp');

gulp.task('watch', ['browserSync', 'server'], function() {

  // Scripts are automatically watched and rebundled by Watchify inside Browserify task
  gulp.watch(config.scripts.src, ['lint', 'jscs', 'jsdoc']);
  gulp.watch(config.styles.src,  ['styles']);
  gulp.watch(config.images.src,  ['images']);
  gulp.watch(config.fonts.src,   ['fonts']);
  gulp.watch(config.views.watch, ['views']);

});
