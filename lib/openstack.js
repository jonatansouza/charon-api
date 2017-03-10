'use strict'


var openstack       = require ('pkgcloud')
  , config          = require('config')
  , openstackConfig = config.get('openstack')
  , vmConsole       = require('./openstack-services/console')

/**
 *  pkgcloud environment
 */
exports.nova = openstack.compute.createClient(openstackConfig);

exports.glance = exports.nova;

exports.cinder = openstack.blockstorage.createClient(openstackConfig);

exports.neutron = openstack.network.createClient(openstackConfig);

/**
 *  extra functions over pkgcloud
 */

exports.console = vmConsole