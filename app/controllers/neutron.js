var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getNetworks = function(req, res, next) {
        openstack.network.getNetworks(function(err, networks) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.networks = networks;
            next();
        });
    }

    controller.getNetwork = function(req, res, next) {
        openstack.network.getNetwork(req.params.id, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.network = network;
            next();
        });
    }

    controller.createNetwork = function(req, res, next) {
        var options = req.body;
        openstack.network.createNetwork(options, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.network = network;
            next();
        });
    }

    controller.updateNetwork = function(req, res, next) {
        var options = req.body;
        openstack.network.updateNetwork(options, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.network = network;
            next();
        });

    }

    controller.destroyNetwork = function(req, res, next) {
        openstack.network.destroyNetwork(req.params.id, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.network = network;
            next();
        });
    }

    controller.getSubnets = function(req, res, next) {
        openstack.network.getSubnets(function(err, subnets) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.subnets = subnets;
            next();
        });
    }

    controller.getSubnet = function(req, res, next) {
        openstack.network.getSubnet(req.params.id, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.subnet = subnet;
            next();
        });
    }

    controller.createSubnet = function(req, res, next) {
        var options = req.body;
        openstack.network.createSubnet(options, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.subnet = subnet;
            next();
        });
    }

    controller.updateSubnet = function(req, res, next) {
        var options = req.body;
        openstack.network.updateSubnet(options, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.subnet = subnet;
            next();
        });

    }

    controller.destroySubnet = function(req, res, next) {
        openstack.network.destroySubnet(req.params.id, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.subnet = subnet;
            next();
        });
    }

    controller.getPorts = function(req, res, next) {
        openstack.network.getPorts(function(err, ports) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.ports = ports;
            next();
        });
    }

    controller.getPort = function(req, res, next) {
        openstack.network.getPort(req.params.id, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.port = port;
            next();
        });
    }

    controller.createPort = function(req, res, next) {
        var options = req.body;
        openstack.network.createPort(options, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.port = port;
            next();
        });
    }

    controller.updatePort = function(req, res, next) {
        var options = req.body;
        openstack.network.updatePort(options, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.port = port;
            next();
        });
    }

    controller.destroyPort = function(req, res, next) {
        openstack.network.destroyPort(req.params.id, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.port = port;
            next();
        });
    }

    //Security groups
    controller.getSecurityGroups = function(req, res, next) {
        openstack.network.getSecurityGroups(function(err, securityGroups) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.securityGroups = securityGroups;
            next();
        });
    }

    controller.getSecurityGroup = function(req, res, next) {
        openstack.network.getSecurityGroup(req.params.id, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.securityGroup = securityGroup;
            next();
        });
    }

    controller.createSecurityGroup = function(req, res, next) {
        var options = req.body;
        openstack.network.createSecurityGroup(options, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.securityGroup = securityGroup;
            next();
        });
    }

    controller.destroySecurityGroup = function(req, res, next) {
        openstack.network.destroySecurityGroup(req.params.id, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.securityGroup = securityGroup;
            next();
        });
    }


    //Security groups rules
    controller.getSecurityGroupRules = function(req, res, next) {
        openstack.network.getSecurityGroupRules(function(err, rules) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.rules = rules;
            next();
        });
    }

    controller.getSecurityGroupRule = function(req, res, next) {
        openstack.network.getSecurityGroupRule(req.params.id, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.rule = rule;
            next();
        });
    }

    controller.createSecurityGroupRule = function(req, res, next) {
        var options = req.body;
        openstack.network.createSecurityGroupRule(options, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.rule = rule;
            next();
        });
    }

    controller.destroySecurityGroupRule = function(req, res, next) {
        openstack.network.destroySecurityGroupRule(req.params.id, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.rule = rule;
            next();
        });
    }

    return controller;
}
