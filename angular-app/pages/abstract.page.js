(function() {

	'use strict';

	angular
		.module( 'app' )
		.factory( 'abstractPage' , AbstractPage);

	function AbstractPage($q, $state, $stateParams, appData, dataservice) {
		var service = {
			startCtrl: startCtrl,
			gotoDashboardPage: gotoDashboardPage,
			gotoLoginPage: gotoLoginPage
		};
		return service;

		function startCtrl() {
			var hasLoggedUser = appData.hasLoggedUser();
			var isSecurePage = $state.current.isSecure;

			if (!hasLoggedUser) {
				var deferred = $q.defer();
				dataservice
					.hasLoggedUser()
					.then(function() {
						deferred.resolve(true);
						if (!isSecurePage) gotoDashboardPage();
					})
					.catch(function() {
						deferred.reject(false);
						gotoLoginPage();
					});

				return deferred.promise;
			} else {
				if (isSecurePage && !hasLoggedUser) {
					gotoLoginPage();
					return $q.reject(false);
				} else if (!isSecurePage && hasLoggedUser) {
					gotoDashboardPage();
					return $q.reject(false);
				} else {
					return $q.when();
				}
			}
		}

		function gotoDashboardPage() {
			$state.go('admin');
		}

		function gotoLoginPage() {
			$state.go('login');
		}
	}

})();
