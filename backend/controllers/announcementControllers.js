const asyncHandler = require("express-async-handler");
const Announcement = require('../models/announcementModel');

const sendAnnouncement = asyncHandler(async (req, res) => {
    const {author, title, announcementText} = req.body;
    console.log(req.body);
    if (!title || !announcementText) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newAnnouncement = {
        author: author, 
        title: title,
        announcementText: announcementText,
    }

    try {
        var announcement = await Announcement.create(newAnnouncement);
        // announcement = await announcement.populate("author", "name email"); //doesn't work
        res.json(announcement);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getAnnouncements = asyncHandler(async (req, res) => {
    try {
        const announcements = await Announcement.find({}); //.populate("author", "name email"); doesn't work
        res.json(announcements);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {sendAnnouncement, getAnnouncements};