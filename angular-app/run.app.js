(function() {
	'use strict';
	var app = angular.module('app');
	app.run(appRun);
	function appRun($rootScope) {
	}
	app.config(['$qProvider', function ($qProvider) {
		$qProvider.errorOnUnhandledRejections(false);
	}]);

})();
