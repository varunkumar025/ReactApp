const express = require('express');
const router = express.Router();
const userController = require('../src/controllers/UserController');


// Routes with token authentication
router.get('/users', userController.getAllUsers);
router.post('/checkCredentials', userController.checkCredentials);
router.post('/register', userController.registerUser);
router.get('/users/:userEmail', userController.getUserById);
router.put('/users/:userEmail/profile-image', userController.updateProfileImage);

module.exports = router;
