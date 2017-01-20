(function() {
	'use strict';

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($state, abstractPage, dataservice, appData) {
		var vm = this;
		vm.auth = {};
		vm.errorMsg = false;
		vm.auth.username = 'root';
		vm.auth.password = 'password';

		vm.login = login;

		abstractPage.startCtrl().then(activate);
		function activate() {
		}

		function login() {
			vm.errorMsg = false;
			dataservice.login(vm.auth)
				.then(function() {
					appData.setLoggedUser(true);
					$state.go('admin');
				})
				.catch(function() {
					vm.errorMsg = true;
				});
		}
	}
})();
