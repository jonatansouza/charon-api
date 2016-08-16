var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.createServer = function(req, res) {

        var options = {
            name: req.body.name,
            flavor: req.body.flavor,
            image: req.body.image
        };

        console.log(options);
        openstack.compute.createServer(options, function(err, server) {
            if (err) {
                var status = err.statusCode || 500;
                res.status(status).json(err);
                return
            }
            res.status(200).json(server);
        });
    }

    controller.getServers = function(req, res) {
        openstack.compute.getServers(function(err, servers) {
            if (err) {
                console.log(err);
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(servers);
        });
    }

    controller.getServerById = function(req, res) {
        openstack.compute.getServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(server);
        });
    }

    controller.destroyServer = function(req, res) {
        openstack.compute.destroyServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(server);
        });
    }

    controller.rebootServer = function(req, res) {
        openstack.compute.rebootServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(server);
        });
    }

    controller.volumeAttachments = function(req, res) {
        openstack.compute.getVolumeAttachments(req.params.id, function(err, volumes) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(volumes);
        });
    }

    controller.attachVolume = function(req, res) {
        serverId = req.body.server;
        volumeId = req.body.volume;

        openstack.compute.attachVolume(serverId, volumeId, function(err, volume) {
            if (err) {
                if (err.statusCode == 202 || err.statusCode == 204) {
                    res.status(200).json({
                        "message": "volume attached"
                    });
                    return
                }
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(volume);
        });
    }

    controller.detachVolume = function(req, res) {
        serverId = req.body.server;
        volumeId = req.body.volume;

        openstack.compute.detachVolume(serverId, volumeId, function(err) {
            if (err) {
                if (err.statusCode == 202 || err.statusCode == 204) {
                    res.status(200).json({
                        "message": "volume detached"
                    });
                    return
                }
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200);
        });
    }

    controller.version = function(req, res) {
        openstack.compute.getVersion(function(err, version) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(version);
        });
    }

    controller.getFlavors = function(req, res) {
        openstack.compute.getFlavors(function(err, flavors) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(flavors);
        });
    };

    controller.getFlavorById = function(req, res) {
        openstack.compute.getFlavor(req.params.id, function(err, flavor) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(flavor);

        });
    };


    controller.limits = function(req, res) {
        openstack.compute.getLimits(function(err, limits) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(limits);
        });
    };

    controller.getKeys = function(req, res) {
        openstack.compute.listKeys(function(err, keys) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(keys);
        });
    };

    controller.addKey = function(req, res) {
        var options = req.body;
        openstack.compute.addKey(options, function(err, key) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(key);
        });
    };

    controller.getGroups = function(req, res) {
        openstack.compute.listGroups(function(err, groups) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(groups);
        });
    };

    controller.addGroup = function(req, res) {
        var options = req.body;
        openstack.compute.addGroup(options, function(err, group) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(group);
        });
    };

    controller.addRule = function(req, res) {
        var options = req.body;
        openstack.compute.addRule(options, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(rule);
        });
    };

    controller.getFloatingIps = function(req, res) {
        openstack.compute.getFloatingIps(function(err, ips) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(ips);
        });
    };
    controller.allocateNewFloatingIp = function(req, res) {
        openstack.compute.allocateNewFloatingIp(function(err, ip) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(ip);
        });
    }
    return controller;

}
