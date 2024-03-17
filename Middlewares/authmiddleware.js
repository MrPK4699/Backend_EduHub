// authMiddleware.js


const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
