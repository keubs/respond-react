'use strict';

/* bundleLogger
 * ------------
 * Provides gulp style logs to the bundle method in browserify.js
 */

const gutil        = require('gulp-util');
const prettyHrtime = require('pretty-hrtime');
let startTime;

module.exports = {

  start: function() {
    startTime = process.hrtime();
    gutil.log('Running', gutil.colors.green('\'bundle\'') + '...');
  },

  end: function() {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green('\'bundle\''), 'in', gutil.colors.magenta(prettyTime));
  },

};
