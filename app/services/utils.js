'use strict';
angular.module('app')
.service('utils', function($q) {

	this.updateQueryString = function(uri, qsObj) {
		var regex = new RegExp("([?&])" + qsObj.value + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(regex)) {
			return uri.replace(regex, '$1' + qsObj.value + '$2');
		} else {
			return uri + separator + qsObj.value;
		}
	}
});