const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, trim: true},
    announcement: {type: String, trim: true},
}, 
{
    timestamps: true,
});

const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = Announcement;