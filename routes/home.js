'use strict';

var router = require('express').Router()
  , home = require('../controllers/home');

router
  .route('/')
    .get(home.index);
    
/**
 * Expose router module
 */
module.exports = router;
