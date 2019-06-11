// jshint esversion :6
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const checkHeader = req.headers.authorization;

  if (typeof checkHeader !== 'undefined') {
    const bearer = checkHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, 'secretkey', (err, encoded) => {
      if (err) {
        res.status(401).json({
          status: 401,
          data: 'Unauthorized access',
        });
      }
      req.encoded = encoded;
      next();
    });
  } else {
    res.status(403).json();
  }
};

exports.modules = verifyToken;
