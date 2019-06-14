/* eslint-disable class-methods-use-this */
// jshint esversion: 6
const orderDb = require('../data/orders');

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
    if (!req.body.buyer) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, You do not have an account!',
      });
    }
    if (!req.body.carId) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, Car does not existe',
      });
    }
    if (!req.body.price) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, Amount is required',
      });
    }
    if (!req.body.status) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, Status is required',
      });
    }

    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const order = {
      id: orderDb.length + 1,
      buyer: req.body.buyer,
      carId: req.body.carId,
      price: req.body.amount,
      priceOffered: req.body.priceOffered,
      status: 'pending',
      createdOn: date,
    };

    orderDb.push(order);
    return res.status(201).send({
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
