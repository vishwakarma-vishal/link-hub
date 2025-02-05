import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import dbConnect from "./config/database";

const app: Application = express();

dotenv.config();

// middlewares
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/content", contentRoutes);

// database
dbConnect();

// server running
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.listen((PORT), () => {
    console.log("Server is running", PORT);
})