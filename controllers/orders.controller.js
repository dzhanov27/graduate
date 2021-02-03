const Order = require('../models/order.model');

module.exports = {
  getOrders: async (req, res) => {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },
  getOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },
  newOrder: async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const order = await newOrder.save();
      res.status(201).json('New order added');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  },
};
