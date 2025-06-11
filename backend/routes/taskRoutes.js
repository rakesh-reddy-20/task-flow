const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");

const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
} = require("../controllers/taskController");

// Task Managment Routes
router.get("/dashboard-data", protect, wrapAsync(getDashboardData));
router.get("/user-dashboard-data", protect, wrapAsync(getUserDashboardData));
router.get("/", protect, wrapAsync(getTasks)); // Get all tasks (Admin: all, User: assigned)
router.get("/:id", protect, wrapAsync(getTaskById)); // Get task by ID (Admin: all, User: assigned)
router.post("/", protect, adminOnly, wrapAsync(createTask)); // Create a task (Admin only)
router.put("/:id", protect, wrapAsync(updateTask)); // Update task details
router.delete("/:id", protect, adminOnly, wrapAsync(deleteTask)); // Delete a task (Admin only)
router.put("/:id/status", protect, wrapAsync(updateTaskStatus)); // Update task status
router.put("/:id/todo", protect, wrapAsync(updateTaskChecklist)); // Update task checklist

module.exports = router;
