const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    author: {type: String, trim: true},
    title: {type: String, trim: true},
    announcementText: {type: String, trim: true},
    date: { 2023,07,06},
    groups: {},
}, 
{
    timestamps: true,
});

const CalendarEvent = mongoose.model("CalendarEvent", eventSchema);

module.exports = CalendarEvent;