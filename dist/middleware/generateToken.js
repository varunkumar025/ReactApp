"use strict";

var jwt = require("jsonwebtoken");
var env = require("dotenv");
env.config();
var key = process.env.key;
var generateToken = function generateToken(users) {
  var token = jwt.sign({
    id: user.email
  }, key, {
    expiresIn: "7h"
  });
  return token;
};
module.exports = generateToken;