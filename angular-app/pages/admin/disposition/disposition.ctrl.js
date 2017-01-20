(function() {
	'use strict';

	angular
		.module('app')
		.controller('DispositionCtrl', DispositionCtrl);

	function DispositionCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		var modalinstance;
		vm.list = [];
		vm.formValue = {};
		vm.hasError = {};
		vm.officers = [];
		vm.showForm = false;

		vm.editData = editData;
		vm.toggleForm = toggleForm;
		vm.findOfficer = findOfficer;
		vm.selectOfficer = selectOfficer;
		vm.removeOfficer = removeOfficer;
		vm.saveForm = saveForm;

		activate();
		function activate() {
			dataservice
				.getPPSDispotition()
				.then(afterGetData);
			function afterGetData(result) {
				vm.list = result;
				_.forEach(vm.list, function(d) {
					d.total_priceRp = helper.toRp(d.total_price);
				});
			}
		}

		function editData(data) {
			vm.showForm = true;
			vm.formValue = {};
			vm.formValue.id = data.id;
			vm.formValue.person = {};
			vm.formValue.person.nama = data.person_name;
			vm.formValue.person.alamat = data.person_address;
			vm.formValue.person.id = data.person_id;
			var dateFormat = 'YYYY-MM-D';
			vm.formValue.received_dt = moment(data.received_dt, dateFormat).toDate();
			vm.formValue.analisis_dt = moment(data.analisis_dt, dateFormat).toDate();
			var formatDate = 'DD-MM-YYYY';
			vm.formValue.received_dtStr = moment(vm.formValue.received_dt).format(formatDate);
			vm.formValue.analisis_dtStr = moment(vm.formValue.analisis_dt).format(formatDate);
			vm.formValue.sample_condition = data.sample_condition;
			vm.formValue.sample_type = data.sample_type;
			vm.formValue.total = parseInt(data.total_price);
			vm.formValue.totalRp = helper.toRp(vm.formValue.total);
			vm.formValue.samples = JSON.parse(data.json);
			vm.formValue.isView = true;
		}

		function toggleForm() {
			vm.showForm = !vm.showForm;
			if (vm.showForm === true) {
				vm.formValue = {};
				vm.hasError = {};
			}
		}

		function findOfficer() {
			dataservice.getOfficers().then(afterGetData);
			function afterGetData(result) {
				vm.officers = result;

				modalinstance = $uibModal.open({
					templateUrl: 'find-officer-dialog.html',
					size: 'lg',
					scope: $scope
				});
			}
		}

		function hideDialog() {
			if (modalinstance && modalinstance.dismiss) modalinstance.dismiss();
		}

		function selectOfficer(officer) {
			hideDialog();
			vm.formValue.officer = officer;
		}

		function removeOfficer() {
			vm.formValue.officer = null;
		}

		function saveForm() {
			var r = confirm('Are you sure want to save this sample ?');
			if (r === true) {
				var data = { officer_id: vm.formValue.officer.id };
				dataservice
					.submitToTestResult(vm.formValue.id, data)
					.then(afterSubmit);
				function afterSubmit() {
					toggleForm();
					activate();
				}
			}
		}
	}

})();