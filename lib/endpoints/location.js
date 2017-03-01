var Request = require('../request');
var Location = function(config) {
    this.config = config;
    this.genEndpoint = "location";
}

Location.prototype.find = function(params, callback) {
    params.key = this.config.key;
    this.executeRequest(this.genEndpoint, params, callback)
}

Location.prototype.executeRequest = function(endpoint, params, callback) {
    var locationRequest = this.createRequest(endpoint, params, this.config);
    locationRequest.makeRequest(callback);
}

Location.prototype.createRequest = function(endpoint, params, config) {
    return new Request(endpoint, params, config);
}

module.exports = Location;
