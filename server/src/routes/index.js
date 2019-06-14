// jshint esversion : 6
const userRouter = require('./userRoute');
const carRouter = require('./carRoute');
const orderRouter = require('./orderRoute');
const flagRouter = require('./flagRoute');

const router = {
  userRouter,
  carRouter,
  flagRouter,
  orderRouter,
};

exports.modules = router;
