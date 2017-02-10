'use strict'


var openstack       = require ('pkgcloud')
  , config          = require('config')
  , openstackConfig = config.get('openstack')

exports.nova = openstack.compute.createClient(openstackConfig);

exports.glance = exports.nova;

exports.cinder = openstack.blockstorage.createClient(openstackConfig);

exports.neutron = openstack.network.createClient(openstackConfig);
