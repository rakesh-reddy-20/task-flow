const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const {
  exportTasksReport,
  exportUserReport,
} = require("../controllers/reportController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/export/tasks", protect, adminOnly, wrapAsync(exportTasksReport)); // Export all tasks as Excel/pdf
router.get("/export/users", protect, adminOnly, wrapAsync(exportUserReport)); // Export user-task report

module.exports = router;
