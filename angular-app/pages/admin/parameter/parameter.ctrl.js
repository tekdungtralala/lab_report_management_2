(function() {
	'use strict';

	angular
		.module('app')
		.controller('ParamterCtrl', ParamterCtrl);

	function ParamterCtrl($scope, $state, $uibModal, dataservice) {
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
				.getParameters()
				.then(afterGetData)
			function afterGetData(result) {
				vm.list = result;
			}
		}

		function preDelete(d) {
			var r = confirm("Are you sure want to remove " + d.name + '?');
			if (r == true) {
				dataservice.deleteParameter(d.id).then(activate);
			}
		}

		function showForm(parameter, isView) {
			vm.formValue = {};
			if (parameter) {
				vm.formValue.id = parameter.id;
				vm.formValue.name = parameter.name;
				vm.formValue.price = parseInt(parameter.price);
				vm.formValue.unit = parameter.unit;
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

			if (!vm.formValue.name)
				vm.hasError['name'] = true;
			if (!vm.formValue.unit)
				vm.hasError['unit'] = true;
			if (!vm.formValue.price || vm.formValue.price < 0)
				vm.hasError['price'] = true;

			if (Object.keys(vm.hasError).length > 0) {
				setFocus(Object.keys(vm.hasError)[0]);
			} else {
				if (vm.formValue.id) {
					dataservice
						.editParameter(vm.formValue)
						.then(hideForm)
						.then(activate);
				} else {
					dataservice
						.createParameter(vm.formValue)
						.then(hideForm)
						.then(activate);
				}
			}
		}

		function setFocus(elementId) {
			setTimeout(function() {
				document.getElementById(elementId).focus();
			}, 10);
		}
	}

})();
