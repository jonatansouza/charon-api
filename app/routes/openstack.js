module.exports = function(app) {
    var flavorController = app.controllers.flavor,
        imageController = app.controllers.image,
        serverController = app.controllers.server,
        volumeController = app.controllers.volume;

    //general info
    app.get('/api/openstack/version', serverController.version);
    app.get('/api/openstack/limits', serverController.limits);

    //flavor
    app.get('/api/openstack/flavors', flavorController.getFlavors);
    app.get('/api/openstack/flavors/:id', flavorController.getFlavorById);

    //image
    app.get('/api/openstack/images', imageController.getImages);
    app.post('/api/openstack/images', imageController.createImage);

    app.get('/api/openstack/images/:id', imageController.getImageById);
    app.delete('/api/openstack/images/:id', imageController.destroyImage);

    //server instances
    app.get('/api/openstack/servers', serverController.getServers);
    app.post('/api/openstack/servers', serverController.createServer);

    app.get('/api/openstack/servers/:id', serverController.getServerById);
    app.put('/api/openstack/servers/:id', serverController.rebootServer);

    //server volume attach
    app.get('/api/openstack/servers/volumes/:id', serverController.volumeAttachments);
    app.put('/api/openstack/servers/volumes', serverController.attachVolume);
    app.delete('/api/openstack/servers/volumes', serverController.detachVolume);

    //volume cinder
    //volume info
    app.get('/api/openstack/volumes/types', volumeController.getVolumeTypes);
    app.get('/api/openstack/volumes/types/:id', volumeController.getVolumeType);

    //volume
    app.get('/api/openstack/volumes', volumeController.getVolumes);
    app.post('/api/openstack/volumes', volumeController.createVolume);
    app.put('/api/openstack/volumes', volumeController.updateVolume);

    app.get('/api/openstack/volumes/:id', volumeController.getVolumeById);
    app.delete('/api/openstack/volumes/:id', volumeController.deleteVolume);

    //volume snapshots
    app.get('/api/openstack/snapshots', volumeController.getSnapshots);
    app.post('/api/openstack/snapshots', volumeController.createSnapshot);

    app.get('/api/openstack/snapshots/:id', volumeController.getSnapshotById);

};
