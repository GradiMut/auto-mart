/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
// jshint esversion: 6
const orderDb = require('../data/orders');
const userDb = require('../data/users');
const { validateOrder } = require('../middleware/validation/order');

class Order {
  // gett all offers
  getAllOrders(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'Succes',
      orders: orderDb,
    });
  }

  // make an order
  makeAnOffer(req, res) {
    // const { error } = validateOrder(req.body);
    const user = userDb.find(u => u.id === req.body.buyer);

    if (user) {
      res.status(401).send('You can not purchase your own car');
      return;
    }
    // if (error) {
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }

    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const order = {
      id: orderDb.length + 1,
      buyer: parseInt(req.body.buyer, 10),
      carId: parseInt(req.body.carId, 10),
      price: parseInt(req.body.price, 10),
      priceOffered: parseInt(req.body.priceOffered, 10),
      status: 'pending',
      createdOn: date,
    };

    orderDb.push(order);
    res.status(201).send({
      status: 201,
      message: 'Your offer has been made',
      order,
    });
  }

  updateOrderPrice(req, res) {
    const id = parseInt(req.params.id, 10);
    let orderFound;
    let itemIndex;
    orderDb.map((order, index) => {
      if (order.id === id) {
        orderFound = order;
        itemIndex = index;
      }
    });

    if (!orderFound) {
      return res.status(404).send({
        status: 404,
        message: 'order not found',
      });
    }

    if (orderFound.status !== 'pending') {
      return res.status(400).send({
        status: 400,
        message: 'Only pending purchase order can be update!',
      });
    }
    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const newOrder = {
      id: orderFound.id,
      buyer: orderFound.buyer,
      carId: orderFound.carId,
      price: orderFound.price,
      priceOffered: orderFound.priceOffered,
      newPriceOffered: req.body.newPriceOffered,
      status: 'pending',
      createdOn: date,
    };

    orderDb.splice(itemIndex, 1, newOrder);

    return res.status(201).send({
      status: 201,
      message: 'order added statusfully',
      newOrder,
    });
  }
}

const orderController = new Order();
module.exports = orderController;
