var Request = require('../request');
var Geopoint = function(config) {
    this.config = config;
    this.genEndpoint = "search/geo/point";
}

Geopoint.prototype.find = function(params, callback) {
    params.key = this.config.key;
    this.executeRequest(this.genEndpoint, params, callback)
}

Geopoint.prototype.executeRequest = function(endpoint, params, callback) {
    var geopointRequest = this.createRequest(endpoint, params, this.config);
    geopointRequest.makeRequest(callback);
}

Geopoint.prototype.createRequest = function(endpoint, params, config) {
    return new Request(endpoint, params, config);
}

module.exports = Geopoint;
