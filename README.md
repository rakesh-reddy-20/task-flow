<h1 align="center">🚀 TaskFlow</h1> <p align="center"> A robust, full-stack task and project management tool inspired by <strong>Jira</strong>, built with the <strong>MERN</strong> stack. </p> <p align="center"> <img src="https://img.shields.io/badge/Status-Production-green?style=flat-square"/> <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square"/> <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square"/> </p>

🌐 Live Demo
🔗 Frontend: taskflow-client.vercel.app

🔗 Backend API: taskflow-api.onrender.com

📌 Overview
TaskFlow is a team-centric task and project tracker that helps organizations manage daily work, collaborate effectively, and meet deadlines — with simplicity and speed.

Core Highlights:
✅ Role-Based Dashboards (Admin/User)
✅ Task Lifecycle (To Do → In Progress → Done)
✅ Assign Users, Add Todos, Comments & Attachments
✅ Admin Controls & Analytics
✅ Responsive UI with Tailwind CSS

🧰 Tech Stack
| Area         | Tech                                             |
| ------------ | ------------------------------------------------ |
| **Frontend** | React, Vite, Tailwind CSS, Axios                 |
| **Backend**  | Node.js, Express.js, JWT                         |
| **Database** | MongoDB, Mongoose                                |
| **Other**    | React Router, ESLint |


📁 Project Structure

taskflow/
├── backend/               # Node.js + Express + MongoDB (API & Auth)
├── frontend/
│   └── Task-Flow/         # React App (Vite + Tailwind)
├── .gitignore
├── README.md

🚀 Features
🔐 Authentication (JWT-based)
👥 User Roles (Admin & Member)
📝 Task Management (Create, Assign, Update, Delete)
✅ Checklist / Subtasks
📂 File URL Attachments
📊 Admin Dashboard Metrics
📬 Email Notifications (Upcoming)
💬 Comments (Upcoming)

🛠️ Getting Started
1. Clone the Repository
git clone https://github.com/rakesh-reddy-20/task-flow.git
cd task-flow

3. Setup Backend
cd backend
npm install

Create a .env file in /backend with:

PORT=8080 // The port on which your Express backend server will run
JWT_SECRET= // Secret key used to sign and verify JWT tokens for user authentication
CLIENT_URL=http://localhost:5173 // Frontend URL – used for enabling CORS and possibly email links
MONGO_URI= // MongoDB connection string for connecting your backend to the database
ADMIN_INVITE_TOKEN= // A secure token used to restrict admin registration/invite-only access
CLOUD_NAME= // Your Cloudinary cloud name – used for uploading and managing images/files
CLOUD_API_KEY= // Your Cloudinary API key for authentication when uploading files
CLOUD_API_SECRET= // Your Cloudinary API secret – NEVER expose this on the frontend


👨‍💻 Author
R Rakesh Reddy

📫 Email: rakeshreddy0263@gmail.com
