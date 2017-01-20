(function() {
	'use strict';

	angular
		.module('app')
		.controller('AdminCtrl', AdminCtrl);

	function AdminCtrl($state, abstractPage, dataservice, appData) {
		var vm = this;
		vm.stateActive = $state.current.name;
		

		vm.logout = logout;
		vm.gotoToState = gotoToState;

		abstractPage.startCtrl();

		function logout() {
			dataservice.logout().then(function() {
				appData.setLoggedUser(null);
				$state.go('login');
			});
			
		}

		function gotoToState(targetState) {
			vm.stateActive = targetState;
			$state.go(targetState)
		}
	}

})();
