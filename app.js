// jshint esversion: 6
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./src/swagger.json');
const userRouter = require('./src/routes/userRoute');
const orderRouter = require('./src/routes/orderRoute');
const flagRouter = require('./src/routes/flagRoute');
const carRouter = require('./src/routes/carRoute');


// Set up the express app
const app = express();

// Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(userRouter);
app.use(carRouter);
app.use(orderRouter);
app.use(flagRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

module.exports = app;