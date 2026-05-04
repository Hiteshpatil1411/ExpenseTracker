# 💸 Expense Tracker

A full-stack web application to track your income and expenses, built with **React** on the frontend and **Node.js/Express** with **MongoDB** on the backend.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
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
- 👤 Profile photo upload on registration (via Multer)
- 📊 Dashboard with income & expense summary cards
- 🥧 Financial overview pie chart (income vs expenses vs balance)
- 📈 Last 30 days expense bar chart
- 💸 Recent transactions list with income/expense type indicators
- 🧾 Expense transactions list (last 30 days)
- 📉 Last 60 days income chart with summary
- ➕ Add, view, and delete income entries
- ➖ Add, view, and delete expense entries
- 📁 Excel export for income and expenses (via ExcelJS)
- 🔒 Protected routes — frontend (PrivateRoute) & backend (JWT middleware)
- 📱 Responsive design with Tailwind CSS v4
- 🍔 Mobile-friendly collapsible side menu via Navbar

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
| moment.js | latest |
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
│   │   └── db.js                      # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js          # register, login, getUserInfo
│   │   ├── incomeController.js        # Income CRUD + Excel export
│   │   ├── expenseController.js       # Expense CRUD + Excel export
│   │   └── dashboardController.js     # Aggregated dashboard data (Promise.all)
│   ├── middleware/
│   │   ├── authMiddleware.js          # JWT protect middleware
│   │   └── uploadMiddleware.js        # Multer config (diskStorage → uploads/)
│   ├── models/
│   │   ├── User.js                    # fullName, email, password (select:false), profileImageUrl
│   │   ├── Income.js                  # userId, icon, source, amount, date
│   │   └── Expense.js                 # userId, icon, category, amount, date
│   ├── routes/
│   │   ├── authRoutes.js              # POST /register, POST /login, GET /getUser, POST /upload-image
│   │   ├── incomeRoutes.js            # /api/income
│   │   ├── expenseRoutes.js           # /api/expense
│   │   └── dashboardRoutes.js         # /api/dashboard
│   ├── uploads/                       # Profile images (auto-created, served statically)
│   ├── .env                           # Secrets — never commit
│   ├── .gitignore                     # node_modules, .env, uploads/
│   ├── .gitattributes                 # LF line endings enforced
│   ├── server.js                      # Entry point
│   └── package.json
│
└── frontend/
    └── expense-tracker/
        ├── public/
        ├── src/
        │   ├── assets/
        │   │   └── images/            # allT.png and other static assets
        │   ├── context/
        │   │   └── UserContext.jsx    # UserProvider — user, updateUser, clearUser
        │   ├── hooks/
        │   │   └── useUserAuth.jsx    # Fetches /getUser on mount; redirects to /login on failure
        │   ├── components/
        │   │   ├── layouts/
        │   │   │   ├── DashboardLaytout.jsx   # Shell: Navbar + SideMenu + children
        │   │   │   ├── AuthLayout.jsx         # Two-column auth shell with decorative panel
        │   │   │   ├── Navbar.jsx             # Top bar + mobile hamburger menu
        │   │   │   └── SideMenu.jsx           # Nav links + user avatar + logout
        │   │   ├── Inputs/
        │   │   │   ├── Input.jsx              # Reusable input with password toggle
        │   │   │   └── ProfilePhotoSelector.jsx # Upload/preview/remove profile photo
        │   │   ├── Cards/
        │   │   │   ├── InfoCard.jsx           # Stat card (balance, income, expenses)
        │   │   │   ├── TransactionInfoCard.jsx # Transaction row with type badge + delete btn
        │   │   │   ├── CustomBarChart.jsx     # Recharts BarChart wrapper (alternating colors)
        │   │   │   └── CharAvatar.jsx         # Initials fallback avatar
        │   │   ├── Charts/
        │   │   │   ├── CustomPieChart.jsx     # Recharts PieChart (donut) with center label
        │   │   │   ├── CustomTooltip.jsx      # Shared tooltip for charts
        │   │   │   └── CustomLegend.jsx       # Shared legend for pie chart
        │   │   └── Dashboard/
        │   │       ├── RecentTransactions.jsx      # Last 5 mixed transactions
        │   │       ├── FinanceOverview.jsx          # Pie: income / expenses / balance
        │   │       ├── ExpenseTramsactions.jsx      # Last 5 expense-only transactions
        │   │       ├── Last30DaysExpense.jsx        # Bar chart (useMemo transform)
        │   │       └── RecentIncomeWithChart.jsx    # Last 60 days income chart + summary
        │   ├── pages/
        │   │   ├── Auth/
        │   │   │   ├── Login.jsx              # Email/password login → JWT → UserContext
        │   │   │   └── SignUp.jsx             # Register + image upload flow
        │   │   └── Dashboard/
        │   │       ├── Home.jsx               # Fetches dashboard data; renders all widgets
        │   │       ├── Income.jsx             # (In development)
        │   │       └── Expense.jsx            # (In development)
        │   ├── utils/
        │   │   ├── apiPath.js                 # BASE_URL + all API_PATHS constants
        │   │   ├── axiosInstance.js           # Axios instance with JWT interceptor + 401 redirect
        │   │   ├── uploadImage.js             # Uploads image via multipart/form-data
        │   │   ├── data.js                    # SIDE_MENU_DATA (nav links + icons)
        │   │   └── helper.js                  # validateEmail, getInitials, addThousandSeparator,
        │   │                                  # prepareExpenseBarChartData
        │   ├── App.jsx                        # Routes + PrivateRoute guard + UserProvider
        │   ├── main.jsx                       # ReactDOM.createRoot (StrictMode)
        │   └── index.css                      # Tailwind v4 @theme block + global styles
        ├── vite.config.js
        └── package.json
