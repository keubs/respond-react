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

  	geocodeLatLng: function(geocoder, map, lat, lng, fn) {
  	  var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
  	  var retValue;
  	  geocoder.geocode({'location': latlng}, function(results, status) {
  	    if (status === google.maps.GeocoderStatus.OK) {
  	      if (results[1]) {
  	        fn(results);

  	      } else {
  	        window.alert('No results found');
  	      }
  	    } else {
  	      window.alert('Geocoder failed due to: ' + status);
  	    }
  	  });

  	},

  	errorStringify: function(errorArray) {
  	  if (errorArray) {
  	    return errorArray.join('<br/>');
  	  } else {
  	    return ('');
  	  }
  	}

};

module.exports = proto;
