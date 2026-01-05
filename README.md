# 📝 Task Manager – Full Stack Web Application

A complete **full-stack task management web application** built from scratch using **Node.js, Express, MongoDB, and EJS**.  
This project was developed to understand **end-to-end full-stack development**, covering everything from authentication to deployment.

---

## 🎯 Purpose of the Project

The main goal of this project is to:
- Learn **full-stack web development from A to Z**
- Understand **real-world project architecture**
- Implement **secure authentication & authorization**
- Work with a **cloud database (MongoDB Atlas)**
- Deploy a production-ready application

---

## 🛠️ Tech Stack

### Frontend
- HTML5  
- CSS3  
- EJS (Server-Side Rendering)

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  
- MongoDB Atlas (Cloud)

### Authentication & Security
- bcrypt (Password Hashing)
- express-session (Session Management)
- Email OTP Verification (Nodemailer)
- Authorization Middleware

### Other Tools
- Multer (Profile Image Upload)
- Git & GitHub
- Render (Deployment)

---

## ✨ Features

### 🔐 Authentication
- User registration with **email OTP verification**
- Secure login and logout
- Password hashing using bcrypt
- Session-based authentication

### 👤 Profile Management
- User profile page
- Upload and update profile image
- View user details (name, email, joined date)

### ✅ Task Management (CRUD)
- Create tasks
- View user-specific tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed

### 🔒 Authorization
- Protected routes
- Ownership checks (users can access only their own tasks)
- Secure update and delete operations

### 🎨 UI & UX
- Clean and consistent layout
- Reusable EJS partials
- User-friendly navigation

### ☁️ Deployment
- MongoDB Atlas for cloud database
- Render for hosting the backend
- Environment-based configuration

---

## 🔄 Application Flow

1. User submits registration form
2. OTP is sent to the registered email
3. User verifies OTP
4. User account is created in the database
5. User logs in
6. User manages tasks and profile securely

---
