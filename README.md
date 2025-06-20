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

PORT=8080
JWT_SECRET=your_jwt_secret_here /n
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
ADMIN_INVITE_TOKEN=your_secure_token 
CLOUD_NAME=your_cloudinary_cloud_name 
CLOUD_API_KEY=your_cloudinary_api_key 
CLOUD_API_SECRET=your_cloudinary_api_secret


👨‍💻 Author
R Rakesh Reddy

📫 Email: rakeshreddy0263@gmail.com
