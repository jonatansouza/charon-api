var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getVolumeTypes = function(req, res) {

        openstack.blockstorage.getVolumeTypes(function(err, volumes) {
            if (err) {
                res.status(err.statusCode).json(err);
                return;
            }
            res.status(200).json(volumes);
        });
    }

    controller.getVolumeType = function(req, res) {

        openstack.blockstorage.getVolumeType(req.params.id, function(err, volume) {
            if (err) {
                res.status(err.statusCode).json(err);
                return;
            }
            res.status(200).json(volume);
        });
    }

    controller.getVolumes = function(req, res) {

        openstack.blockstorage.getVolumes(function(err, volumes) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(volumes);
        });
    }

    controller.getVolumeById = function(req, res) {
        openstack.blockstorage.getVolume(req.params.id, function(err, volume) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(volume);
        });
    }

    controller.createVolume = function(req, res) {
        var options = {
            name: req.body.name, // required
            description: req.body.description, // required
            size: req.body.size || 100, // 100-1000 gb
            volumeType: req.body.volumeType || '', // optional, defaults to spindles
            snapshotId: req.body.snapshotId || ''// optional, the snapshotId to use when creating the volume
        }
        console.log(options);
        openstack.blockstorage.createVolume(options, function(err, volume) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(volume);
        });
    }

    controller.deleteVolume = function(req, res){
      console.log(req.params.id);
      openstack.blockstorage.deleteVolume(req.params.id, function(err, volume) {
          if (err) {
              res.status(500).json(err);
              return;
          }
          res.status(200).json(volume);
      });

    }
    //update name and description
    controller.updateVolume = function(req, res){
      var volume = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description
      }

      console.log(volume);
      openstack.blockstorage.updateVolume(volume, function(err, volume) {
          if (err) {
              res.status(err.statusCode).json(err);
              return;
          }
          res.status(200).json(volume);
      });

    }

    controller.getSnapshots = function(req, res){
      openstack.blockstorage.getSnapshots(function(err, snapshots){
        if(err){
          res.status(err.statusCode).json(err);
          return
        }
        res.status(200).json(snapshots);
      });
    }

    controller.getSnapshotById = function(req, res) {
        openstack.blockstorage.getSnapshot(req.params.id, function(err, snapshot) {
            if (err) {
                res.status(err.statusCode).json(err);
                return;
            }
            res.status(200).json(snapshot);
        });
    }

    controller.createSnapshot = function(req, res) {
        var options = {
            name: req.body.name, // required
            description: req.body.description, // required
            volumeId: req.body.volumeId, // required
            force: req.body.snapshotId || true // optional, the snapshotId to use when creating the volume
        }
        console.log(options);
        openstack.blockstorage.createSnapshot(options, function(err, snapshot) {
            if (err) {
                res.status(err.statusCode).json(err);
                return;
            }
            res.status(200).json(statusCode);
        });
    }


    return controller;
};
