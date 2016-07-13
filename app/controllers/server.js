var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.createServer = function(req, res) {

        var options = {
            name: req.body.serverName,
            flavor: req.body.flavor,
            image: req.body.image
        };

        console.log(options);
        openstack.compute.createServer(options, function(err, server) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(server);
        });
    }

    controller.getServers = function(req, res) {
        openstack.compute.getServers(function(err, servers) {
            if (err) {
                res.status(500).json(err);
                return
            }
            res.status(200).json(servers);
        });
    }

    controller.getServerById = function(req, res) {
        openstack.compute.getServer(req.params.id, function(err, server) {
            if (err) {
                res.status(500).json(err);
                return
            }
            res.status(200).json(server);
        });
    }

    controller.destroyServer = function(req, res) {
        openstack.compute.destroyServer(req.params.id, function(err, server) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(server);
        });
    }

    controller.rebootServer = function(req, res) {
        openstack.compute.rebootServer(req.params.id, function(err, server) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(server);
        });
    }
    return controller;

}
