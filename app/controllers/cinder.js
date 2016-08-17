var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getVolumeTypes = function(req, res, next) {

        openstack.blockstorage.getVolumeTypes(function(err, volumes) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volumes = volumes;
            next();
        });
    }

    controller.getVolumeType = function(req, res, next) {

        openstack.blockstorage.getVolumeType(req.params.id, function(err, volume) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = volume;
            next();
        });
    }

    controller.getVolumes = function(req, res, next) {

        openstack.blockstorage.getVolumes(function(err, volumes) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = volumes;
            next();
        });
    }

    controller.getVolumeById = function(req, res, next) {
        openstack.blockstorage.getVolume(req.params.id, function(err, volume) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = volume;
            next();
        });
    }

    controller.createVolume = function(req, res, next) {
        var options = req.body;
        console.log(options);
        openstack.blockstorage.createVolume(options, function(err, volume) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = volume;
            next();
        });
    }

    controller.deleteVolume = function(req, res, next) {
            console.log(req.params.id);
            openstack.blockstorage.deleteVolume(req.params.id, function(err, volume) {
                if (err) {
                    res.status(err.statusCode || 500).json(err);
                    return
                }
                req.volume = volume;
                next();
            });

        }
        //update name and description
    controller.updateVolume = function(req, res, next) {
        var volume = {
            id: req.body.id,
            name: req.body.name || 'default',
            description: req.body.description || 'default',

        }

        console.log(volume);

        openstack.blockstorage.updateVolume(volume, function(err, volume) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = volume;
            next();
        });

    }

    controller.getSnapshots = function(req, res, next) {
        openstack.blockstorage.getSnapshots(function(err, snapshots) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.snapshots = snapshots;
            next();
        });
    }

    controller.getSnapshotById = function(req, res, next) {
        openstack.blockstorage.getSnapshot(req.params.id, function(err, snapshot) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.snapshot = snapshot;
            next();
        });
    }

    controller.createSnapshot = function(req, res, next) {
        var options = {
            name: req.body.name, // required
            description: req.body.description, // required
            volumeId: req.body.volumeId, // required
            force: req.body.snapshotId || true // optional, the snapshotId to use when creating the volume
        }
        console.log(options);
        openstack.blockstorage.createSnapshot(options, function(err, snapshot) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.volume = snapshot;
            next();
        });
    }


    return controller;
};
