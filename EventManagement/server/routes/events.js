const express = require('express');
const router = express.Router();
const isAuthenticated = require('../controllers/isAuthenticated')
const multer = require('multer');

const upload = multer();



const { getAllEvents, addEvent, updateEvent, removeEvent } = require('../controllers/events');


router.route('/events')
    .get(isAuthenticated, getAllEvents)
    .post(isAuthenticated, upload.single('image'), addEvent);

router.route('/events/:id')
    .put(isAuthenticated, upload.single('image'), updateEvent)
    .delete(isAuthenticated, removeEvent);

module.exports = router;