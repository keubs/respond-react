'use strict';
var CONFIG = {};
if(window.location.port !== ''){
	CONFIG = {
	  appTitle: 'respond/react',
	  apiUrl: 'http://api.respondreact.com:8100/api',
	  backendUrl: 'http://api.respondreact.com:8100',
	  googleApiKey: 'AIzaSyAztcWr5QxKQB2tBPwTAbqgIggtUHu4D1M',
	};
} else {
	CONFIG = {
	  appTitle: 'respond/react',
	  apiUrl: 'http://api.respondreact.com/api',
	  backendUrl: 'http://api.respondreact.com',
	  googleApiKey: 'AIzaSyAztcWr5QxKQB2tBPwTAbqgIggtUHu4D1M',
	};
}

module.exports = CONFIG;
