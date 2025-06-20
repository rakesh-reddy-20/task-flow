🧩 TaskFlow
TaskFlow is a modern, full-stack task and project management application inspired by Jira. It helps teams collaborate efficiently by organizing tasks, assigning responsibilities, and tracking project progress through intuitive dashboards.

🚀 Live Demo
🔗 https://task-flow-frontend-c2ql.onrender.com

✨ Features
✅ JWT-Based Authentication & Role Management
👥 Admin and Member Dashboards
📝 Task Creation, Assignment, and Status Updates
📋 Todo Checklist and Attachments
📊 Dashboard Metrics and Reports
📂 Clean, Modular Codebase (MERN Stack)

🛠️ Tech Stack

🔧 Backend
Node.js + Express.js
MongoDB with Mongoose

🎨 Frontend
React + Vite
Tailwind CSS
React Router
Axios for API communication

🔒 Other Tools
JWT for Authentication
Role-Based Access Control
Cloudinary for File Uploads
Dotenv for Environment Config

🗂️ Environment Variables
Set the following environment variables in your .env file for the backend:

<pre> <code> PORT=8080 # The port on which your Express backend server will run JWT_SECRET=your_jwt_secret # Secret key used to sign and verify JWT tokens for user authentication CLIENT_URL=http://localhost:5173 # Frontend URL – used for enabling CORS and email redirection MONGO_URI=your_mongodb_connection_uri # MongoDB connection string for the backend database ADMIN_INVITE_TOKEN=your_invite_token # Used to allow only invited admins to register CLOUD_NAME=your_cloudinary_name # Your Cloudinary cloud name (for image/file uploads) CLOUD_API_KEY=your_cloudinary_key # Your Cloudinary API key CLOUD_API_SECRET=your_cloudinary_secret # Cloudinary API secret – keep this private </code> </pre>

🧑‍💻 Author
TaskFlow was built with passion and precision by R Rakesh Reddy.
