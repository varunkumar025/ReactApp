"use strict";

var jwt = require('jsonwebtoken');
var _require = require('../middleware/config'),
  secretKey = _require.secretKey;
var generateAccessToken = function generateAccessToken(userId) {
  return jwt.sign({
    userId: userId
  }, secretKey, {
    expiresIn: '36500d'
  }); // Token expires in 1 hour
};
var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }
  jwt.verify(token, secretKey, function (err, user) {
    if (err) {
      return res.status(403).json({
        error: 'Forbidden'
      });
    }
    req.user = user;
    next();
  });
};
module.exports = {
  generateAccessToken: generateAccessToken,
  authenticateToken: authenticateToken
};