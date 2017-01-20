(function() {
	'use strict';

	angular
		.module('app')
		.controller('PPSInProgressCtrl', PPSInProgressCtrl);

	function PPSInProgressCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		vm.list = [];
		vm.methods = [];

		vm.editData = editData;
		vm.toggleForm = toggleForm;
		vm.saveForm = saveForm;

		activate();
		function activate() {
			dataservice.getPPSInProgress().then(afterGetPPS);
			function afterGetPPS(results) {
				vm.list = results;
				_.forEach(vm.list, function(d) {
					d.total_priceRp = helper.toRp(d.total_price);
				});
			}

			dataservice.getTestMethods().then(afterGetMethods)
			function afterGetMethods(results) {
				vm.methods = results;
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
			vm.formValue.officer = {};
			vm.formValue.officer.official_id = data.officer_official_id;
			vm.formValue.officer.name = data.officer_name;
		}

		function toggleForm() {
			vm.showForm = !vm.showForm;
			vm.formValue = {};
			vm.hasError = {};
		}

		function saveForm() {
			vm.hasError = {};

			_.forEach(vm.formValue.samples, function(sample) {
				_.forEach(sample.parameters, function(param, i) {
					var resultId = 'result' + sample.number + i;
					if (!param.result) vm.hasError[resultId] = true

					var methodId = 'method' + sample.number + i;
					if (!param.method) vm.hasError[methodId] = true
				});
			});
			console.log(vm.hasError)

			if (Object.keys(vm.hasError).length > 0) {
				helper.setFocus(Object.keys(vm.hasError)[0]);
			} else {
				dataservice
					.submitToCompleteResult(vm.formValue.id, vm.formValue.samples)
					.then(afterSave);
				function afterSave() {
					toggleForm();
					activate();
				}
			}
		}

	}
})();