```

---

## 🧩 Component Architecture

```
App
└── UserProvider (UserContext — user, updateUser, clearUser)
    └── Router
        ├── /login         → Login
        ├── /signup        → SignUp
        └── PrivateRoute   → checks localStorage("token")
            ├── /dashboard → Home
            │   └── DashboardLaytout (activeMenu="Dashboard")
            │       ├── Navbar (hamburger + mobile SideMenu)
            │       ├── SideMenu (avatar + nav links + logout)
            │       └── children
            │           ├── InfoCard × 3 (Balance, Income, Expenses)
            │           ├── RecentTransactions
            │           ├── FinanceOverview (CustomPieChart)
            │           ├── ExpenseTramsactions
            │           ├── Last30DaysExpense (CustomBarChart + useMemo)
            │           └── RecentIncomeWithChart
            ├── /income    → Income (in development)
            └── /expense   → Expense (in development)
```

> Active menu highlighting is **prop-based** (`activeMenu` string passed down), not `useLocation`.

---

## 🎨 Tailwind v4 Theme

Custom theme is defined in `index.css` using the `@theme` block — **not** `tailwind.config.js`:

```css
@theme {
  --font-display: 'Poppins', sans-serif;
  --breakpoint-3xl: 1920px;
  --color-primary: #875cf5;
}
```

This generates utilities like `bg-primary`, `text-primary` automatically.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### Backend Setup

```bash
cd backend
npm install
# Create .env file (see Environment Variables section)
npm run dev
```

Runs on: `http://localhost:8000`

---

### Frontend Setup

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

> ⚠️ **Never commit `.env`.** It must be in `.gitignore`.

---

## 📡 API Endpoints

### Authentication Routes

**Base URL:** `/api/auth` | **Controller:** `authController.js`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login + receive JWT |
| GET | `/api/auth/getUser` | ✅ | Get logged-in user info |
| POST | `/api/auth/upload-image` | ❌ | Upload profile image → returns URL |

> **Upload flow:** Upload image first → get URL → pass URL in `/register` body. `registerUser` never touches `req.file`.

#### Register — Request Body
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg"
}
```

#### Login — Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login / Register — Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profileImageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg"
  }
}
```

