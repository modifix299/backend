const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);
router.route('/getOne/:id').get(userController.getOneUser);
router.route('/create').post(userController.createNewUser);
router.route('/update').patch(userController.updateUser);
router.route('/delete').delete(userController.deleteUser);

module.exports = router;