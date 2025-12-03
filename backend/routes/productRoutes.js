const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');

const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.get('/categories', categoryController.getAllCategories);

router.post('/products', [auth, admin], productController.createProduct);
router.put('/products/:id', [auth, admin], productController.updateProduct);
router.delete('/products/:id', [auth, admin], productController.deleteProduct);

router.post('/categories', [auth, admin], categoryController.createCategory);
router.delete('/categories/:id', [auth, admin], categoryController.deleteCategory);

module.exports = router;