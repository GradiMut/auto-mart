"use strict";

// jshint esversion :6
var jwt = require('jsonwebtoken');

var verifyToken = function verifyToken(req, res, next) {
  var checkHeader = req.headers.authorization;

  if (typeof checkHeader !== 'undefined') {
    var bearer = checkHeader.split(' ');
    var token = bearer[1];
    jwt.verify(token, 'secretkey', function (err, encoded) {
      if (err) {
        res.status(401).json({
          status: 401,
          data: 'Unauthorized access'
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
//# sourceMappingURL=auth.js.map