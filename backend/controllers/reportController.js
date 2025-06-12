const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

// @desc   Export all tasks as an Excel file
// @route  GET /api/reports/export/tasks
// @access Private (Admin)
// const exportTasksReport = async (req, res) => {
//   const tasks = await Task.find().populate("assignedTo", "name email");

//   const workbook = new excelJS.Workbook();
//   const worksheet = workbook.addWorksheet("Tasks Report");

//   // Define column headers
//   worksheet.columns = [
//     { header: "Task ID", key: "_id", width: 25 },
//     { header: "Title", key: "title", width: 30 },
//     { header: "Description", key: "description", width: 50 },
//     { header: "Priority", key: "priority", width: 15 },
//     { header: "Status", key: "status", width: 20 },
//     { header: "Due Date", key: "dueDate", width: 20 },
//     { header: "Assigned To", key: "assignedTo", width: 30 }, // FIXED typo
//   ];

//   // Add task rows
//   tasks.forEach((task) => {
//     const assignedTo =
//       task.assignedTo && task.assignedTo.name
//         ? `${task.assignedTo.name} (${task.assignedTo.email})`
//         : "Unassigned";

//     worksheet.addRow({
//       _id: task._id.toString(),
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       status: task.status,
//       dueDate: task.dueDate.toISOString().split("T")[0], // FIXED key name
//       assignedTo: assignedTo,
//     });
//   });

//   // Set headers
//   res.setHeader(
//     "Content-Type",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//   );
//   res.setHeader(
//     "Content-Disposition",
//     'attachment; filename="tasks_report.xlsx"'
//   );

//   // Send Excel file
//   await workbook.xlsx.write(res);
//   res.end();
// };
const exportTasksReport = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name email");

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tasks Report");

  // Header styling
  worksheet.columns = [
    { header: "Task ID", key: "_id", width: 25 },
    { header: "Title", key: "title", width: 30 },
    { header: "Description", key: "description", width: 50 },
    { header: "Priority", key: "priority", width: 15 },
    { header: "Status", key: "status", width: 20 },
    { header: "Due Date", key: "dueDate", width: 20 },
    { header: "Assigned To", key: "assignedTo", width: 30 },
  ];

  // Style headers
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F81BD" }, // Blue background
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  tasks.forEach((task) => {
    const assignedTo =
      Array.isArray(task.assignedTo) && task.assignedTo.length > 0
        ? task.assignedTo
            .map((user) => `${user.name} (${user.email})`)
            .join(", ")
        : "Unassigned";

    const row = worksheet.addRow({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.toISOString().split("T")[0],
      assignedTo,
    });

    // Priority styling
    const priorityCell = row.getCell("priority");
    if (task.priority === "High") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF0000" }, // Red
      };
      priorityCell.font = { color: { argb: "FFFFFFFF" } };
    } else if (task.priority === "Medium") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFC000" }, // Orange
      };
    } else if (task.priority === "Low") {
      priorityCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF92D050" }, // Green
      };
    }
  });

  // Set headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="tasks_report.xlsx"'
  );

  await workbook.xlsx.write(res);
  res.end();
};

// @desc   Export user-task report as an Excel file
// @route  GET /api/reports/export/users
// @access Private (Admin)
const exportUserReport = async (req, res) => {
  const users = await User.find().select("name email _id").lean();
  const userTasks = await Task.find().populate("assignedTo", "name email _id");

  const userTaskMap = {};
  users.forEach((user) => {
    userTaskMap[user._id] = {
      name: user.name,
      email: user.email,
      taskCount: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
    };
  });

  userTasks.forEach((task) => {
    if (Array.isArray(task.assignedTo)) {
      task.assignedTo.forEach((assignedUser) => {
        const userData = userTaskMap[assignedUser._id];
        if (userData) {
          userData.taskCount += 1;
          if (task.status === "Pending") userData.pendingTasks += 1;
          else if (task.status === "In Progress") userData.inProgressTasks += 1;
          else if (task.status === "Completed") userData.completedTasks += 1;
        }
      });
    }
  });

  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("User Task Report");

  // Correct keys and column headers
  worksheet.columns = [
    { header: "User Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 40 },
    { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
    { header: "Pending Tasks", key: "pendingTasks", width: 20 },
    { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
    { header: "Completed Tasks", key: "completedTasks", width: 20 },
  ];

  // Apply header styling (optional but professional)
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F81BD" },
    };
    cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
  });

  Object.values(userTaskMap).forEach((user) => {
    worksheet.addRow(user);
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="users_report.xlsx"'
  );

  return workbook.xlsx.write(res).then(() => {
    res.end();
  });
};

module.exports = {
  exportTasksReport,
  exportUserReport,
};
