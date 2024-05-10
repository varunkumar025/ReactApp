"use strict";

var jwt = require('jsonwebtoken');
var _require = require('./config'),
  secretKey = _require.secretKey; // Load secret key from config file

var verifyToken = function verifyToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized: No token provided'
    });
  }
  try {
    var decoded = jwt.verify(token, secretKey);

    // Attach user information to the request object for further processing
    req.user = decoded.user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({
      error: 'Unauthorized: Invalid token'
    });
  }
};
module.exports = verifyToken;