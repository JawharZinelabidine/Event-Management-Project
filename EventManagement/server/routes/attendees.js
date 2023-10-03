const express = require('express');
const router = express.Router();

const { getAttendee, createAttendees, removeAttendee } = require('../controllers/attendees');

router.route('/attendees/:id')
    .get(getAttendee);

router.route('/attendees/:users_ID/:events_ID')
    .post(createAttendees)
    .delete(removeAttendee);


module.exports = router;