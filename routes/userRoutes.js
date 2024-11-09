// routes/userRoutes.js
const express = require('express');
const { register, login, verifyCode } = require('../controllers/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verifyCode);

module.exports = router;
