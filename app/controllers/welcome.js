module.exports = function(app) {
    var controller = {};
    controller.welcome = function(req, res) {
        res.json({
            "Charon": {
                "message": "Welcome to Charon-api",
                "docs": "https://github.com/jonatansouza/charon-api",
                "patternUrl": "/api/openstack/"
            }
        });
    }
    return controller;
}
