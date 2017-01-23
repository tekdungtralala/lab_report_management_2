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
		vm.toggleDatePopup = toggleDatePopup;

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
			vm.formValue.person.kode_plg = data.person_kode_plg;
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
			vm.hasError = {};

			if (!vm.formValue.disposition_dt)
				vm.hasError['disposition_dt'] = true;
			if (!vm.formValue.pps_desc)
				vm.hasError['pps_desc'] = true;

			if (Object.keys(vm.hasError).length > 0) {
				helper.setFocus(Object.keys(vm.hasError)[0]);
			} else {
				var r = confirm('Are you sure want to save this sample ?');
				if (r === true) {
					var dateFormat = 'YYYY-MM-D';
					vm.formValue.disposition_dtStr = moment(vm.formValue.disposition_dt).format(dateFormat);
					var data = {
						officer_id: vm.formValue.officer.id,
						disposition_dt: vm.formValue.disposition_dtStr,
						pps_desc: vm.formValue.pps_desc
					};

					dataservice
						.submitToTestResult(vm.formValue.id, data)
						.then(afterSubmit);
					function afterSubmit() {
						dataservice.prePrintReports({
							formValue: vm.formValue,
						}).then(function() {
							toggleForm();
							activate();
							window.open('cetak_disposisi.php','_blank');
						});	
					}
				}				
			}
		}

		function toggleDatePopup(key) {
			vm.formValue[key] = !vm.formValue[key];
		}
	}

})();