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
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 Overview

Expense Tracker is a personal finance management app that allows users to register, log in, and manage their income and expenses. It features a clean dashboard with charts and summaries to help users visualize their financial activity.

---

## ✨ Features

- 🔐 User Authentication (Register / Login with JWT)
- 📊 Dashboard with income & expense overview
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
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── authController.js      # Auth logic (register, login)
│   ├── middlewares/
│   │   └── authMiddleware.js      # JWT protection middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Income.js              # Income schema
│   │   └── Expense.js             # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth
│   │   ├── income.Routes.js       # /api/income
│   │   ├── expenseRoutes.js       # /api/expense
│   │   └── dashboarfRoutes.js     # /api/dashboard
│   ├── .env                       # Environment variables
│   ├── server.js                  # Entry point
│   └── package.json
│
└── frontend/
    └── expense-tracker/
        ├── public/
        ├── src/
        │   ├── assets/            # Static assets (images, SVGs)
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
        │   │   ├── apiPath.js     # API base URLs
        │   │   ├── data.js        # Static/helper data
        │   │   └── helper.js      # Utility functions (e.g. validateEmail)
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

Create a `.env` file inside the `backend/` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Important:** Never commit your `.env` file to version control. Make sure it is listed in `.gitignore`.

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT token | ❌ |
| GET | `/api/auth/getUser` | Get logged-in user info | ✅ |

### Income Routes — `/api/income`
> *(Coming soon / in development)*

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/income` | Get all income entries | ✅ |
| POST | `/api/income` | Add a new income entry | ✅ |
| DELETE | `/api/income/:id` | Delete an income entry | ✅ |

### Expense Routes — `/api/expense`
> *(Coming soon / in development)*

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/expense` | Get all expense entries | ✅ |
| POST | `/api/expense` | Add a new expense entry | ✅ |
| DELETE | `/api/expense/:id` | Delete an expense entry | ✅ |

---

## 🔒 Authentication Flow

1. User registers via `POST /api/auth/register`
2. User logs in via `POST /api/auth/login` and receives a **JWT token**
3. Token is stored in `localStorage` on the frontend
4. Protected routes check for the token via `authMiddleware`
5. Frontend uses `PrivateRoute` component to guard dashboard pages

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

---

> 💡 *This project is actively in development. Income, Expense, and Dashboard features are being built out progressively.*
