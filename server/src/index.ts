import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import dbConnect from "./config/database";

const SECRET = process.env.SECRET as string;
if (!SECRET) {
    throw new Error("JWT secret is not defined in the .env file.");
}

export default SECRET;

const app: Application = express();

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