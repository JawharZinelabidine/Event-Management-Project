const express = require('express');
const router = express.Router();

const { addUser, verifyUser, getAllUsers } = require('../controllers/users');


router.route('/users')
    .post(addUser)
    .get(getAllUsers)

router.route('/users-login')
    .post(verifyUser);

module.exports = router;