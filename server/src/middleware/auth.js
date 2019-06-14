// jshint esversion :6
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || header === '') {
      return res.status(401).send({
        status: 401,
        error: 'Unauthorized',
      });
    }
    const token = jwt.verify(header, 'SECRET_KEY');
    req.user = token;
    next();
  } catch (e) {
    return res.status(401).send({
      status: 401,
      error: e,
    });
  }
};


module.exports = verifyToken;
