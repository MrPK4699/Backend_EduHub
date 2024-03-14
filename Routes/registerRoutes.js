const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');


// User registration route
router.post('/', userController.register);

module.exports = router;
