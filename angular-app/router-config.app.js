(function() {
	'use strict';

	angular.module('app').config(routerConfig);

	function routerConfig($stateProvider) {
		$stateProvider
			.state('admin', {
				url: '/admin',
				templateUrl: 'angular-app/pages/admin/admin.html',
				controller: 'AdminCtrl',
				controllerAs: 'vm',
				isSecure: true
			})
				.state('admin.persons', {
					url: '/persons',
					templateUrl: 'angular-app/pages/admin/persons/persons.html',
					controller: 'PersonsCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.parameter', {
					url: '/parameter',
					templateUrl: 'angular-app/pages/admin/parameter/parameter.html',
					controller: 'ParamterCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.pps', {
					url: '/pps',
					templateUrl: 'angular-app/pages/admin/pps/pps.html',
					controller: 'PPSCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.officer', {
					url: '/officer',
					templateUrl: 'angular-app/pages/admin/officer/officer.html',
					controller: 'OfficerCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.disposition', {
					url: '/disposition',
					templateUrl: 'angular-app/pages/admin/disposition/disposition.html',
					controller: 'DispositionCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.testMethod', {
					url: '/testMethod',
					templateUrl: 'angular-app/pages/admin/testMethod/testMethod.html',
					controller: 'TestMethodCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.ppsInProgress', {
					url: '/ppsInProgress',
					templateUrl: 'angular-app/pages/admin/ppsInProgress/ppsInProgress.html',
					controller: 'PPSInProgressCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.archive', {
					url: '/archive',
					templateUrl: 'angular-app/pages/admin/archive/archive.html',
					controller: 'ArchiveCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
				.state('admin.laporan', {
					url: '/laporan',
					templateUrl: 'angular-app/pages/admin/laporan/laporan.html',
					controller: 'KwitansiCtrl',
					controllerAs: 'vm',
					isSecure: true
				})
			.state('login', {
				url: '/',
				templateUrl: 'angular-app/pages/login/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm',
				isSecure: false
			})
	};

})();
