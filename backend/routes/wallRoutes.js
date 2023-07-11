const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { fetchWalls } = require("../controllers/wallControllers");

const router = express.Router();

router.route('/').get(protect, fetchWalls); //we should've used protection (middleware) :)

module.exports = router;