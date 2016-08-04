module.exports = function(app) {
    var novaController = app.controllers.nova,
        glanceController = app.controllers.glance,
        cinderController = app.controllers.cinder;
        neutronController = app.controllers.neutron;

    //general info
    app.get('/api/openstack/version', novaController.version);
    app.get('/api/openstack/limits', novaController.limits);

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

    //network neutron
    app.get('/api/openstack/networks', neutronController.getNetworks);

};
