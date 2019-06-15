// jshint esversion: 6
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./src/swagger.json');
const carRoute = require('./src/routes/carRoute');
const useRoute = require('./src/routes/userRoute');
const orderRoute = require('./src/routes/orderRoute');
const flagRoute = require('./src/routes/flagRoute');


// Set up the express app
const app = express();

// Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(useRoute);
app.use(carRoute);
app.use(orderRoute);
app.use(flagRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
