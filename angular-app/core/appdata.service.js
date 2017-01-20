(function() {

	'use strict';

	angular.module('app').factory('appData', AppData);

	function AppData() {
		var _loggedUser = null;

		var service = {
			hasLoggedUser: hasLoggedUser,
			setLoggedUser: setLoggedUser,
			logout: logout
		}

		function hasLoggedUser() {
			return _loggedUser;
		}

		function setLoggedUser(loggedUser) {
			_loggedUser = loggedUser;
		}

		function logout() {
			_loggedUser = null;
		}

		return service;
	}

})();
