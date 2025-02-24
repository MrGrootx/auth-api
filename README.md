# 🔐 Authentication API

This API provides 🔑 authentication functionalities, including 📝 user registration, 🔓 login, 🔒 authentication, and 🔄 password reset using 🏷️ JSON Web Tokens (JWT) and 🔢 bcrypt for password hashing.

## 🌟 Features

- 🆕 User Registration
- 🔑 User Login with JWT Token
- 🔒 Protected Routes with Token Verification
- 📧 Password Reset via Email

## ⚙️ Installation

1. 📥 Clone the repository:
   ```sh
   git clone https://github.com/your-repo/auth-api.git
   cd auth-api
   ```
2. 📦 Install dependencies:
   ```sh
   pnpm install
   ```
3. 📄 Create a `.env` file and add the following 🔧 environment variables:
   ```env
   DB=mongodb://localhost:27017/rest-auth
   SECRET_KEY=your_jwt_secret
   EMAIL=your_email@gmail.com
   PASSWORD=your_email_password
   ```
4. ▶️ Start the server:
   ```sh
   pnpm start
   ```

## 🔌 API Endpoints

### 1️⃣ **🆕 User Registration**

- **🛤️ Endpoint:** `POST /register`
- **📜 Description:** Registers a new 👤 user.
- **📤 Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **📥 Response:**
  ```json
  {
    "message": "User Created"
  }
  ```

### 2️⃣ **🔑 User Login**

- **🛤️ Endpoint:** `POST /login`
- **📜 Description:** Authenticates a 👤 user and returns a 🏷️ JWT token.
- **📤 Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **📥 Response:**
  ```json
  {
    "message": "Login Successful",
    "token": "your_jwt_token"
  }
  ```

### 3️⃣ **🔒 Protected Route (User Data)**

- **🛤️ Endpoint:** `GET /data`
- **📜 Description:** Returns 👤 user data. Requires 🔑 authentication.
- **📩 Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **📥 Response:**
  ```json
  {
    "message": "Data",
    "data": { "email": "user@example.com", "id": "123456" }
  }
  ```

### 4️⃣ **🔄 Password Reset Request**

- **🛤️ Endpoint:** `POST /reset-password`
- **📜 Description:** Sends a 🔢 password reset token via 📧 email.
- **📤 Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **📥 Response:**
  ```json
  {
    "message": "Email sent"
  }
  ```

### 5️⃣ **🔄 Reset Password Using Token**

- **🛤️ Endpoint:** `POST /reset-password/:token`
- **📜 Description:** Resets 🔑 password using the provided 🏷️ token.
- **📤 Request Body:**
  ```json
  {
    "password": "newpassword"
  }
  ```
- **📥 Response:**
  ```json
  {
    "message": "Password reset successful"
  }
  ```

## 🛠️ Technologies Used

- **🚀 Express.js** - Backend framework
- **🗄️ MongoDB (Mongoose)** - Database
- **🔢 bcrypt** - Password hashing
- **🔑 jsonwebtoken (JWT)** - Authentication
- **📧 Nodemailer** - Email service


