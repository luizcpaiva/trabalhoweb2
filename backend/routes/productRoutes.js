const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

router.get('/categories', categoryController.getAllCategories);

module.exports = router;