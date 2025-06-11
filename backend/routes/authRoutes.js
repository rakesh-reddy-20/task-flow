const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Auth Routes
router.post("/register", wrapAsync(registerUser)); // Register User
router.post("/login", wrapAsync(loginUser)); // Login User
router.get("/profile", protect, wrapAsync(getUserProfile)); // Get User Profile
router.put("/profile", protect, wrapAsync(updateUserProfile)); // Update profile

module.exports = router;
