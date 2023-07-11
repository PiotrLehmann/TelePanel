const express = require('express');
const {sendAnnouncement} = require('../controllers/announcementControllers');

const router = express.Router();

router.route('/').post(sendAnnouncement); //we should've used protection (middleware) :)

module.exports = router;