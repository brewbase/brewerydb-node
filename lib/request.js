var request = require('request');
var qs = require('querystring');
var cfg = require('../config');

function Request(endpoint, params, config) {
    config = config || cfg;
    this.url = config.base_url + '/' + endpoint + '?' + qs.stringify(params);
}

Request.prototype.makeRequest = function(callback) {
    var currentRequestObj = this;
    request(this.url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            if (data.status == "failure") {
                callback(new Error(data.errorMessage), null);
            } else if (!data.data) { //no results, 
                callback(null, null);
            } else {
                currentRequestObj.data = data.data; //these are some dumb fucking names
                currentRequestObj.page = data.currentPage;
                currentRequestObj.numPages = data.numberOfPages;
                callback(null, currentRequestObj);
            }
        } else {
            if (error) {
                callback(error, null);
            } else {
                callback(new Error("Server returned status: " + 
                                   response.statusCode), null);
            }
        }
    });
}

Request.prototype.nextPage = function(callback) {
    this.page++;
    makeRequest(callback);
}

module.exports = Request;
