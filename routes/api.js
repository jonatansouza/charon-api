'use strict';

var express = require('express')
  , router = express.Router()
  , openstack = require('./openstack');

router
  .use('/openstack', openstack);

/**
 * Expose router module
 */
module.exports = router;
