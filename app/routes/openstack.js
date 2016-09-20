module.exports = function(app) {
    var novaController = app.controllers.nova,
        glanceController = app.controllers.glance,
        cinderController = app.controllers.cinder,
        neutronController = app.controllers.neutron,
        dockerController = app.controllers.docker,
        welcomeController = app.controllers.welcome;

    app.get('/', welcomeController.welcome);
    //general info
    app.get('/api/openstack/version',
        novaController.version,
        (req, res) => {
            res.json(req.version)
        }
    );
    app.get('/api/openstack/limits',
        novaController.limits,
        (req, res) => {
            res.json(req.limits);
        }
    );

    //ssh keys
    app.get('/api/openstack/keys',
        novaController.getKeys,
        (req, res) => {
            res.json(req.keys);
        }
    );
    app.post('/api/openstack/keys',
        novaController.addKey,
        (req, res) => {
            res.json(req.key);
        }
    );

    app.delete('/api/openstack/keys/:id',
        novaController.removeKey,
        (req, res) => {
            res.json(req.key);
        });

    //Groups

    app.get('/api/openstack/groups',
        novaController.getGroups,
        (req, res) => {
            res.json(req.groups);
        }
    );

    app.get('/api/openstack/groups/:id',
        neutronController.getSecurityGroup,
        (req, res) => {
            res.json(req.securityGroup);
        }
    );

    app.post('/api/openstack/groups',
        novaController.addGroup,
        (req, res) => {
            res.json(req.group);
        }
    );
    app.delete('/api/openstack/groups/:id', neutronController.destroySecurityGroup,
        (req, res) => {
            res.json(req.securityGroup);
        }
    );

    app.get('/api/openstack/rules',
        neutronController.getSecurityGroupRules,
        (req, res) => {
            res.json(req.rules);
        }
    );

    app.get('/api/openstack/rules/:id',
        neutronController.getSecurityGroupRule,
        (req, res) => {
            res.json(req.rule);
        }
    );
    app.delete('/api/openstack/rules/:id', neutronController.destroySecurityGroupRule,
        (req, res) => {
            res.json(req.rule);
        }
    );
    app.post('/api/openstack/rules',
        novaController.addRule,
        (req, res) => {
            res.json(req.rules);
        }
    );

    //flavor
    app.get('/api/openstack/flavors',
        novaController.getFlavors,
        (req, res) => {
            res.json(req.flavors);
        }
    );
    app.get('/api/openstack/flavors/:id',
        novaController.getFlavorById,
        (req, res) => {
            res.json(req.flavor);
        }
    );

    //image
    app.get('/api/openstack/images',
        glanceController.getImages,
        (req, res) => {
            res.json(req.images);
        }
    );
    app.post('/api/openstack/images',
        glanceController.createImage,
        (req, res) => {
            res.json(req.image);
        }
    );

    app.get('/api/openstack/images/:id',
        glanceController.getImageById,
        (req, res) => {
            res.json(req.image);
        }
    );
    app.delete('/api/openstack/images/:id',
        glanceController.destroyImage,
        (req, res) => {
            res.json(req.image);
        }
    );

    //server instances
    app.get('/api/openstack/clean/servers',
        novaController.cleanServers,
        (req, res) => {
            res.json("{msg:clean}");
        }

    );


    app.get('/api/openstack/server/stop/:id',
        novaController.stopServer,
        (req, res) => {
            res.json(req.server);
        }
    );

    app.get('/api/openstack/server/start/:id',
        novaController.startServer,
        (req, res) => {
            res.json(req.server);
        }
    );

    app.get('/api/openstack/servers',
        novaController.getServers,
        (req, res) => {
            res.json(req.servers);
        }
    );

    app.post('/api/openstack/servers',
        novaController.createServer,
        (req, res) => {
            res.json(req.server);
        }
    );

    app.get('/api/openstack/servers/:id',
        novaController.getServerById,
        (req, res) => {
            res.json(req.server);
        }
    );

    app.put('/api/openstack/servers/:id',
        novaController.rebootServer,
        (req, res) => {
            res.json(req.server);
        }
    );

    app.delete('/api/openstack/servers/:id',
        novaController.destroyServer,
        (req, res) => {
            res.json(req.server);
        }
    );

    //server volume attach
    app.get('/api/openstack/attachments',
        novaController.volumeAttachments,
        (req, res) => {
            res.json(req.volumes);
        }
    );
    app.post('/api/openstack/attach',
        novaController.attachVolume,
        (req, res) => {
            res.json(req.volume);
        }
    );
    app.post('/api/openstack/detach',
        novaController.detachVolume,
        (req, res) => {
            res.json(req.volume);
        }
    );

    //volume cinder
    //volume info
    app.get('/api/openstack/types',
        cinderController.getVolumeTypes,
        (req, res) => {
            res.json(req.volumes);
        }
    );
    app.get('/api/openstack/types/:id',
        cinderController.getVolumeType,
        (req, res) => {
            res.json(req.volume);
        }
    );

    //volume
    app.get('/api/openstack/volumes',
        cinderController.getVolumes,
        (req, res) => {
            res.json(req.volumes);
        }
    );

    app.post('/api/openstack/volumes',
        cinderController.createVolume,
        (req, res) => {
            res.json(req.volume);
        }
    );
    app.put('/api/openstack/volumes',
        cinderController.updateVolume,
        (req, res) => {
            res.json(req.volume);
        }
    );

    app.get('/api/openstack/volumes/:id',
        cinderController.getVolumeById,
        (req, res) => {
            res.json(req.volume);
        }
    );
    app.delete('/api/openstack/volumes/:id',
        cinderController.deleteVolume,
        (req, res) => {
            res.json(req.volume);
        }
    );

    //volume snapshots
    app.get('/api/openstack/snapshots',
        cinderController.getSnapshots,
        (req, res) => {
            res.json(req.snapshots);
        }
    );
    app.post('/api/openstack/snapshots',
        cinderController.createSnapshot,
        (req, res) => {
            res.json(req.snapshot);
        }
    );

    app.get('/api/openstack/volumes/snapshots/:id', cinderController.getSnapshotById,
        (req, res) => {
            res.json(req.snapshot);
        }
    );

    //NETWORK NEUTRON
    //networs
    app.get('/api/openstack/networks',
        neutronController.getNetworks,
        (req, res) => {
            res.json(req.networks);
        }
    );
    app.get('/api/openstack/networks/:id',
        neutronController.getNetwork,
        (req, res) => {
            res.json(req.network);
        }
    );
    app.post('/api/openstack/networks',
        neutronController.createNetwork,
        (req, res) => {
            res.json(req.network);
        }
    );
    app.put('/api/openstack/networks',
        neutronController.updateNetwork,
        (req, res) => {
            res.json(req.network);
        }
    );
    app.delete('/api/openstack/networks/:id',
        neutronController.destroyNetwork,
        (req, res) => {
            res.json(req.network);
        }
    );

    //subnets
    app.get('/api/openstack/subnets',
        neutronController.getSubnets,
        (req, res) => {
            res.json(req.subnets);
        }
    );
    app.get('/api/openstack/subnets/:id',
        neutronController.getSubnet,
        (req, res) => {
            res.json(req.subnet);
        }
    );
    app.post('/api/openstack/subnets',
        neutronController.createSubnet,
        (req, res) => {
            res.json(req.subnet);
        }
    );
    app.put('/api/openstack/subnets',
        neutronController.updateSubnet,
        (req, res) => {
            res.json(req.subnet);
        }
    );
    app.delete('/api/openstack/subnets/:id',
        neutronController.destroySubnet,
        (req, res) => {
            res.json(req.subnet);
        }
    );

    //ports
    app.get('/api/openstack/ports',
        neutronController.getPorts,
        (req, res) => {
            res.json(req.ports);
        }
    );
    app.get('/api/openstack/ports/:id',
        neutronController.getPort,
        (req, res) => {
            res.json(req.port);
        }
    );
    app.post('/api/openstack/ports',
        neutronController.createPort,
        (req, res) => {
            res.json(req.port);
        }
    );
    app.put('/api/openstack/ports',
        neutronController.updatePort,
        (req, res) => {
            res.json(req.port);
        }
    );
    app.delete('/api/openstack/ports/:id',
        neutronController.destroyPort,
        (req, res) => {
            res.json(req.port);
        }
    );

    //ips
    app.get('/api/openstack/ips',
        novaController.getFloatingIps,
        (req, res) => {
            res.json(req.ipsFromOpenstack);
        }
    );
    app.post('/api/openstack/ips',
        novaController.allocateNewFloatingIp,
        (req, res) => {
            res.json(req.ip);
        }
    );
    app.post('/api/openstack/allocate',
        novaController.allocateNewFloatingIp,
        novaController.addFloatingIp,
        (req, res) => {
            res.json(req.server);
        }
    );

    //containers
    app.get('/api/openstack/containers',
        dockerController.getContainers,
        (req, res) => {
            res.json(req.containers);
        }
    );

    //IoT Instance
    app.post('/api/openstack/iot',
        novaController.createServer,
        novaController.allocateNewFloatingIp,
        novaController.addFloatingIp,
        (req, res) => {
            res.json(req.server);
        }
    );
};
