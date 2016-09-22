'use strict';
angular.module('app')
.service('chromeStorage', function($q) {
	var self = this;
	this.data = [];
    
    this.sync = function() {
        chrome.storage.sync.set({queryStrings: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.findAll = function(callback) {
        chrome.storage.sync.get('queryStrings', function(keys) {
            if (keys.queryStrings != null) {
                self.data = keys.queryStrings;
                for (var i = 0; i < self.data.length; i++) {
                    self.data[i]['id'] = i + 1;
                }
                callback(self.data);
            }
        });
    }

	this.add = function (newItem) {
        var id = this.data.length + 1;
        var queryString = {
            id: id,
            name: newItem.name,
            value: newItem.value
        };
        this.data.push(queryString);
        this.sync();
    }

    this.remove = function(item) {
        this.data.splice(this.data.indexOf(item), 1);
        this.sync();
    }

});