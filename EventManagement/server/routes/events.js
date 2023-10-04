const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();



const { getAllEvents, addEvent, updateEvent, removeEvent, isAuthenticated } = require('../controllers/events');


router.route('/events')
    .get(isAuthenticated, getAllEvents)
    .post(addEvent);

router.route('/events/:id')
    .put(updateEvent)
    .delete(removeEvent);

module.exports = router;