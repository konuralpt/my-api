const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const validateJWT = require('../app/api/auth');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/updateUser', userController.updateUser);

module.exports = router;