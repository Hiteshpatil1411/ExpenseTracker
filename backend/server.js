require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path= require("path");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const  authRoutes = require("./routes/authRoutes");
const  expenseRoutes = require("./routes/expenseRoutes");
const  incomeRoutes = require("./routes/incomeRoutes");
const  dashboardRoutes = require("./routes/dashboardRoutes");
app.use(
    cors({
        origin: process.env.CLIENT_URL||"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
)

app.use(express.json());
connectDB();
//server uploads folder as static
app.use("/uploads",express.static(path.join(__dirname,"uploads")));
 

app.use("/api/auth",authRoutes);
app.use("/api/income",incomeRoutes);
app.use("/api/expense",expenseRoutes);
app.use("/api/dashboard",dashboardRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
