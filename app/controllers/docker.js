var openstack = require('../../config/openstack-utils'),
    _=require('lodash');

module.exports = function(app) {
    var controller = {};

    controller.getContainers = function(req, res) {
        openstack.storage.getContainers(function(err, containers) {
            if (err) {
                res.status(500).json(err);
                return
            }
            res.status(200).json(containers);
        });
    }

    controller.getContainerById = function(req, res) {
        openstack.storage.getContainer(req.params.id, function(err, container) {
            if (err) {
                res.status(500).json(err);
                return
            }
            res.status(200).json(container);
        });
    }

    controller.createContainer = function(req, res) {
        var options = {
            name: req.body.name,
            metadata: {
                brand:req.body.metadata.brand,
                model: req.body.metadata.model,
                year: req.body.metadata.year
            }
        }
        console.log(options);

        openstack.storage.createContainer(options, function(err, container){
          if(err){
            res.status(500).json(err);
            return
          }
          res.status(200).json(container);
        })
    }
    return controller;
}
