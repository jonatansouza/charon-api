'use strict';
var openstack = require('../lib/openstack'),
    debug = require('debug')('charon:exportss:openstack');

/**
 * INFRAESTRUCTURE INFORMATION
 */
exports.getLimits = (req, res) => {
    openstack.nova.getLimits(function(err, limits) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(limits);
    });
};

exports.getVersion = (req, res) => {
    openstack.nova.getVersion(function(err, version) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(version);
    });
};

/**
 * SERVERS
 */
exports.getServers = (req, res) => {
    openstack.nova.getServers(function(err, servers) {
        if (err) {
            debug(err);
            return res.status(err.statusCode || 500).json(err);
        }
        res.json(servers);
    });
};

exports.getServerById = (req, res) => {
    openstack.nova.getServer(req.params.id, function(err, servers) {
        if (err) {
            debug(err);
            return res.status(err.statusCode || 500).json(err);
        }
        res.json(servers);
    });
};

exports.createServer = (req, res) => {
    var options = req.body;
    if (options.networks == null) {
        options.networks = [{
            "uuid": "5ebecb97-dab0-4d13-8397-14e806a79d83"
        }];
    }
    openstack.nova.createServer(options, function(err, server) {
        if (err) {
            console.log(err);
            return res.status(err.statusCode || 500).json(err);
        }
        res.json(server);
    });
};

exports.createServerDefault = (req, res) => {
    var options = req.body;
    openstack.neutron.getNetworks(function(err, networks) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        var privateNetwork = {};
        networks.forEach(function(el, index, array) {
            if (!el.shared) {
                options.networks = [{
                    "uuid": el.id
                }];
            }
        });
        openstack.nova.createServer(options, function(err, server) {
            if (err) {
                if (err.statusCode == 400) {
                    return res.status(err.statusCode || 500).json({
                        result: err.result.badRequest.message
                    });
                } else {
                    return res.status(err.statusCode || 500).json(err);
                }
            }
            res.json(server);
        });
    });
}

exports.destroyServer = (req, res) => {
    openstack.nova.destroyServer(req.params.id, function(err, server) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(server);
    });
};

exports.rebootServer = (req, res) => {
    openstack.nova.rebootServer(req.params.id, function(err, server) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(server);
    });
};

exports.updateStateServer = (req, res) => {
    if (req.body.status === "RUNNING") {
        openstack.nova.stopServer(req.body.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.json({
                status: 'ok',
                server: req.body.name,
                state: 'stoped'
            });

        });
    } else {
        openstack.nova.startServer(req.body.id, function(err, server) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            res.json({
                status: 'ok',
                server: req.body.name,
                state: 'started'
            });
        });
    }
};

exports.stopServer = (req, res) => {
    openstack.nova.stopServer(req.params.id, function(err, server) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json({
            status: 'ok',
            server: req.params.id,
            state: 'stoped'
        });
    });
};

exports.starServer = (req, res) => {
    openstack.nova.starServer(req.params.id, function(err, server) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json({
            status: 'ok',
            server: req.params.id,
            state: 'started'
        });
    });
};

/**
 * FLavors
 **/

exports.getFlavors = (req, res) => {
    openstack.nova.getFlavors(function(err, flavors) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(flavors);
    });
};

exports.getFlavorById = (req, res) => {
    openstack.nova.getFlavor(req.params.id, function(err, flavor) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(flavor);
    });
};


/**
 * IMAGES
 */

exports.getImages = (req, res) => {
    openstack.glance.getImages(function(err, images) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(images);
    });
}

exports.getImageById = (req, res) => {
    openstack.glance.getImage(req.params.id, function(err, image) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(image);
    });
}

exports.destroyImage = (req, res) => {
    openstack.glance.destroyImage(req.params.id, function(err, image) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(image);
    });
}

exports.createImage = (req, res) => {
    openstack.glance.createImage(req.body, function(err, image) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(image);
    });
}

/**
 * BLOCKSTORAGE VOLUMES
 */

exports.getVolumeTypes = (req, res) => {

    openstack.cinder.getVolumeTypes(function(err, volumes) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volumes);

    });
}

exports.getVolumeType = (req, res) => {

    openstack.cinder.getVolumeType(req.params.id, function(err, volume) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volume);

    });
}

exports.getVolumes = (req, res) => {

    openstack.cinder.getVolumes(function(err, volumes) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volumes);

    });
}

exports.getVolumeById = (req, res) => {
    openstack.cinder.getVolume(req.params.id, function(err, volume) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volume);

    });
}

exports.createVolume = (req, res) => {
    var options = req.body;
    openstack.cinder.createVolume(options, function(err, volume) {
        if (err) {
            if (err.statusCode == 413) {
                res.status(err.statusCode || 500).json({
                    result: err.result.overLimit.message
                });
                return
            } else {
                res.status(err.statusCode || 500).json(err);
                return
            }
        }
        res.json(volume);

    });
}

