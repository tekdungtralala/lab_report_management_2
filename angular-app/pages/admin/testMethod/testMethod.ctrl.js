(function() {
	'use strict';

	angular
		.module('app')
		.controller('TestMethodCtrl', TestMethodCtrl);

	function TestMethodCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		var modalinstance;
		var selectedId = null;
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
				.getTestMethods()
				.then(afterGetData)
			function afterGetData(result) {
				vm.list = result;
			}
		}

		function preDelete(d) {
			var r = confirm("Are you sure want to remove " + d.name + '?');
			if (r == true) {
				dataservice.deleteTestMethod(d.id).then(activate);
			}
		}

		function showForm(testMethod, isView) {
			vm.hasError = {};
			vm.formValue = {};
			selectedId = null;
			if (testMethod) {
				vm.formValue.id = testMethod.id;
				vm.formValue.name = testMethod.name;
				if (isView) {
					vm.formValue.isView = true;
				}
				selectedId = testMethod.id;
			}

			modalinstance = $uibModal.open({
				templateUrl: 'create-testMethod-dialog.html',
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

			if (!vm.formValue.name)
				vm.hasError['name'] = true;

			var finded = _.find(vm.list, function(l) {
				return l.name === vm.formValue.name && selectedId != l.id;
			});
			if (finded) vm.hasError['errorMsg'] = 'Nama Methode sudah digunakan.'

			if (Object.keys(vm.hasError).length > 0) {
				helper.setFocus(Object.keys(vm.hasError)[0]);
			} else {
				if (vm.formValue.id) {
					dataservice
						.editTestMethod(vm.formValue)
						.then(hideForm)
						.then(activate);
				} else {
					dataservice
						.createTestMethod(vm.formValue)
						.then(hideForm)
						.then(activate);
				}
			}
		}
	}
})();
