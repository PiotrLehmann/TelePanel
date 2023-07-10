const mongoose = require('mongoose');

const wallSchema = mongoose.Schema({
    latestAnnouncement: {type: mongoose.Schema.Types.ObjectId, ref: "Announcement"},
}, 
{
    timestamps: true,
});

const Wall = mongoose.model("Wall", wallSchema);

module.exports = Wall;