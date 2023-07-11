const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    author: {type: String, trim: true},
    title: {type: String, trim: true},
    announcementText: {type: String, trim: true},
    wall: {type: mongoose.Schema.Types.ObjectId, ref: "Wall"},
}, 
{
    timestamps: true,
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;