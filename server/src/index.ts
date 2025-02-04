import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// middlewares
app.use(express.json());

// routes
import authRoutes from "./routes/authRoutes";

app.use("/auth", authRoutes);
// app.use("/content", contentRoutes);

// database
import dbConnect from "./config/db";
dbConnect();

// server running
app.listen((process.env.PORT), () => {
    console.log("Server is running", process.env.PORT);
})