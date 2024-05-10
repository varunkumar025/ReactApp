const jwt = require('jsonwebtoken');
const { secretKey } = require('./config'); // Load secret key from config file

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    // Attach user information to the request object for further processing
    req.user = decoded.user;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
