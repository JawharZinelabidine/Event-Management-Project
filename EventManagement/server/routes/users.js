const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { addUser, verifyToken, login, getAllUsers } = require('../controllers/users');





router.route('/users')
    .post(addUser)
    .get(getAllUsers)

router.route('/users-login')
    .post(login, verifyToken);

module.exports = router;