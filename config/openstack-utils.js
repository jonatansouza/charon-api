var openstack = require('./openstack-config');

exports.storage = require('pkgcloud').storage.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});

exports.compute = require('pkgcloud').compute.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});

exports.blockstorage = require('pkgcloud').blockstorage.createClient({
    provider: 'openstack',
    username: openstack.params.username,
    password: openstack.params.password,
    region: openstack.params.region,
    authUrl: openstack.params.authUrl
});
