'use strict';

var express = require('express')
  , config  = require('config')
  , cors    = require('cors')
  , bodyParser = require('body-parser')
  , methodOverrride = require('method-override')
  , app     = express();

/**
* cross origin
*/

app.use(cors());

/**
* Config EXPRESS
*/
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
* DELETE HTTP VERB
*/

app.use(methodOverrride());
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
