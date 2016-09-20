var openstack = require('../../config/openstack-utils'),
    _ = require('lodash'),
    Promise = require('promise');

module.exports = function(app) {
    var controller = {};

    controller.createServer = function(req, res, next) {
        var options = req.body;
        openstack.compute.createServer(options, function(err, server) {
            if (err) {
                var status = err.statusCode || 500;
                res.status(status).json(err);
                return
            }

            function getServerStatus() {
                console.log("Checking");
                openstack.compute.getServer(server.id, function(err, s) {
                    if (err) {
                        res.status(err.statusCode || 500).json(err);
                        return
                    }
                    server = s;
                    if (server.status == "PROVISIONING") {
                        setTimeout(function() {
                            getServerStatus();
                        }, 2000);
                    } else {
                        req.server = server;
                        next();
                    }
                });
            }

            getServerStatus();
        });
    }

    controller.cleanServers = function(req, res, next) {
        openstack.compute.getServers(function(err, servers) {
            if (err) {
                console.log(err);
                return res.status(err.statusCode || 500).json(err);
            }
            for (var i = 0; i < servers.length; i++) {
                openstack.compute.destroyServer(servers[i].id, function(err, server) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(server);
                });
            }
            next();
        });
    };

    controller.getServers = function(req, res, next) {
        openstack.compute.getServers(function(err, servers) {
            if (err) {
                console.log(err);
                return res.status(err.statusCode || 500).json(err);
            }
            req.servers = servers;
            next();
        });
    }

    controller.getServerById = function(req, res, next) {
        openstack.compute.getServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.server = server;
            next();
        });
    }

    controller.destroyServer = function(req, res, next) {
        openstack.compute.destroyServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.server = server;
            next();
        });
    }

    controller.rebootServer = function(req, res, next) {
        openstack.compute.rebootServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.server = server;
            next();
        });
    }

    controller.stopServer = function(req, res, next) {
        openstack.compute.stopServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.server = {
                status: 'ok',
                server: req.params.id,
                state: 'stoped'
            };
            next();
        });
    };
    controller.startServer = function(req, res, next) {
        openstack.compute.startServer(req.params.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            console.log(server);
            req.server = {
                status: 'ok',
                server: req.params.id,
                state: 'started'
            };
            next();
        });
    };


    controller.volumeAttachments = function(req, res, next) {
        openstack.compute.getVolumeAttachments(req.params.id, function(err, volumes) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volumes = volumes;
            next();
        });
    }

    controller.attachVolume = function(req, res, next) {
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
            req.volume = volume;
            next();
        });
    }

    controller.detachVolume = function(req, res, next) {
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
            var volume = {
                "status": "deleted"
            };
            req.volume = volume;
            next();
        });
    }

    controller.version = function(req, res, next) {
        openstack.compute.getVersion(function(err, version) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.version = version;
            next();
        });
    }

    controller.getFlavors = function(req, res, next) {
        openstack.compute.getFlavors(function(err, flavors) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.flavors = flavors;
            next();
        });
    };

    controller.getFlavorById = function(req, res, next) {
        openstack.compute.getFlavor(req.params.id, function(err, flavor) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.flavor = flavor;
            next();
        });
    };


    controller.limits = function(req, res, next) {
        openstack.compute.getLimits(function(err, limits) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.limits = limits;
            next();
        });
    };

    controller.getKeys = function(req, res, next) {
        openstack.compute.listKeys(function(err, keys) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.keys = keys;
            next();
        });
    };

    controller.addKey = function(req, res, next) {
        var options = req.body;
        openstack.compute.addKey(options, function(err, key) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.key = key;
            next();
        });
    };

    controller.removeKey = function(req, res, next) {
        openstack.compute.destroyKey(req.params.id, function(err, key) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.key = key;
            next();
        });
    };

    controller.getGroups = function(req, res, next) {
        openstack.compute.listGroups(function(err, groups) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.groups = groups;
            next();
        });
    };

    controller.addGroup = function(req, res, next) {
        var options = req.body;
        openstack.compute.addGroup(options, function(err, group) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.group = group;
            next();
        });
    };

    controller.addRule = function(req, res, next) {
        var options = req.body;
        openstack.compute.addRule(options, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.rule = rule;
            next();
        });
    };

    controller.getFloatingIps = function(req, res, next) {
        openstack.compute.getFloatingIps(function(err, ipsFromOpenstack) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.ipsFromOpenstack = ipsFromOpenstack;
            console.log(req.ipsFromOpenstack);
            next();
        });
    };
    controller.allocateNewFloatingIp = function(req, res, next) {
        var unused_floating_ips;
        openstack.compute.getFloatingIps(function(err, ips) {
            for (i = 0; i < ips.length; i++) {
                if (!ips[i].instance_id) {
                    unused_floating_ips = ips[i];
                    break;
                }
            }
            if (unused_floating_ips) {
                req.ipFree = unused_floating_ips;
                next();
            } else {
                openstack.compute.allocateNewFloatingIp(function(err, ip) {
                    if (err) {
                        res.status(err.statusCode || 500).json(err);
                        return
                    }
                    console.log("found new floating ip");
                    req.ipFree = ip;
                    next();
                });
            }
        });

    }

    controller.addFloatingIp = function(req, res, next) {
        var server = req.body.server || req.server.id;
        var ip = req.body.ip || req.ipFree.ip;

        openstack.compute.addFloatingIp(server, ip, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.server = {
                ip: req.ipFree
            };
            console.log("addFloatingIp");
            next();
        });
    };

    controller.iotInstance = function(req, res, next) {


    };



    return controller;

}
