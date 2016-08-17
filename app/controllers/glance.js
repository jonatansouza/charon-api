var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getImages = function(req, res, next) {
        openstack.compute.getImages(function(err, images) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.images = images;
            next();
        });
    }

    controller.getImageById = function(req, res, next) {
        openstack.compute.getImage(req.params.id, function(err, image) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.image = image;
            next();
        });
    }

    controller.destroyImage = function(req, res, next) {
        openstack.compute.destroyImage(req.params.id, function(err, image) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.image = image;
            next();
        });
    }

    controller.createImage = function(req, res, next) {
        var options = req.body;
        console.log(options);
        openstack.compute.createImage(options, function(err, image) {
            if (err) {
                res.status(err.statusCode || 500).json(err);
                return
            }
            req.image = image;
            next();
        });
    }


    return controller;
};
