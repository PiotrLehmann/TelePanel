const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, trim: true},
    announcementText: {type: String, trim: true},
    wall: {type: mongoose.Schema.Types.ObjectId, ref: "Wall"},
}, 
{
    timestamps: true,
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;