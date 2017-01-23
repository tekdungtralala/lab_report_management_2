(function() {
	'use strict';

	angular
		.module('app')
		.controller('PPSCtrl', PPSCtrl);

	function PPSCtrl($scope, $state, $uibModal, dataservice, helper) {
		var vm = this;
		var modalinstance;
		var parameters = [];
		var sampleNumber = null;
		vm.list = [];
		vm.hasError = {};
		vm.persons = [];
		vm.showForm = false;
		vm.formValue = {};
		vm.sampleConditions = [];
		vm.sampleTypes = [];
		vm.availableParams = [];

		vm.toggleForm = toggleForm;
		vm.findPerson = findPerson;
		vm.selectPerson = selectPerson;
		vm.toggleDatePopup = toggleDatePopup;
		vm.addNewSample = addNewSample;
		vm.removeSample = removeSample;
		vm.addParameter = addParameter;
		vm.selectParameter = selectParameter;
		vm.updatePrice = updatePrice;
		vm.saveForm = saveForm;
		vm.removeParameter = removeParameter;
		vm.editData = editData;
		vm.preDelete = preDelete;
		vm.preDisposition = preDisposition;

		activate();
		function activate() {
			vm.sampleConditions = [
				"Keruh", "Jernih", "Berwarna"
			];
			vm.sampleTypes = [
				"Cair", "Padat", "Gas"
			];

			dataservice.getParameters().then(afterGetParams);
			function afterGetParams(results) {
				parameters = results;
			}

			dataservice.getPPSs().then(afterGetPPS);
			function afterGetPPS(results) {
				vm.list = results;
				_.forEach(vm.list, function(d) {
					d.total_priceRp = helper.toRp(d.total_price);
				});
			}
		}

		function toggleForm() {
			vm.showForm = !vm.showForm;
			if (vm.showForm === true) {
				vm.formValue = {};
				vm.hasError = {};
			}
		}

		function findPerson() {
			dataservice
				.findAvailablePerson()
				.then(afterFindPerson);

			function afterFindPerson(persons) {
				vm.persons = persons;

				modalinstance = $uibModal.open({
					templateUrl: 'find-person-dialog.html',
					size: 'lg',
					scope: $scope
				});
			}
		}

		function selectPerson(person) {
			vm.formValue.person = person;
			hideDialog();
		}

		function hideDialog() {
			if (modalinstance && modalinstance.dismiss) modalinstance.dismiss();
		}

		function toggleDatePopup(key) {
			vm.formValue[key] = !vm.formValue[key];
		}

		function addNewSample() {
			if (!vm.formValue.samples || vm.formValue.samples.length === 0) {
				vm.formValue.samples = [];
			}
			var number = 0;
			_.forEach(vm.formValue.samples, function(s) {
				if (s.number > number) number = s.number;
			});
			vm.formValue.samples.push({
				number: number + 1,
				sampleCode: null,
				parameters: []
			});
		}

		function removeSample(sample) {
			var r = confirm('Are you sure want to remove this sample ?');
			if (r == true) {
				_.remove(vm.formValue.samples, function(s) {
					return s.number === sample.number;
				});				
			}
		}

		function addParameter(sample) {
			sampleNumber = sample.number;
			var tmp = angular.copy(parameters);
			_.remove(tmp, function(av) {
				var isRemove = false;
				_.forEach(sample.parameters, function(p) {
					if (av.id === p.id) isRemove = true;
				})
				return isRemove;
			});
			vm.availableParams = tmp;
			modalinstance = $uibModal.open({
				templateUrl: 'choose-parameter-dialog.html',
				size: 'md',
				scope: $scope
			});
		}

		function selectParameter(parameter) {
			hideDialog();
			var sample = _.find(vm.formValue.samples, function(s) {
				return s.number === sampleNumber;
			});
			parameter.quantity = 1;
			parameter.priceRp = helper.toRp(parameter.price);
			sample.parameters.push(parameter);
			if (sample.parameters.length == parameters.length)
				sample.hideAddBtn = true;

			updatePrice();
		}

		function updatePrice() {
			var total = 0;
			_.forEach(vm.formValue.samples, function(sample) {
				_.forEach(sample.parameters, function(param) {
					var paramPrice = (param.quantity * param.price);
					param.total = paramPrice;
					param.totalRp = helper.toRp(paramPrice);

					total = total + paramPrice;
				});
			});
			vm.formValue.total = total;
			vm.formValue.totalRp = helper.toRp(total);
		}

		function saveForm() {
			vm.hasError = {};

			if (!vm.formValue.person || vm.formValue.person.name) {
				vm.hasError['person'] = true;
			}
			if (!vm.formValue.received_dt)
				vm.hasError['received_dt'] = true;
			if (!vm.formValue.analisis_dt)
				vm.hasError['analisis_dt'] = true;
			if (!vm.formValue.sample_condition)
				vm.hasError['sample_condition'] = true;
			if (!vm.formValue.sample_type)
				vm.hasError['sample_type'] = true;

			var hasEmptyParam = false;
			_.forEach(vm.formValue.samples, function(sample) {
				if (!sample.sampleCode) {
					vm.hasError['sample' + sample.number] = true;
				}
				if (!sample.parameters || sample.parameters.length === 0) {
					hasEmptyParam = true;
				}
			});

			if (hasEmptyParam) {
				vm.hasError['info'] = 'Setiap Sample miminal harus ada 1 parameter.';
			} else if (!vm.formValue.samples || vm.formValue.samples.length === 0) {
				vm.hasError['info'] = 'Mohon input data sample.';	
			}

			if (Object.keys(vm.hasError).length > 0) {
				helper.setFocus(Object.keys(vm.hasError)[0]);
			} else {
				if (vm.formValue.id) {
					dataservice.editPPS(vm.formValue).then(afterSave);;
				} else {
					dataservice.createPPS(vm.formValue).then(afterSave);;
				}

				dataservice.prePrintReports({
					formValue: vm.formValue,
				}).then(function() {
					window.open('cetak_tanda_terima.php','_blank');
				});	

				function afterSave() {
					vm.showForm = false;
					vm.formValue = {};
					activate();
				}
			}
		}

		function removeParameter(sample, parameter) {
			_.remove(sample.parameters, function(p) {
				return p.id === parameter.id;
			});
			updatePrice();
		}

		function editData(data, isView) {
			vm.showForm = true;
			vm.formValue = {};
			vm.formValue.id = data.id;
			vm.formValue.person = {};
			vm.formValue.person.nama = data.person_name;
			vm.formValue.person.alamat = data.person_address;
			vm.formValue.person.id = data.person_id;
			vm.formValue.person.kode_plg = data.person_kode_plg;
			vm.formValue.person.jenis_industri = data.person_jenis_industri;
			vm.formValue.person.ket = data.person_ket;
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
			if (isView)
				vm.formValue.isView = true;
		}

		function preDelete(data) {
			var r = confirm('Are you sure want to remove this data ?');
			if (r == true) {
				dataservice.deletePPS(data.id).then(activate);
			}
		}

		function preDisposition(id) {
			var r = confirm('Are you sure want to submit this sample ?');
			if (r == true) {
				dataservice.submitToDispotition(id).then(afterSubmit);
				function afterSubmit() {
					vm.showForm = false;
					activate();
				}
			}
		}

	}

})();
