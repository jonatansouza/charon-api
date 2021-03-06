'use strict';

var express = require('express'),
    router = express.Router(),
    openstack = require('../controllers/openstack');

/**
 * INFRAESTRUCTURE INFORMATION
 */
router
    .route('/version')
    .get(openstack.getVersion)

router
    .route('/limits')
    .get(openstack.getLimits)

/**
 * SERVERS
 */

router
    .route('/servers')
    .get(openstack.getServers)
    .post(openstack.createServerDefault)

router
    .route('/servers/:id')
    .get(openstack.getServerById)
    .put(openstack.rebootServer)
    .delete(openstack.destroyServer);

router
    .route('/server')
    .post(openstack.updateStateServer)

router
    .route('/server/ip/add')
    .post(openstack.addFloatingIp)

router
    .route('/server/ip/rm')
    .post(openstack.removeFloatingIp);

/**
 * SECURITY RESOURCES
 */
router
    .route('/keys')
    .get(openstack.getKeys)
    .post(openstack.addKey)
    .delete(openstack.removeKey);
router
    .route('/groups')
    .get(openstack.getGroups)
    .post(openstack.addGroup);
router
    .route('/rules')
    .post(openstack.addRule);

/**
 * IMAGES
 */

router
    .route('/images')
    .get(openstack.getImages)
    .post(openstack.createImage)

router
    .route('/images/:id')
    .get(openstack.getImageById)
    .delete(openstack.destroyImage)

/**
 * BLOCKSTORAGE
 */

router
    .route('/volumes')
    .get(openstack.getVolumes)
    .post(openstack.createVolume)
    .put(openstack.updateVolume);

router
    .route('/volumes/:id')
    .get(openstack.getVolumeById)
    .delete(openstack.deleteVolume);

router
    .route('/volume')
    .post(openstack.handlerVolume)
  
router
    .route('/types')
    .get(openstack.getVolumeTypes);

router
    .route('/types/:id')
    .get(openstack.getVolumeType);

/**
 * NETWORK
 */
router
    .route('/networks')
    .get(openstack.getNetworks)
    .post(openstack.createNetwork)
    .put(openstack.updateNetwork);

router
    .route('/networks/id')
    .get(openstack.getNetwork)
    .delete(openstack.destroyNetwork);

router
    .route('/ips')
    .get(openstack.getFloatingIps)
    .post(openstack.allocateNewFloatingIp)

router
    .route('/ports')
    .get(openstack.getPorts)
    .post(openstack.createPort)
    .put(openstack.updatePort)

router
    .route('/ports/:id')
    .get(openstack.getPort)
    .delete(openstack.destroyPort);

router
    .route('/subnets')
    .get(openstack.getSubnets)
    .post(openstack.createSubnet)
    .put(openstack.updateSubnet);

router
    .route('/subnets/:id')
    .get(openstack.getSubnet)
    .delete(openstack.destroySubnet);

router
    .route('/flavors')
    .get(openstack.getFlavors);

router
    .route('/flavors/:id')
    .get(openstack.getFlavorById);

/**
 *  Console
 */

router
    .route('/console/:id')
    .get(openstack.getConsole);


/**
 * Expose router module
 */

/**
 *  TESTES
 **/


module.exports = router;