exports.deleteVolume = (req, res) => {
    console.log(req.params.id);
    openstack.cinder.deleteVolume(req.params.id, function(err, volume) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volume);

    });

}
//update name and description
exports.updateVolume = (req, res) => {
    var volume = {
        id: req.body.id,
        name: req.body.name || 'default',
        description: req.body.description || 'default',

    }
    openstack.cinder.updateVolume(volume, function(err, volume) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(volume);

    });

}

exports.handlerVolume = (req, res) => {
    var serverId = req.body.server.id || req.body.server;
    var volumeId = req.body.volume.id || req.body.volume;
    if (!(typeof req.body.volume.status == 'undefined') || req.body.volume.status == 'available') {
        console.log('attach');
        openstack.nova.attachVolume(serverId, volumeId, function(err, volume) {
            if (err) {
                if (err.statusCode == 202 || err.statusCode == 204) {
                    res.status(200).json({
                        "message": "volume attached"
                    });
                    return
                }
                res.status(err.statusCode || 500).json(err);
                return
            } else {
                res.json(volume)
                return
            }
        });
    } else {
        console.log('detachVolume');
        openstack.nova.detachVolume(serverId, volumeId, function(err) {
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
            res.json(volume)
        });
    }
}


exports.volumeAttachments = (req, res) => {
    openstack.nova.getVolumeAttachments(req.params.id, function(err, volumes) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        } else {
            res.json(volumes);
        }

    });
}

exports.attachVolume = (req, res) => {
    serverId = req.body.server;
    volumeId = req.body.volume;

    openstack.nova.attachVolume(serverId, volumeId, function(err, volume) {
        if (err) {
            if (err.statusCode == 202 || err.statusCode == 204) {
                res.status(200).json({
                    "message": "volume attached"
                });
                return
            }
            res.status(err.statusCode || 500).json(err);
            return
        } else {
            res.json(volume)
            return
        }
    });
}

exports.detachVolume = (req, res) => {
    var serverId = req.body.server.id || req.body.server;
    var volumeId = req.body.volume.id || req.body.volume;

    openstack.nova.detachVolume(serverId, volumeId, function(err) {
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
        res.json(volume);
    });
}

exports.getSnapshots = (req, res) => {
    openstack.cinder.getSnapshots(function(err, snapshots) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(snapshots);

    });
}

exports.getSnapshotById = (req, res) => {
    openstack.cinder.getSnapshot(req.params.id, function(err, snapshot) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(snapshot);

    });
}

exports.createSnapshot = (req, res) => {
    openstack.cinder.createSnapshot(req.body, function(err, snapshot) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(snapshot);

    });
}

/**
 * SECURITY RESOURCES
 */

exports.getKeys = (req, res) => {
    openstack.nova.listKeys(function(err, keys) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(keys);
    });
};

exports.addKey = (req, res) => {
    openstack.nova.addKey(req.body, function(err, key) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(key);
    });
};

exports.removeKey = (req, res) => {
    openstack.nova.destroyKey(req.params.id, function(err, key) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(key);
    });
};


exports.getGroups = (req, res) => {
    openstack.nova.listGroups(function(err, groups) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(groups);
    });
}

exports.addGroup = (req, res) => {
    openstack.nova.addGroup(req.body, function(err, group) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(group);
    });
}
exports.addRule = (req, res) => {
    openstack.nova.addRule(req.body, function(err, rule) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        req.rule = rule;

    });
};

/**
 * NETWORKS
 */

exports.getNetworks = (req, res) => {
    openstack.neutron.getNetworks(function(err, networks) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(networks);

    });
}

exports.getNetwork = (req, res) => {
    openstack.neutron.getNetwork(req.params.id, function(err, network) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(network);

    });
}

exports.createNetwork = (req, res) => {
    var options = req.body;
    openstack.neutron.createNetwork(options, function(err, network) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(network);

    });
}

exports.updateNetwork = (req, res) => {
    var options = req.body;
    openstack.neutron.updateNetwork(options, function(err, network) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(network);

    });

}

exports.destroyNetwork = (req, res) => {
    openstack.neutron.destroyNetwork(req.params.id, function(err, network) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(network);

    });
}

exports.getSubnets = (req, res) => {
    openstack.neutron.getSubnets(function(err, subnets) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(subnets);

    });
}

exports.getSubnet = (req, res) => {
    openstack.neutron.getSubnet(req.params.id, function(err, subnet) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(subnet);

    });
}

exports.createSubnet = (req, res) => {
    var options = req.body;
    openstack.neutron.createSubnet(options, function(err, subnet) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(subnet);

    });
}

exports.updateSubnet = (req, res) => {
    var options = req.body;
    openstack.neutron.updateSubnet(options, function(err, subnet) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(subnet);

    });

}

exports.destroySubnet = (req, res) => {
    openstack.neutron.destroySubnet(req.params.id, function(err, subnet) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(subnet);

    });
}

exports.getPorts = (req, res) => {
    openstack.neutron.getPorts(function(err, ports) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(ports);

    });
}

