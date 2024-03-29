const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, trim: true},
    email: {type: String, trim: true, unique: true},
    isAdmin: {type: Boolean, default: false},
}, 
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;