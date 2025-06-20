const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const upload = require("../middlewares/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");

// Auth Routes
router.post("/register", wrapAsync(registerUser)); // Register User
router.post("/login", wrapAsync(loginUser)); // Login User
router.get("/profile", protect, wrapAsync(getUserProfile)); // Get User Profile
router.put("/profile", protect, wrapAsync(updateUserProfile)); // Update profile

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  res.status(200).json({ imageUrl: req.file.path }); // this is the Cloudinary URL
});

module.exports = router;
