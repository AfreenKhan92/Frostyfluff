const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// All order routes are protected
router.use(protect);

// Admin routes (must come before /:id to avoid route collision)
router.get('/admin/all', authorize('admin'), getAllOrders);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

// User routes
router.post('/', placeOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrder);

module.exports = router;
