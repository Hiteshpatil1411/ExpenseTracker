require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path= require("path");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const  authRoutes = require("./routes/authRoutes");
app.use(
    cors({
        origin: process.env.CLIENT_URL||"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
)

app.use(express.json());
connectDB();
 

app.use("/api/auth",authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
