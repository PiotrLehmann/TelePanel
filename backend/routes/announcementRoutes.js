const express = require('express');
const { protect } = require("../middlewares/authMiddleware");
const {sendAnnouncement, getAnnouncements} = require('../controllers/announcementControllers');

const router = express.Router();

router.route('/').post(sendAnnouncement); //we should've used protection (middleware) :)
router.route('/').get(getAnnouncements); //we should've used protection (middleware) :)

module.exports = router;