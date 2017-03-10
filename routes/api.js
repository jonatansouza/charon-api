'use strict';

var express = require('express')
  , router = express.Router()
  , openstack = require('./openstack');

router
  .use('/openstack', openstack);

/**
 * Expose router module
 */

router
  .route ('/teste')
  .post((req, res) => {
    res.json(req.headers)
  })
module.exports = router;
