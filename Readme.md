# 💰 Finance Dashboard Backend API

A production-ready backend system for managing financial records with role-based access control, secure authentication, and analytics.

---

## 🚀 Features

* 🔐 JWT-based Authentication
* 🔑 Role-Based Access Control (Admin, Analyst, Viewer)
* 👤 User Management
* 💰 Financial Transactions (CRUD)
* 📊 Dashboard Analytics (Income, Expense, Balance)
* 🔍 Filtering & Pagination
* 🛡️ Secure Password Hashing (bcrypt)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

## 📂 Project Structure

```
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
```

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/indkshitij/zorvyn-assignment.git
cd zorvyn-assignment
npm install
```

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run dev
```

---

## 🔐 API Endpoints

### Auth

* POST /api/auth/login

### Users

* POST /api/users/create
* GET /api/users/all-users

### Transactions

* POST /api/transactions
* GET /api/transactions
* GET /api/transactions/dashboard

---

## 📊 Dashboard Features

* Total Income
* Total Expense
* Net Balance
* Category-wise breakdown
* Recent transactions

---

## 🧠 Design Decisions

* Clean separation of concerns (controllers, models, middleware)
* Controller-based business logic
* JWT for stateless authentication
* Aggregation pipelines for analytics

---

## 📌 Assumptions

* Single currency system
* Role-based permissions enforced at middleware level
* Users can only access their own data

---

## 👨‍💻 Author

Kshitij Singh
