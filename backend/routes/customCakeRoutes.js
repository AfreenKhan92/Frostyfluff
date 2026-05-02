const express = require('express');
const router = express.Router();
const {
  createCustomCake,
  getUserCustomCakes,
  getCustomCake,
  updateCustomCakeStatus,
  getAllCustomCakes,
} = require('../controllers/customCakeController');
const { protect, authorize } = require('../middleware/auth');

// All custom cake routes are protected
router.use(protect);

// Admin routes (must come before /:id to avoid route collision)
router.get('/admin/all', authorize('admin'), getAllCustomCakes);
router.put('/:id/status', authorize('admin'), updateCustomCakeStatus);

// User routes
router.post('/', createCustomCake);
router.get('/', getUserCustomCakes);
router.get('/:id', getCustomCake);

module.exports = router;
