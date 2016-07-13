var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getImages = function(req, res) {
        openstack.compute.getImages(function(err, images) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(images);
        });
    }

    controller.getImageById = function(req, res) {
        openstack.compute.getImage(req.params.id, function(err, image) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(image);
        });
    }

    controller.destroyImage = function(req, res) {
        openstack.compute.destroyImage(req.params.id, function(err, image) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(image);
        });
    }

    controller.createImage = function(req, res) {
        var options = {
            'name': req.body.imageName,
        }

        openstack.compute.createImage(options, function(err, image) {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json(image);
        });
    }


    return controller;
};
