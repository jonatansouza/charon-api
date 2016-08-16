/**
TODO
  FIXED correct place to put securityGroup and securityGroupRules
TODO
*/


module.exports = function(app) {
    var novaController = app.controllers.nova,
        glanceController = app.controllers.glance,
        cinderController = app.controllers.cinder;
        neutronController = app.controllers.neutron;

    //general info
    app.get('/api/openstack/version', novaController.version);
    app.get('/api/openstack/limits', novaController.limits);

    //ssh keys
    app.get('/api/openstack/keys', novaController.getKeys);
    app.post('/api/openstack/keys', novaController.addKey);

    //Groups
    app.get('/api/openstack/groups', novaController.getGroups);
    app.post('/api/openstack/groups', novaController.addGroup);
    app.post('/api/openstack/groups/rules', novaController.addRule);

    //flavor
    app.get('/api/openstack/flavors', novaController.getFlavors);
    app.get('/api/openstack/flavors/:id', novaController.getFlavorById);

    //image
    app.get('/api/openstack/images', glanceController.getImages);
    app.post('/api/openstack/images', glanceController.createImage);

    app.get('/api/openstack/images/:id', glanceController.getImageById);
    app.delete('/api/openstack/images/:id', glanceController.destroyImage);

    //server instances
    app.get('/api/openstack/servers', novaController.getServers);
    app.post('/api/openstack/servers', novaController.createServer);

    app.get('/api/openstack/servers/:id', novaController.getServerById);
    app.put('/api/openstack/servers/:id', novaController.rebootServer);

    app.delete('/api/openstack/servers/:id', novaController.destroyServer);

    //server volume attach
    app.get('/api/openstack/servers/volumes/:id', novaController.volumeAttachments);
    app.post('/api/openstack/servers/volumes/attach', novaController.attachVolume);
    app.post('/api/openstack/servers/volumes/detach', novaController.detachVolume);

    //volume cinder
    //volume info
    app.get('/api/openstack/volumes/types', cinderController.getVolumeTypes);
    app.get('/api/openstack/volumes/types/:id', cinderController.getVolumeType);

    //volume
    app.get('/api/openstack/volumes', cinderController.getVolumes);
    app.post('/api/openstack/volumes', cinderController.createVolume);
    app.put('/api/openstack/volumes', cinderController.updateVolume);

    app.get('/api/openstack/volumes/:id', cinderController.getVolumeById);
    app.delete('/api/openstack/volumes/:id', cinderController.deleteVolume);

    //volume snapshots
    app.get('/api/openstack/volumes/snapshots', cinderController.getSnapshots);
    app.post('/api/openstack/volumes/snapshots', cinderController.createSnapshot);

    app.get('/api/openstack/volumes/snapshots/:id', cinderController.getSnapshotById);

    //NETWORK NEUTRON
    //networs
    app.get('/api/openstack/networks', neutronController.getNetworks);
    app.get('/api/openstack/networks/:id', neutronController.getNetwork);
    app.post('/api/openstack/networks', neutronController.createNetwork);
    app.put('/api/openstack/networks', neutronController.updateNetwork);
    app.delete('/api/openstack/networks/:id', neutronController.destroyNetwork);

    //subnets
    app.get('/api/openstack/subnets', neutronController.getSubnets);
    app.get('/api/openstack/subnets/:id', neutronController.getSubnet);
    app.post('/api/openstack/subnets', neutronController.createSubnet);
    app.put('/api/openstack/subnets', neutronController.updateSubnet);
    app.delete('/api/openstack/subnets/:id', neutronController.destroySubnet);

    //ports
    app.get('/api/openstack/ports', neutronController.getPorts);
    app.get('/api/openstack/ports/:id', neutronController.getPort);
    app.post('/api/openstack/ports', neutronController.createPort);
    app.put('/api/openstack/ports', neutronController.updatePort);
    app.delete('/api/openstack/ports/:id', neutronController.destroyPort);

    //ips
    app.get('/api/openstack/ips', novaController.getFloatingIps);
    app.post('/api/openstack/ips', novaController.allocateNewFloatingIp);

    //securityGroup

    /*app.get('/api/openstack/networks/groups', neutronController.getSecurityGroups);
    app.get('/api/openstack/networks/groups/:id', neutronController.getSecurityGroup);

    app.post('/api/openstack/networks/groups', neutronController.createSecurityGroup);
    app.delete('/api/openstack/networks/groups/:id', neutronController.destroySecurityGroup);

    //securityGroupRules
    app.get('/api/openstack/networks/groups/rules', neutronController.getSecurityGroupRules);
    app.get('/api/openstack/networks/groups/rules/:id', neutronController.getSecurityGroupRule);
    app.post('/api/openstack/networks/groups/rules', neutronController.createSecurityGroupRule);
    app.delete('/api/openstack/networks/groups/rules/:id', neutronController.destroySecurityGroupRule);
    */
};
