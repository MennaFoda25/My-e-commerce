const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../controllers/orderService');

const authService = require('../controllers/authService');

const router = express.Router();

router.use(authService.protect);

router.get(
  '/checkout-session/:cartId',
  authService.allowedTo('user'),
  checkoutSession
);

router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);
router.get(
  '/',
  authService.allowedTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  authService.allowedTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.allowedTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;