const jwt = require('jsonwebtoken');
const { secretKey } = require('../middleware/config');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '36500d' }); // Token expires in 1 hour
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  generateAccessToken,
  authenticateToken
};
