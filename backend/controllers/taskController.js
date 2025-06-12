const { useId } = require("react");
const Task = require("../models/Task");

// @desc   Get all tasks (AminL all, Users: only assigned tasks)
// @route  Get /api/tasks/
// @access Private
const getTasks = async (req, res) => {
  const { status } = req.query;
  let filter = {};
  if (status) {
    filter.status = status;
  }

  const roleFilter =
    req.user.role === "admin" ? {} : { assignedTo: req.user._id };

  // Fetch tasks
  let tasks = await Task.find({ ...filter, ...roleFilter }).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  // Add completed todoChecklist count to each task
  tasks = await Promise.all(
    tasks.map(async (task) => {
      const completedCount = task.todoChecklist.filter(
        (item) => item.completed
      ).length;
      return { ...task._doc, completedTodoCount: completedCount };
    })
  );

  // Status summary counts
  const allTasks = await Task.countDocuments(roleFilter);

  const pendingTasks = await Task.countDocuments({
    ...filter,
    status: "Pending",
    ...roleFilter,
  });

  const inProgressTasks = await Task.countDocuments({
    ...filter,
    status: "In Progress",
    ...roleFilter,
  });

  const completedTasks = await Task.countDocuments({
    ...filter,
    status: "Completed",
    ...roleFilter,
  });

  res.json({
    tasks,
    statusSummary: {
      all: allTasks,
      pendingTasks,
      inProgressTasks,
      completedTasks,
    },
  });
};

// @desc   Get task by Id
// @route  GET /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  if (!task) return res.status(404).json({ message: "Task not found" });

  res.json(task);
};

// @desc   Create a new task (Admin only)
// @route  POST /api/tasks/
// @access Private (Admin)
const createTask = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  const {
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    attachments,
    todoChecklist,
  } = req.body;

  if (!Array.isArray(assignedTo)) {
    return res
      .status(400)
      .json({ message: "assignedTo must be an array of use IDs!" });
  }

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    assignedTo,
    createdBy: req.user._id,
    todoChecklist,
    attachments,
  });

  res.status(201).json({ message: "Task created successfully", task });
};

// @desc   Update task details
// @route  PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found!" });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.dueDate = req.body.dueDate || task.dueDate;
  task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
  task.attachments = req.body.attachments || task.attachments;

  if (req.body.assignedTo) {
    if (!Array.isArray(req.body.assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs!" });
    }
    task.assignedTo = req.body.assignedTo;
  }

  const updatedTask = await task.save();
  res.json({ message: "Task updated successfully", updatedTask });
};

// @desc   Get Delete a task (Admin only)
// @route  DELETE /api/tasks/:id
// @access Private (Admin)
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found!" });

  await task.deleteOne();
  res.json({ message: "Task deleted successfully!" });
};

// @desc   Update task status
// @route  PUT /api/tasks/:id/status
// @access Private
const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found!" });

  const isAssigned = task.assignedTo.some(
    (userId) => userId.toString() === req.user._id.toString()
  );

  if (!isAssigned && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized!" });
  }

  task.status = req.body.status || task.status;

  if (task.status === "Completed") {
    task.todoChecklist.forEach((item) => (item.completed = true));
    task.progress = 100;
  }

  await task.save();
  res.json({ message: "Task status updated", task });
};

// @desc   Update task checklist
// @route  Get /api/tasks/:id/todo
// @access Private
const updateTaskChecklist = async (req, res) => {
  const { todoChecklist } = req.body;
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ message: "Task not found!" });

  if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Not authorized to update checklist!" });
  }

  task.todoChecklist = todoChecklist; // Replace with updated checklist

  // Auto-update progress based on checklist completion
  const completedCount = task.todoChecklist.filter(
    (item) => item.completed
  ).length;
  const totalItems = task.todoChecklist.length;
  task.progress =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  // Auto-mark task as completed if all items are checked
  if (task.progress === 100) {
    task.status = "Completed";
  } else if (task.progress > 0) {
    task.status = "In Progress";
  } else {
    task.status = "Pending";
  }

  await task.save();
  const updatedTask = await Task.findById(req.params.id).populate(
    "assignedTo",
    "name email profileImageUrl"
  );

  res.json({ message: "Task checklist updated", task: updatedTask });
};

// @desc   Dashboard Data (Admin only)
// @route  Get /api/tasks/dashboard-data
// @access Private
const getDashboardData = async (req, res) => {
  const totalTasks = await Task.countDocuments();
  const pendingTasks = await Task.countDocuments({ status: "Pending" });
  const completedTasks = await Task.countDocuments({ status: "Completed" });
  const overdueTasks = await Task.countDocuments({
    status: { $ne: "Completed" },
    dueDate: { $lt: new Date() },
  });

  // Task status distribution
  const taskStatuses = ["Pending", "In Progress", "Completed"];
  const taskDistributionRaw = await Task.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const taskDistribution = taskStatuses.reduce((acc, status) => {
    const formattedKey = status.replace(/\s+/g, ""); // Remove spaces for response keys
    acc[formattedKey] =
      taskDistributionRaw.find((item) => item._id === status)?.count || 0;
    return acc;
  }, {});

  taskDistribution["All"] = totalTasks;

  // Task priority levels
  const taskPriorities = ["Low", "Medium", "High"];
  const taskPriorityLevelsRaw = await Task.aggregate([
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
    acc[priority] =
      taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
    return acc;
  }, {});

  // Recent 10 tasks
  const recentTasks = await Task.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select("title status priority dueDate createdAt");

  res.status(200).json({
    statistics: {
      totalTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
    },
    charts: {
      taskDistribution,
      taskPriorityLevels,
    },
    recentTasks,
  });
};

// @desc   Dashboard Data (User-specific)
// @route  Get /api/tasks/user-dashboard-data
// @access Private
const getUserDashboardData = async (req, res) => {
  const userId = req.user._id; // Logged-in user's ID

  // 1. User-specific task statistics
  const totalTasks = await Task.countDocuments({ assignedTo: userId });
  const pendingTasks = await Task.countDocuments({
    assignedTo: userId,
    status: "Pending",
  });
  const completedTasks = await Task.countDocuments({
    assignedTo: userId,
    status: "Completed",
  });
  const overdueTasks = await Task.countDocuments({
    assignedTo: userId,
    status: { $ne: "Completed" },
    dueDate: { $lt: new Date() },
  });

  // 2. Task distribution by status
  const taskStatuses = ["Pending", "In Progress", "Completed"];
  const taskDistributionRaw = await Task.aggregate([
    { $match: { assignedTo: userId } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const taskDistribution = taskStatuses.reduce((acc, status) => {
    const formattedKey = status.replace(/\s+/g, "");
    acc[formattedKey] =
      taskDistributionRaw.find((item) => item._id === status)?.count || 0;
    return acc;
  }, {});
  taskDistribution["All"] = totalTasks;

  // 3. Task priority levels (by priority, not status — fixed here)
  const taskPriorities = ["Low", "Medium", "High"];
  const taskPriorityLevelsRaw = await Task.aggregate([
    { $match: { assignedTo: userId } },
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
    acc[priority] =
      taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
    return acc;
  }, {});

  // 4. Recent 10 tasks (fixed typo: `createAt` -> `createdAt`)
  const recentTasks = await Task.find({ assignedTo: userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("title status priority dueDate createdAt");

  // 5. Final response
  res.status(200).json({
    statistics: {
      totalTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
    },
    charts: {
      taskDistribution,
      taskPriorityLevels,
    },
    recentTasks,
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
