const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// User login route
router.post('/', userController.login);

module.exports = router;
