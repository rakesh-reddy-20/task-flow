const User = require("../models/User");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");

// @desc   Get all users (Admin only)
// @route  Get /api/users/
// @access Private (Admin)
const getUsers = async (req, res) => {
  const users = await User.find({ role: "member" }).select("-password");

  const usersWithTasksCount = await Promise.all(
    users.map(async (user) => {
      const pendingTasks = await Task.countDocuments({
        assignedTo: user._id,
        status: "Pending",
      });
      const inProgressTasks = await Task.countDocuments({
        assignedTo: user._id,
        status: "In Progress",
      });
      const completedTasks = await Task.countDocuments({
        assignedTo: user._id,
        status: "Completed",
      });

      return {
        ...user._doc,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      };
    })
  );

  res.json(usersWithTasksCount);
};

// @desc   Get user by id (Admin only)
// @route  Get /api/users/:id
// @access Private
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }

  res.json(user);
};

module.exports = { getUsers, getUserById };
