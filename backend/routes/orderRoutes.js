const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

router.get('/cart', auth, orderController.getCart);
router.post('/cart', auth, orderController.addToCart);
router.post('/checkout', auth, orderController.checkout);
router.get('/myorders', auth, orderController.getMyOrders);

module.exports = router;