'use strict'


var openstack = require ('./pkgcloud')
, config = require('config');

module.exports.compute = openstack.compute.createClient(config.get('openstack'));
