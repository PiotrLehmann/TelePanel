const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    author: {type: String, trim: true},
    title: {type: String, trim: true},
    eventText: {type: String, trim: true},
    date: {type: String, trim: true},
}, 
{
    timestamps: true,
});

const CalendarEvent = mongoose.model("CalendarEvent", eventSchema);

module.exports = CalendarEvent;