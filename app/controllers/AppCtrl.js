'use strict';
angular.module('app')
.controller('AppCtrl', function($scope, chromeStorage, utils) {
	$scope.chromeStorage = chromeStorage;

    $scope.$watchCollection('chromeStorage.data', function() {
        $scope.queryStrings = $scope.chromeStorage.data;
    });

    $scope.chromeStorage.findAll(function(data){
        $scope.queryStrings = data;
        $scope.$apply();
    });

	$scope.add = function() {
		chromeStorage.add($scope.newItem);
		$scope.newItem = {};
	}
	$scope.remove = function() {
		$scope.chromeStorage.remove();
	}

	$scope.appendQueryString = function() {
		var self = this;
		var queryInfo = {
    		active: true,
    		currentWindow: true
  		};
		chrome.tabs.query(queryInfo, function(tabs) {
			var tab = tabs[0].url;
			console.log(tab);
			var newUrl = utils.updateQueryString(tab, self.qs);
			chrome.tabs.update(tab.id, {url: newUrl});
		});
	}
});