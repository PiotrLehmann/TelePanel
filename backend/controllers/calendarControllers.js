const asyncHandler = require("express-async-handler");
const CalendarEvent = require('../models/eventModel')

const sendEvent = asyncHandler(async (req, res) => {
    const {author, title, eventText, date} = req.body;
    console.log(req.body);
    if (!title || !announcementText) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newEvent = {
        author: author, 
        title: title,
        eventText: eventText,
        date: date,
    }

    try {
        var event = await CalendarEvent.create(newEvent);
        // announcement = await announcement.populate("author", "name email"); //doesn't work
        res.json(event);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const getEvents = asyncHandler(async (req, res) => {
    try {
        const events = await CalendarEvent.find({}); //.populate("author", "name email"); doesn't work
        res.json(events);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = {sendEvent, getEvents};