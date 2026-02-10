const express = require('express');
const { Register, Login } = require("../Controllers/auth.controller.js");

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);

module.exports = router;