#### Upload Image — Response
```json
{ "imageUrl": "http://localhost:8000/uploads/1234567890-avatar.jpg" }
```

---

### Income Routes

**Base URL:** `/api/income` | **Controller:** `incomeController.js` | **Auth:** ✅ All routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/income/add` | Add income entry |
| GET | `/api/income/get` | Get all income for user |
| DELETE | `/api/income/:id` | Delete income by ID |
| GET | `/api/income/downloadexcel` | Download income as `.xlsx` |

#### Add Income — Request Body
```json
{
  "icon": "💼",
  "source": "Salary",
  "amount": 5000,
  "date": "2024-03-15"
}
```

#### Get All Income — Response
```json
[
  {
    "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
    "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
    "icon": "💼",
    "source": "Salary",
    "amount": 5000,
    "date": "2024-03-15T00:00:00.000Z"
  }
]
```

#### Delete Income — Response
```json
{ "message": "income Deleted Successfully" }
```

---

### Expense Routes

**Base URL:** `/api/expense` | **Controller:** `expenseController.js` | **Auth:** ✅ All routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/expense/add` | Add expense entry |
| GET | `/api/expense/get` | Get all expenses for user |
| DELETE | `/api/expense/:id` | Delete expense by ID |
| GET | `/api/expense/downloadexcel` | Download expenses as `.xlsx` |

#### Add Expense — Request Body
```json
{
  "icon": "🍔",
  "category": "Food",
  "amount": 50,
  "date": "2024-03-15"
}
```

#### Delete Expense — Response
```json
{ "message": "Expense Deleted Successfully" }
```

---

### Dashboard Routes

**Base URL:** `/api/dashboard` | **Controller:** `dashboardController.js` | **Auth:** ✅

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get all aggregated dashboard data |

> All DB queries run in parallel via `Promise.all()` to minimize response time.

#### Response Shape
```json
{
  "totalBalance": 4000,
  "totalIncome": 5000,
  "totalExpenses": 1000,
  "last30DaysExpenses": {
    "total": 1000,
    "transactions": [{ "_id": "...", "category": "Food", "amount": 1000, "date": "..." }]
  },
  "last60DaysIncome": {
    "total": 5000,
    "transactions": [{ "_id": "...", "source": "Salary", "amount": 5000, "date": "..." }]
  },
  "recentTransactions": [
    { "_id": "...", "source": "Salary", "amount": 5000, "type": "income", "date": "..." },
    { "_id": "...", "category": "Food", "amount": 1000, "type": "expense", "date": "..." }
  ]
}
```

> `income` entries use `source`; `expense` entries use `category`.

---

## 🔒 Authentication Flow

1. **Register:** Upload image first → get URL back → POST `/register` with URL in body
2. **Password:** Hashed with `bcryptjs` before saving; `select: false` on schema
3. **Login:** POST `/login` → receive JWT token + user object
4. **Storage:** Token saved to `localStorage`; user object saved to `UserContext`
5. **Auth guard:** `useUserAuth` hook calls `GET /getUser` on mount — redirects to `/login` on failure
6. **Axios interceptor:** Auto-attaches `Authorization: Bearer <token>`; redirects to `/login` on 401 (non-auth routes only)
7. **Logout:** Clears `localStorage` + calls `clearUser()` → redirects to `/login`

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

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit: `git commit -m 'feat: add some feature'`
4. Push: `git push origin feature/your-feature-name`
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

- All protected routes require `Authorization: Bearer <token>` header
- Passwords hashed with bcryptjs; `select: false` means `.select("+password")` required on login queries
- JWT tokens expire after 1 hour
- Excel downloads are generated dynamically per user
- Profile images stored in `uploads/` and served via `express.static`
- Dates stored in ISO 8601 format
- Income and Expense pages are currently placeholder stubs — in development

---

> 💡 *Full-stack personal finance tracker with JWT auth, dashboard analytics, and chart visualizations.*
