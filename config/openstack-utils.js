var openstack = require('./openstack-config');

exports.storage = require('pkgcloud').storage.createClient({
  provider: 'openstack',
  username: openstack.storage.username,
  password: openstack.storage.password,
  authUrl: openstack.storage.authUrl
});

exports.compute = require('pkgcloud').compute.createClient({
    provider: 'openstack',
    username: openstack.compute.username,
    password: openstack.compute.password,
    tenantId: openstack.compute.tenantId,
    region: openstack.compute.region,
    authUrl: openstack.compute.authUrl
});

exports.blockstorage = require('pkgcloud').blockstorage.createClient({
    provider: 'openstack',
    username: openstack.compute.username,
    password: openstack.compute.password,
    tenantId: openstack.compute.tenantId,
    region: openstack.compute.region,
    authUrl: openstack.compute.authUrl
});
