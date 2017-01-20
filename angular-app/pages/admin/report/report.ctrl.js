(function() {
	'use strict';

	angular
		.module('app')
		.controller('ReportCtrl', ReportCtrl);

	function ReportCtrl(dataservice) {
		var vm = this;
		var selectedType = null;
		vm.showReports = false;
		vm.reports = [];
		vm.formValue = {
			from: moment("11-25-2016", "MM-DD-YYYY").toDate(),
			to: moment("12-25-2016", "MM-DD-YYYY").toDate(),
		};
		vm.reportTypes = {
			BY_PERSON: {
				text: 'Laporan Pelanggan',
				type: 'BY_PERSON'
			},
			BY_PPS: {
				text: 'Laporan Transaksi PPS',
				type: 'BY_PPS'
			},
			BY_OFFICER: {
				text: 'Laporan Petugas Analisis',
				type: 'BY_OFFICER'
			},
			BY_COST: {
				text: 'Laporan Kwitansi/Keuangan Total',
				type: 'BY_COST'
			}
		};
		vm.selectedReportTxt = vm.reportTypes['BY_PERSON'].text;
		vm.reportType = 'BY_PERSON';

		vm.viewReportBy = viewReportBy;
		vm.toggleDatePopup = toggleDatePopup;
		vm.fromChanged = fromChanged;
		vm.viewReport = viewReport;
		vm.printByPerson = printByPerson;
		vm.printByOfficer = printByOfficer;

		activate();
		function activate() {
		}

		function viewReportBy(rt) {
			vm.selectedReportTxt = rt.text;
			vm.reportType = rt.type;
			vm.reports = [];
		}

		function toggleDatePopup(key) {
			vm.formValue[key] = !vm.formValue[key];
		}

		function fromChanged() {
			vm.formValue.toOpt = {
				minDate: vm.formValue.from
			}
		}

		function viewReport() {
			vm.showReports = true;
			var dateFormat = 'YYYY-MM-D';
			var from = moment(vm.formValue.from).format(dateFormat);
			vm.formValue.fromStr = from;
			var to = moment(vm.formValue.to).format(dateFormat);
			vm.formValue.toStr = to;

			if ('BY_PERSON' === vm.reportType) {			
				dataservice.getReportByPerson(from, to).then(afterGetData);
				function afterGetData(results) {
					vm.reports = [];
					_.forEach(results, function(r, index) {
						var finded = _.find(vm.reports, function(re) {
							return re.personId === r.id_person;
						});
						if (!finded) {
							finded = {
								personId: r.id_person,
								name: r.nama,
								address: r.alamat,
								email: r.email,
								phoneNumber: r.hp,
								reports: []
							};
							vm.reports.push(finded);	
						}
						finded.reports.push(r);
					});
				}
			}

			if ('BY_OFFICER' === vm.reportType) {
				dataservice.getReportByOfficer(from, to).then(afterGetData);
				function afterGetData(results) {
					vm.reports = [];
					_.forEach(results, function(r, index) {
						var finded = _.find(vm.reports, function(re) {
							return re.officer_id === r.officer_id;
						});
						if (!finded) {
							finded = {
								officer_id: r.officer_id,
								name: r.name,
								official_id: r.official_id,
								reports: []
							};
							vm.reports.push(finded);	
						}
						finded.reports.push(r);
					});
				}
			}
		}

		function printByPerson() {
			dataservice.prePrintReports(vm.reports).then(function() {
				window.open('print_by_person.php','_blank');
			});
		}

		function printByOfficer() {
			dataservice.prePrintReports(vm.reports).then(function() {
				window.open('print_by_officer.php','_blank');
			});
		}

	}

})();
