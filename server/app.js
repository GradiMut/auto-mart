// jshint esversion: 6
const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const swaggerDoc = require('swagger.json')
const router = require('./src/routes');


// Set up the express app
const app = express();

// Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
