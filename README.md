# 💸 Expense Tracker

A full-stack web application to track your income and expenses, built with **React** on the frontend and **Node.js/Express** with **MongoDB** on the backend.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Authentication Routes](#authentication-routes)
  - [Income Routes](#income-routes)
  - [Expense Routes](#expense-routes)
  - [Dashboard Routes](#dashboard-routes)
- [Authentication Flow](#authentication-flow)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

Expense Tracker is a personal finance management app that allows users to register, log in, and manage their income and expenses. It features a clean dashboard with charts and summaries to help users visualize their financial activity.

---

## ✨ Features

- 🔐 User Authentication (Register / Login with JWT)
- 📊 Dashboard with income & expense overview and charts
- ➕ Add, view, and delete income entries
- ➖ Add, view, and delete expense entries
- 📁 Excel export support (via ExcelJS)
- 📷 Profile photo upload (via Multer)
- 🔒 Protected routes (frontend & backend)
- 📱 Responsive design with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
| Technology | Version |
|---|---|
| React | 19.x |
| React Router DOM | 7.x |
| Tailwind CSS | 4.x |
| Axios | 1.x |
| Recharts | 3.x |
| React Icons | 5.x |
| React Hot Toast | 2.x |
| Vite | 7.x |

### Backend
| Technology | Version |
|---|---|
| Node.js | ≥ 18 |
| Express | 5.x |
| MongoDB + Mongoose | 9.x |
| JSON Web Token (JWT) | 9.x |
| bcryptjs | 3.x |
| Multer | 2.x |
| ExcelJS | 4.x |
| dotenv | 17.x |
| CORS | 2.x |

---

## 📁 Project Structure

```
expense-tracker/
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (register, login, getUser)
│   │   ├── incomeController.js      # Income CRUD operations
│   │   ├── expenseController.js     # Expense CRUD operations
│   │   └── dashboardController.js   # Dashboard data aggregation
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT protect middleware
│   │   └── uploadMiddleware.js      # Multer file upload config
│   ├── models/
│   │   ├── User.js                  # User schema (name, email, password, avatar)
│   │   ├── Income.js                # Income schema
│   │   └── Expense.js               # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth (register, login, getUser, upload)
│   │   ├── incomeRoutes.js          # /api/income
│   │   ├── expenseRoutes.js         # /api/expense
│   │   └── dashboardRoutes.js       # /api/dashboard
│   ├── uploads/                     # Stored profile images (auto-created)
│   ├── .env                         # Environment variables (never commit!)
│   ├── .gitignore                   # node_modules, .env
│   ├── server.js                    # Entry point
│   └── package.json
│
└── frontend/
    └── expense-tracker/
        ├── public/
        ├── src/
        │   ├── assets/              # Static assets (images, SVGs)
        │   ├── components/
        │   │   └── layouts/
        │   │       ├── AuthLayout.jsx
        │   │       └── Inputs/
        │   │           ├── Input.jsx
        │   │           └── ProfilePhotoSelector.jsx
        │   ├── pages/
        │   │   ├── Auth/
        │   │   │   ├── Login.jsx
        │   │   │   └── SignUp.jsx
        │   │   └── Dashboard/
        │   │       ├── Home.jsx
        │   │       ├── Income.jsx
        │   │       └── Expense.jsx
        │   ├── utils/
        │   │   ├── apiPath.js       # API base URLs
        │   │   ├── data.js          # Static/helper data
        │   │   └── helper.js        # Utility functions (e.g. validateEmail)
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        ├── vite.config.js
        └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)

---

### Backend Setup

```bash
# 1. Navigate to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file (see Environment Variables section)

# 4. Start the development server
npm run dev
```

The backend will run on: `http://localhost:8000`

---

### Frontend Setup

```bash
# 1. Navigate to the frontend folder
cd frontend/expense-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The frontend will run on: `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit your `.env` file.** Make sure `.env` is listed in `.gitignore`.

---

## 📡 API Endpoints

### Authentication Routes

**Base URL:** `/api/auth`  
**Controller:** `authController.js`

---

#### 1. Register User

**Endpoint:** `POST /api/auth/register`  
**Method:** `registerUser`  
**Auth Required:** ❌

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg"
}
```

**Sample Response:**
```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullname": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg",
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 2. Login User

**Endpoint:** `POST /api/auth/login`  
**Method:** `loginUser`  
**Auth Required:** ❌

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Sample Response:**
```json
{
  "id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullname": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg",
    "createdAt": "2024-03-15T10:30:00.000Z",
    "updatedAt": "2024-03-15T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 3. Get User Info

**Endpoint:** `GET /api/auth/getUser`  
**Method:** `getUserInfo`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Sample Response:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
  "fullname": "John Doe",
  "email": "john@example.com",
  "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg",
  "createdAt": "2024-03-15T10:30:00.000Z",
  "updatedAt": "2024-03-15T10:30:00.000Z"
}
```

---

#### 4. Upload Profile Image

**Endpoint:** `POST /api/auth/upload-image`  
**Method:** Custom route handler  
**Auth Required:** ❌

**Request Type:** `multipart/form-data`

**Form Data:**
```
image: [File]
```

**Sample Response:**
```json
{
  "imageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg"
}
```

---

### Income Routes

**Base URL:** `/api/income`  
**Controller:** `incomeController.js`

---

#### 1. Add Income

**Endpoint:** `POST /api/income/add`  
**Method:** `addIncome`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "icon": "💼",
  "source": "Salary",
  "amount": 5000,
  "date": "2024-03-15"
}
```

**Sample Response:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "icon": "💼",
  "source": "Salary",
  "amount": 5000,
  "date": "2024-03-15T00:00:00.000Z",
  "createdAt": "2024-03-15T10:35:00.000Z",
  "updatedAt": "2024-03-15T10:35:00.000Z"
}
```

---

#### 2. Get All Income

**Endpoint:** `GET /api/income/get`  
**Method:** `getAllIncome`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Sample Response:**
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "icon": "💼",
    "source": "Salary",
    "amount": 5000,
    "date": "2024-03-15T00:00:00.000Z",
    "createdAt": "2024-03-15T10:35:00.000Z",
    "updatedAt": "2024-03-15T10:35:00.000Z"
  },
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "icon": "💰",
    "source": "Freelance",
    "amount": 1500,
    "date": "2024-03-10T00:00:00.000Z",
    "createdAt": "2024-03-10T14:20:00.000Z",
    "updatedAt": "2024-03-10T14:20:00.000Z"
  }
]
```

---

#### 3. Delete Income

**Endpoint:** `DELETE /api/income/:id`  
**Method:** `deleteIncome`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameter:**
```
id: 65f1a2b3c4d5e6f7g8h9i0j2
```

**Sample Response:**
```json
{
  "message": "income Deleted Successfully"
}
```

---

#### 4. Download Income Excel

**Endpoint:** `GET /api/income/downloadexcel`  
**Method:** `downloadIncomeExcel`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:** Excel file download (`income_details.xlsx`)

**Excel Content:**
| Source | Amount | Date |
|--------|--------|------|
| Salary | 5000 | 2024-03-15 |
| Freelance | 1500 | 2024-03-10 |

---

### Expense Routes

**Base URL:** `/api/expense`  
**Controller:** `expenseController.js`

---

#### 1. Add Expense

**Endpoint:** `POST /api/expense/add`  
**Method:** `addExpense`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "icon": "🍔",
  "category": "Food",
  "amount": 50,
  "date": "2024-03-15"
}
```

