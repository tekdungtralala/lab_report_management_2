(function() {

	'use strict';

	angular.module('app').factory('helper', Helper);

	function Helper() {
		var service = {
			toRp: toRp,
			setFocus: setFocus
		}

		function toRp(number) {
			var reverseTotal = reverseString(number + '');
			var tmp = '';

			_.forEach(reverseTotal.split(''), function(c, index) {
				tmp = (((index+1) % 3) === 0 ? '.' : '') + c + tmp;
			})
			if (tmp.substring(0, 1) == '.') { 
				tmp = tmp.substring(1);
			}
			return 'Rp ' + tmp + ',00';

			function reverseString(str) {
				return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
			}
		}

		function setFocus(elementId) {
			setTimeout(function() {
				document.getElementById(elementId).focus();
			}, 10);
		}

		return service;
	}

})();
