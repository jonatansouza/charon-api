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

    controller.getNetwork = function(req, res) {
        openstack.network.getNetwork(req.params.id, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(network);

        });
    }

    controller.createNetwork = function(req, res) {
        var options = req.body;
        openstack.network.createNetwork(options, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(network);

        });
    }

    controller.updateNetwork = function(req, res) {
        var options = req.body;
        openstack.network.updateNetwork(options, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(network);
        });

    }

    controller.destroyNetwork = function(req, res) {
        openstack.network.destroyNetwork(req.params.id, function(err, network) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(network);
        });
    }

    controller.getSubnets = function(req, res) {
        openstack.network.getSubnets(function(err, subnets) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(subnets);
        });
    }

    controller.getSubnet = function(req, res) {
        openstack.network.getSubnet(req.params.id, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(subnet);
        });
    }

    controller.createSubnet = function(req, res) {
        var options = req.body;
        openstack.network.createSubnet(options, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(subnet);
        });
    }

    controller.updateSubnet = function(req, res) {
        var options = req.body;
        openstack.network.updateSubnet(options, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(subnet);
        });

    }

    controller.destroySubnet = function(req, res) {
        openstack.network.destroySubnet(req.params.id, function(err, subnet) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(subnet);
        });
    }

    controller.getPorts = function(req, res) {
        openstack.network.getPorts(function(err, ports) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(ports);
        });
    }

    controller.getPort = function(req, res) {
        openstack.network.getPort(req.params.id, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(port);
        });
    }

    controller.createPort = function(req, res) {
        var options = req.body;
        openstack.network.createPort(options, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(port);
        });
    }

    controller.updatePort = function(req, res) {
        var options = req.body;
        openstack.network.updatePort(options, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(port);
        });
    }

    controller.destroyPort = function(req, res) {
        openstack.network.destroyPort(req.params.id, function(err, port) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(port);
        });
    }

    //Security groups
    controller.getSecurityGroups = function(req, res) {
        openstack.network.getSecurityGroups(function(err, securityGroups) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(securityGroups);
        });
    }

    controller.getSecurityGroup = function(req, res) {
        openstack.network.getSecurityGroup(req.params.id, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(securityGroup);
        });
    }

    controller.createSecurityGroup = function(req, res) {
        var options = req.body;
        openstack.network.createSecurityGroup(options, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(securityGroup);
        });
    }

    controller.destroySecurityGroup = function(req, res) {
        openstack.network.destroySecurityGroup(req.params.id, function(err, securityGroup) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(securityGroup);
        });
    }


    //Security groups rules
    controller.getSecurityGroupRules = function(req, res) {
        openstack.network.getSecurityGroupRules(function(err, rules) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(rules);
        });
    }

    controller.getSecurityGroupRule = function(req, res) {
        openstack.network.getSecurityGroupRule(req.params.id, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(rule);
        });
    }

    controller.createSecurityGroupRule = function(req, res) {
        var options = req.body;
        openstack.network.createSecurityGroupRule(options, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(rule);
        });
    }

    controller.destroySecurityGroupRule = function(req, res) {
        openstack.network.destroySecurityGroupRule(req.params.id, function(err, rule) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(rule);
        });
    }

    controller.getFloatingIps = function(req, res) {
        openstack.network.getFloatingIps(function(err, ips) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.status(200).json(ips);
        });
    };

    return controller;
}
