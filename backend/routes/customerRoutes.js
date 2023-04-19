const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.route('/').get(customerController.getAllCustomers);
router.route('/getOne/:id').get(customerController.getOneCustomer);
router.route('/create').post(customerController.createNewCustomer);
router.route('/update').patch(customerController.updateCustomer);
router.route('/delete').delete(customerController.deleteCustomer);

module.exports = router;