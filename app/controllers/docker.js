var openstack = require('../../config/openstack-utils'),
    _=require('lodash');

module.exports = function(app) {
    var controller = {};

    controller.getContainers = function(req, res, next) {
        openstack.storage.getContainers(function(err, containers) {
            if (err) {
                res.status(500).json(err);
                return
            }
            req.containers = containers;
            next();
        });
    }

    controller.getContainerById = function(req, res, next) {
        openstack.storage.getContainer(req.params.id, function(err, container) {
            if (err) {
                res.status(500).json(err);
                return
            }
            req.container = container;
            next();
        });
    }

    controller.createContainer = function(req, res, next) {
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
          req.container = container;
          next();
        })
    }
    return controller;
}
