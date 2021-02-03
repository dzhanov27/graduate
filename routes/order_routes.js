const router = require('express').Router();

const verify = require('../controllers/verifyToken');
const {
  getOrders,
  newOrder,
  getOrder,
} = require('../controllers/orders.controller');

router.get('/:orderId', getOrder);

router.route('/').get(getOrders).post(newOrder);

module.exports = router;
