import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Database connection
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
