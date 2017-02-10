'use strict';

/**
 * Root path
 */
exports.index = (req, res) => {
  res.json({
      "Charon": {
          "message": "Welcome to Charon-api",
          "docs": "https://github.com/jonatansouza/charon-api",
      }
  });
};
