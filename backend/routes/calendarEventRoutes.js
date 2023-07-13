const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const { sendEvent, getEvents } = require('../controllers/calendarControllers');

const router = express.Router();

router.route('/').post(sendEvent); //we should've used protection (middleware) :)
router.route('/').get(getEvents); //we should've used protection (middleware) :)

module.exports = router;