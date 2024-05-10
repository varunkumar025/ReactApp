const express = require('express');
const router = express.Router();
const helloController = require('../src/controllers/helloController');

// Route for '/'
router.get('/', helloController.getHello);

module.exports = router;