**Sample Response:**
```json
{
  "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
  "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
  "icon": "🍔",
  "category": "Food",
  "amount": 50,
  "date": "2024-03-15T00:00:00.000Z",
  "createdAt": "2024-03-15T12:00:00.000Z",
  "updatedAt": "2024-03-15T12:00:00.000Z"
}
```

---

#### 2. Get All Expenses

**Endpoint:** `GET /api/expense/get`  
**Method:** `getAllExpense`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Sample Response:**
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "icon": "🍔",
    "category": "Food",
    "amount": 50,
    "date": "2024-03-15T00:00:00.000Z",
    "createdAt": "2024-03-15T12:00:00.000Z",
    "updatedAt": "2024-03-15T12:00:00.000Z"
  },
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "icon": "🚗",
    "category": "Transport",
    "amount": 30,
    "date": "2024-03-14T00:00:00.000Z",
    "createdAt": "2024-03-14T09:15:00.000Z",
    "updatedAt": "2024-03-14T09:15:00.000Z"
  }
]
```

---

#### 3. Delete Expense

**Endpoint:** `DELETE /api/expense/:id`  
**Method:** `deleteExpense`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**URL Parameter:**
```
id: 65f1a2b3c4d5e6f7g8h9i0j4
```

**Sample Response:**
```json
{
  "message": "Expense Deleted Successfully"
}
```

---

#### 4. Download Expense Excel

**Endpoint:** `GET /api/expense/downloadexcel`  
**Method:** `downloadExpenseExcel`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:** Excel file download (`expense_details.xlsx`)

**Excel Content:**
| Category | Amount | Date |
|----------|--------|------|
| Food | 50 | 2024-03-15 |
| Transport | 30 | 2024-03-14 |

---

### Dashboard Routes

**Base URL:** `/api/dashboard`  
**Controller:** `dashboardController.js`

---

#### 1. Get Dashboard Data

**Endpoint:** `GET /api/dashboard`  
**Method:** `getDashboardData`  
**Auth Required:** ✅

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Sample Response:**
```json
{
  "totalBalance": 6420,
  "totalIncome": 6500,
  "totalExpenses": 80,
  "last30DaysExpenses": {
    "total": 80,
    "transactions": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
        "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
        "icon": "🍔",
        "category": "Food",
        "amount": 50,
        "date": "2024-03-15T00:00:00.000Z",
        "createdAt": "2024-03-15T12:00:00.000Z",
        "updatedAt": "2024-03-15T12:00:00.000Z"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
        "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
        "icon": "🚗",
        "category": "Transport",
        "amount": 30,
        "date": "2024-03-14T00:00:00.000Z",
        "createdAt": "2024-03-14T09:15:00.000Z",
        "updatedAt": "2024-03-14T09:15:00.000Z"
      }
    ]
  },
  "last60DaysIncome": {
    "total": 6500,
    "transactions": [
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
        "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
        "icon": "💼",
        "source": "Salary",
        "amount": 5000,
        "date": "2024-03-15T00:00:00.000Z",
        "createdAt": "2024-03-15T10:35:00.000Z",
        "updatedAt": "2024-03-15T10:35:00.000Z"
      },
      {
        "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
        "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
        "icon": "💰",
        "source": "Freelance",
        "amount": 1500,
        "date": "2024-03-10T00:00:00.000Z",
        "createdAt": "2024-03-10T14:20:00.000Z",
        "updatedAt": "2024-03-10T14:20:00.000Z"
      }
    ]
  },
  "recentTransactions": [
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
      "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
      "icon": "💼",
      "source": "Salary",
      "amount": 5000,
      "date": "2024-03-15T00:00:00.000Z",
      "createdAt": "2024-03-15T10:35:00.000Z",
      "updatedAt": "2024-03-15T10:35:00.000Z",
      "type": "income"
    },
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j4",
      "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
      "icon": "🍔",
      "category": "Food",
      "amount": 50,
      "date": "2024-03-15T00:00:00.000Z",
      "createdAt": "2024-03-15T12:00:00.000Z",
      "updatedAt": "2024-03-15T12:00:00.000Z",
      "type": "expense"
    },
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
      "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
      "icon": "🚗",
      "category": "Transport",
      "amount": 30,
      "date": "2024-03-14T00:00:00.000Z",
      "createdAt": "2024-03-14T09:15:00.000Z",
      "updatedAt": "2024-03-14T09:15:00.000Z",
      "type": "expense"
    },
    {
      "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
      "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
      "icon": "💰",
      "source": "Freelance",
      "amount": 1500,
      "date": "2024-03-10T00:00:00.000Z",
      "createdAt": "2024-03-10T14:20:00.000Z",
      "updatedAt": "2024-03-10T14:20:00.000Z",
      "type": "income"
    }
  ]
}
```

---

## 🔒 Authentication Flow

1. User registers via `POST /api/auth/register`
2. Password is hashed with **bcryptjs** before saving to MongoDB
3. User logs in via `POST /api/auth/login` and receives a **JWT token** (expires in 1h)
4. Token is stored in `localStorage` on the frontend
5. Protected routes verify the token via `authMiddleware` (`protect`)
6. `req.user` is populated from the decoded JWT on every protected request

---

## 🧰 Available Scripts

### Backend
```bash
npm start       # Run with Node
npm run dev     # Run with nodemon (auto-restart)
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Hitesh Patil**  
[GitHub](https://github.com/Hiteshpatil1411)

---

## 📝 Notes

- All protected routes require JWT authentication via `Authorization: Bearer <token>` header
- Passwords are automatically hashed before storage using bcryptjs
- JWT tokens expire after 1 hour
- Excel downloads are generated dynamically based on user data
- Profile images are stored in the `uploads/` folder and served statically
- All dates are stored in ISO 8601 format

---

> 💡 *This is a fully functional expense tracking application with complete CRUD operations for income and expenses, along with comprehensive dashboard analytics.*