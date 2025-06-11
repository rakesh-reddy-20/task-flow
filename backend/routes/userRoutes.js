const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById } = require("../controllers/userController");

// User Managment Routes
router.get("/", protect, adminOnly, wrapAsync(getUsers)); // Get all the users (Admin Only)
router.get("/:id", protect, wrapAsync(getUserById)); // Get a specific user

module.exports = router;
