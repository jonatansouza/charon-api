var openstack = require('./openstack-config')
,   pkgcloud = require('pkgcloud');

exports.storage = pkgcloud.storage.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});

exports.compute = pkgcloud.compute.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});

exports.blockstorage = pkgcloud.blockstorage.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});

exports.network = pkgcloud.network.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});
