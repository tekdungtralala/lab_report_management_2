(function() {
	'use strict';

	angular
		.module('app')
		.controller('ArchiveCtrl', ArchiveCtrl);

	function ArchiveCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		vm.list = [];
		vm.formValue = {};

		vm.editData = editData;
		vm.toggleForm = toggleForm;
		vm.toPdf = toPdf;

		activate();
		function activate() {
			dataservice
				.getArchivePPS()
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
			vm.formValue.officer = {};
			vm.formValue.officer.official_id = data.officer_official_id;
			vm.formValue.officer.name = data.officer_name;
		}

		function toggleForm() {
			vm.showForm = !vm.showForm;
		}

		function toPdf(id) {
			console.log(id)
		}
	}

})();