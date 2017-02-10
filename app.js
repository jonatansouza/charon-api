'use strict';

var express = require('express')
  , config  = require('config')
  , cors    = require('cors')
  , app     = express();


/**
* cross origin
*/
app.use(cors());
/**
 * Route dispatcher
 */
app
  .use('/', require('./routes/home'))
  .use('/api', require('./routes/api'));
/**
 * Expose app module
 */


module.exports = app;
