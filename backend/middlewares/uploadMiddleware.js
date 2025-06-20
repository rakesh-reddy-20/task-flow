const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Cloudinary config

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "taskflow", // cloud folder name
    allowed_formats: ["jpeg", "png", "jpg"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

// File filter (optional, Cloudinary already handles mimetypes well)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, and .png formats are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
