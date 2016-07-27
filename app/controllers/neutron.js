var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getNetworks = function(req, res) {
        openstack.network.getNetworks(function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(network);
        });
    }

    return controller;
}
