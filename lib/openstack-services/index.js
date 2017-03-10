var config = require('config')
openstackAuth = config.get('openstack'),
    request = require('request-json'),
    Q = require('q'),
    data = {
        auth: {
            tenantName: openstackAuth.tenantName,
            passwordCredentials: {
                username: openstackAuth.username,
                password: openstackAuth.password
            }
        }
    };

module.exports = {
    createServiceCatalog: (callback) => {
        var deferred = Q.defer();
        var services = {}
        request.createClient(openstackAuth.authUrl).post('/v2.0/tokens', data, (error, response, body) => {
            if(error){
                deferred.reject(error);
            }
            var answer = response.body,
                token = answer.access.token.id
            answer.access.serviceCatalog.forEach((el, idx, arr) => {
                services[el.name] = {}
                services[el.name].url = el.endpoints[0].publicURL
                services[el.name].headers = {}
                services[el.name].headers['X-Auth-Token'] = token
                services[el.name].headers['Content-Type'] = "application/json"
            })
            deferred.resolve(services);
        })
        deferred.promise.nodeify(callback);
        return deferred.promise;
    }
}