'use strict';

var proto = {
	// @todo not the cleanest method but it needs a string representation of a json array  ¯\_(ツ)_/¯
  jsonified: function(array) {
    var str = '[';
    for (var i = 0; i < array.length; i++) {
      str += '"' + array[i].text.toLowerCase() + '",';
    }
    str = str.slice(0, -1);
    str += ']';
    return str;
	},

	errorStringify: function(errorArray) {
	  if (errorArray) {
	    return errorArray.join('<br/>');
	  } else {
	    return ('');
	  }
	},

  validateUrl : function (value) {
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
  },

  setZoom : function(scope) {
    if(scope === 'local'){
      return 11;
    }
    else if(scope === 'national') {
      return 10;
    }
    else {
      return 5;
    }
  },
  toTitleCase : function(str) {
    return str.replace(/\b\w/g, function(txt){return (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());}).replace('-', ' ');
  },

  hasPostalCode : function(location) {
    var retVal = false;
    location.address_components.forEach(function(component) {
      if(component.types.indexOf('postal_code') === -1) {
        return;
      } else {
        retVal = true;
      }
    });
    return retVal;
  },

  getParameterByName: function(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  generateTags: function(obj) {
   obj.forEach(function(action){
     var tags = [];
     action.tags.forEach(function(tag){
       var newTag = {
         name: tag,
         slug: tag.replace(/ /g, '-')
       }
       tags.push(newTag);
     });

     action.tags = tags;
   });
   
   return obj; 
  }
};

module.exports = proto;
