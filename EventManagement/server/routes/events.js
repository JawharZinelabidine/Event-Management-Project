const express = require('express');
const router = express.Router();
const isAuthenticated = require('../controllers/isAuthenticated')



const { getAllEvents, addEvent, updateEvent, removeEvent } = require('../controllers/events');


router.route('/events')
    .get(isAuthenticated, getAllEvents)
    .post(addEvent);

router.route('/events/:id')
    .put(isAuthenticated, updateEvent)
    .delete(isAuthenticated, removeEvent);

module.exports = router;