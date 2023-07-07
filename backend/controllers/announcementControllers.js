const asyncHandler = require("express-async-handler");
const Announcement = require('../models/announcementModel');

const sendAnnouncement = asyncHandler(async (req, res) => {
    const {title, announcementText} = req.body;

    if (!title || !announcementText) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newAnnouncement = {
        // author: "creator",
        title: title,
        announcement: announcementText,
    }

    try {
        var announcement = await Announcement.create(newAnnouncement);

        res.json(announcement);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {sendAnnouncement};