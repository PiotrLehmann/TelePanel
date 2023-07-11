const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");


const authUser = asyncHandler(async (req, res) => {
    const {name, email} = req.body;

    if (!name || !email) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            isAdmin: userExists.isAdmin,
            token: generateToken(userExists._id)
        });
    } else {
        const user = await User.create({name, email});

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error("Failed to create the user")
        }
    }
});

module.exports = {authUser};