exports.getPort = (req, res) => {
    openstack.neutron.getPort(req.params.id, function(err, port) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(port);

    });
}

exports.createPort = (req, res) => {
    var options = req.body;
    openstack.neutron.createPort(options, function(err, port) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(port);
    });
}

exports.updatePort = (req, res) => {
    var options = req.body;
    openstack.neutron.updatePort(options, function(err, port) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(port);

    });
}

exports.destroyPort = (req, res) => {
    openstack.neutron.destroyPort(req.params.id, function(err, port) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(port);

    });
}

//Security groups
exports.getSecurityGroups = (req, res) => {
    openstack.neutron.getSecurityGroups(function(err, securityGroups) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(securityGroups);

    });
}

exports.getSecurityGroup = (req, res) => {
    openstack.neutron.getSecurityGroup(req.params.id, function(err, securityGroup) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(securityGroup);
    });
}

exports.createSecurityGroup = (req, res) => {
    var options = req.body;
    openstack.neutron.createSecurityGroup(options, function(err, securityGroup) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(securityGroup);
    });
}

exports.destroySecurityGroup = (req, res) => {
    openstack.neutron.destroySecurityGroup(req.params.id, function(err, securityGroup) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(securityGroup);
    });
}


//Security groups rules
exports.getSecurityGroupRules = (req, res) => {
    openstack.neutron.getSecurityGroupRules(function(err, rules) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(rules);
    });
}

exports.getSecurityGroupRule = (req, res) => {
    openstack.neutron.getSecurityGroupRule(req.params.id, function(err, rule) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(rule);

    });
}

exports.createSecurityGroupRule = (req, res) => {
    var options = req.body;
    openstack.neutron.createSecurityGroupRule(options, function(err, rule) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(rule);
    });
}

exports.destroySecurityGroupRule = (req, res) => {
    openstack.neutron.destroySecurityGroupRule(req.params.id, function(err, rule) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(rule);
    });
}

exports.getFloatingIps = (req, res) => {
    openstack.nova.getFloatingIps(function(err, ipsFromOpenstack) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(ipsFromOpenstack);
    });
};
exports.allocateNewFloatingIp = (req, res) => {
    console.log('allocate floating');
    var unused_floating_ips;
    openstack.nova.getFloatingIps(function(err, ips) {
        for (i = 0; i < ips.length; i++) {
            if (!ips[i].instance_id) {
                unused_floating_ips = ips[i];
                break;
            }
        }
        if (unused_floating_ips) {
            req.ipFree = unused_floating_ips;

        } else {
            openstack.nova.allocateNewFloatingIp(function(err, ip) {
                if (err) {
                    res.status(err.statusCode || 500).json(err);
                    return
                }
                res.json(ip);
            });
        }
    });
}

exports.addFloatingIp = (req, res) => {
    var server = req.body;
    var unused_floating_ips;
    console.log('addFloatingIp');
    openstack.nova.getFloatingIps(function(err, ips) {
        for (var i = 0; i < ips.length; i++) {
            if (!ips[i].instance_id) {
                unused_floating_ips = ips[i];
                break;
            }
        }
        if (unused_floating_ips) {
            console.log(unused_floating_ips);
            console.log('inused ip ' + unused_floating_ips);
            addToInstance(unused_floating_ips);
        } else {
            console.log('allocate before');
            openstack.nova.allocateNewFloatingIp(function(err, ip) {
                if (err) {
                    if (err.statusCode == 404) {
                        res.status(err.statusCode).json(err.result.itemNotFound.message)
                    } else {
                        res.status(err.statusCode || 500).json(err);
                    }
                } else {
                    console.log('new allocate' + ip);
                    addToInstance(ip)
                }
            });
        }
    });

    function addToInstance(ip) {
        var interval = setInterval(function() {
            if (server.status != 'PROVISIONING') {
                clearInterval(interval);
                openstack.nova.addFloatingIp(server.id, ip, function(err, server) {
                    if (err) {
                        res.status(err.statusCode || 500).json(err);
                        return
                    }
                    res.json(ip);
                });
            } else {
                openstack.nova.getServer(server.id, function(err, s) {
                    if (err) {
                        res.status(err.statusCode || 500).json(err);
                        return
                    }
                    server = s;
                });
            }
        }, 5000);
    }


};

exports.removeFloatingIp = (req, res) => {
    var server = req.body.server.id || req.body.server;
    var floatingIp = req.body.floatingIp.id || req.body.floatingIp;
    openstack.nova.removeFloatingIp(server, floatingIp, function(err, s) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json({
            server: req.body.server.name || server,
            floatingIp: floatingIp
        });
    });
};

exports.deallocateFloatingIp = (req, res) => {
    var ip = {};
    ip.id = req.body.floatingIp;
    openstack.nova.deallocateFloatingIp(ip, function(err, ip) {
        if (err) {
            res.status(err.statusCode || 500).json(err);
            return
        }
        res.json(ip);
    });
}
