const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/').get(productController.getAllProducts);
router.route('/create').post(productController.createNewProduct);
router.route('/update').patch(productController.updateProduct);
router.route('/delete').delete(productController.deleteProduct);

module.exports = router;