var openstack = require('../../config/openstack-utils');

module.exports = function(app) {
    var controller = {};

    controller.getFlavors = function(req, res) {
        openstack.compute.getFlavors(function(err, flavors) {
            if (err) {
              res.status(err.statusCode || 500).json(err);
              return
            }
            res.status(200).json(flavors);
        });
    };

    controller.getFlavorById = function(req, res){
      openstack.compute.getFlavor(req.params.id, function (err, flavor) {
        if(err){
          res.status(err.statusCode || 500).json(err);
          return
        }
          res.status(200).json(flavor);

      });
    }

    return controller;
}
