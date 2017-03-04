var Brewables = require('./brewables');

var Location = function(config) {
    Brewables.call(this, config, "location", "locations");
}
Location.prototype = new Brewables

Location.prototype.getBreweryById = function(id, params, callback) {
    var brewRequest;
    if (id) {
        params.ids = id.toString();
        params.key = this.config.key;
        this.executeRequest(this.idEndpoint + '/' + id , params, callback);
    }
}



module.exports = Location;
