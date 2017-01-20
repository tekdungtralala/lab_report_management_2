(function() {
	'use strict';

	angular
		.module('app')
		.controller('OfficerCtrl', OfficerCtrl);

	function OfficerCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		var modalinstance;
		vm.list = [];
		vm.formValue = {};
		vm.hasError = {};

		vm.preDelete = preDelete;
		vm.showForm = showForm;
		vm.hideForm = hideForm;
		vm.saveData = saveData;

		activate();
		function activate() {
			dataservice
				.getOfficers()
				.then(afterGetData)
			function afterGetData(result) {
				vm.list = result;
			}
		}

		function preDelete(d) {
			var r = confirm("Are you sure want to remove " + d.name + '?');
			if (r == true) {
				dataservice.deleteOfficer(d.id).then(activate);
			}
		}

		function showForm(parameter, isView) {
			vm.formValue = {};
			if (parameter) {
				vm.formValue.id = parameter.id;
				vm.formValue.name = parameter.name;
				vm.formValue.official_id = parameter.official_id;
				if (isView)
					vm.formValue.isView = true;
			}

			modalinstance = $uibModal.open({
				templateUrl: 'create-parameter-dialog.html',
				size: 'md',
				backdrop: 'static',
				scope: $scope
			});
		}

		function hideForm() {
			if (modalinstance && modalinstance.dismiss) modalinstance.dismiss();
		}

		function saveData() {
			vm.hasError = {};

			if (!vm.formValue.official_id)
				vm.hasError['official_id'] = true;
			if (!vm.formValue.name)
				vm.hasError['name'] = true;

			if (Object.keys(vm.hasError).length > 0) {
				helper.setFocus(Object.keys(vm.hasError)[0]);
			} else {
				if (vm.formValue.id) {
					dataservice
						.editOfficer(vm.formValue)
						.then(hideForm)
						.then(activate);
				} else {
					dataservice
						.createOfficer(vm.formValue)
						.then(hideForm)
						.then(activate);
				}
			}
		}
	}
})();
