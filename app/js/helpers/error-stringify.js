'use strict';

module.exports = function(errorArray) {
  if (errorArray) {
    return errorArray.join('<br/>');
  }
  else {
    return ('');
  }
};
