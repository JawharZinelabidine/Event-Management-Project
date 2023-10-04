const express = require('express');
const router = express.Router();
const isAuthenticated = require('../controllers/isAuthenticated')


const { getAttendee, createAttendees, removeAttendee } = require('../controllers/attendees');

router.route('/attendees/:id')
    .get(isAuthenticated, getAttendee);

router.route('/attendees/:users_ID/:events_ID')
    .post(isAuthenticated, createAttendees)
    .delete(isAuthenticated, removeAttendee);


module.exports = router;