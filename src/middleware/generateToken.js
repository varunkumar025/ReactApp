const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const {key} = process.env;
const generateToken = (users) =>{
    const token = jwt.sign({
        id: user.email
    },key,{
        expiresIn:"7h"
    })
    return token;
}
module.exports = generateToken;
