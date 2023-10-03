const express = require('express');
const router = express.Router();

const { getAllEvents, addEvent, updateEvent, removeEvent } = require('../controllers/events');


router.route('/events')
    .get(getAllEvents)
    .post(addEvent);

router.route('/events/:id')
    .put(updateEvent)
    .delete(removeEvent);

module.exports = router;