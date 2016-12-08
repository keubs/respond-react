'use strict';
var CONFIG = {};
if(window.location.port !== ''){
	CONFIG = {
	  appTitle: 'respond/react',
	  apiUrl: 'http://api.respondreact.com:8100/v1',
	  backendUrl: 'http://api.respondreact.com:8100',
	  mediaUrl: 'http://media.respondreact.com:3100',
	  googleApiKey: 'AIzaSyAztcWr5QxKQB2tBPwTAbqgIggtUHu4D1M',
	  siteUrl: 'http://respondreact.com:3000',
	};
} else {
	CONFIG = {
	  appTitle: 'respond/react',
	  apiUrl: 'http://api.respondreact.com/v1',
	  backendUrl: 'http://api.respondreact.com',
	  mediaUrl: 'http://media.respondreact.com',
	  googleApiKey: 'AIzaSyAztcWr5QxKQB2tBPwTAbqgIggtUHu4D1M',
	  siteUrl: 'http://respondreact.com',
	};
}

module.exports = CONFIG;
