(function() {
	'use strict';

	angular
		.module('app')
		.controller('PersonsCtrl', PersonsCtrl);

	function PersonsCtrl($scope, $state, $uibModal, dataservice) {
		var vm = this;
		var modalinstance;
		vm.persons = [];
		vm.hasError = {};
		vm.formValue = {};

		vm.preDelete = preDelete;
		vm.showPersonForm = showPersonForm;
		vm.hidePersonForm = hidePersonForm;
		vm.savePerson = savePerson;

		activate();
		function activate() {
			dataservice
				.getPersons()
				.then(afterGetData)
			function afterGetData(result) {
				vm.persons = result;
			}
		}

		function preDelete(person) {
			var r = confirm("Are you sure want to remove " + person.nama + '?');
			if (r == true) {
				dataservice.deletePerson(person.id).then(activate);
			}
		}

		function showPersonForm(person, isView) {
			vm.formValue = {};
			if (person) {
				vm.formValue.id = person.id;
				vm.formValue.name = person.nama;
				vm.formValue.kp = person.kode_plg;
				vm.formValue.hp = person.hp;
				vm.formValue.email = person.email;
				vm.formValue.address = person.alamat;
				vm.formValue.desc = person.ket;
				vm.formValue.jenis_industri = person.jenis_industri;
				if (isView)
					vm.formValue.isView = true;
			}

			modalinstance = $uibModal.open({
				templateUrl: 'create-person-dialog.html',
				size: 'md',
				backdrop: 'static',
				scope: $scope
			});
		}

		function hidePersonForm() {
			if (modalinstance && modalinstance.dismiss) modalinstance.dismiss();
		}

		function savePerson() {
			vm.hasError = {};

			if (!vm.formValue.name)
				vm.hasError['name'] = true;
			if (!vm.formValue.jenis_industri)
				vm.hasError['jenis_industri'] = true;
			if (!vm.formValue.hp)
				vm.hasError['hp'] = true;
			if (!vm.formValue.address)
				vm.hasError['address'] = true;
			if (!vm.formValue.email)
				vm.hasError['email'] = true;
			if (!vm.formValue.desc)
				vm.hasError['desc'] = true;
			
			if (Object.keys(vm.hasError).length > 0) {
				setFocus(Object.keys(vm.hasError)[0]);
			} else {
				if (vm.formValue.id) {
					dataservice
						.editPerson(vm.formValue)
						.then(hidePersonForm)
						.then(activate);
				} else {
					dataservice
						.createPerson(vm.formValue)
						.then(hidePersonForm)
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
