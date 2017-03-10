var osServices = require('.'),
    request = require('request')


exports.getConsole = (serverId, callback) => {

    var deferred = Q.defer();
    osServices.createServiceCatalog().then((servicesCatalog) => {
        var url = servicesCatalog.nova.url + "/servers/" + serverId + "/action";
        var data = {
            url: url,
            json: {
                "os-getVNCConsole": {
                    "type": "novnc"
                }
            },
            headers: servicesCatalog.nova.headers
        }
        
        request.post(data, (err, response) => {
            
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(response.body);
            }
        });
        deferred.promise.nodeify(callback);
        return deferred.promise;
    })

}