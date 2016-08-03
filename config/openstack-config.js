var fs = require('fs');

var config = JSON.parse(
    fs.readFileSync(__dirname+'/../init.json')
);

exports.params = {
    provider: config.provider,
    keystoneAuthVersion: config.keystoneAuthVersion,
    username: config.username,
    password: config.password,
    region: config.region,
    authUrl: config.authUrl
}
