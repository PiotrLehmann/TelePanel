const asyncHandler = require("express-async-handler");
const Wall = require('../models/wallModel');


const fetchWalls = asyncHandler(async (req, res) => {
    try {
        Wall.find({}).then((result) =>
            res.send(result)
        );
    } catch (error) {
        
    }
});

module.exports = {fetchWalls};