import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import aiRoutes from "./routes/interviewReport.routes.js";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
      "https://interview-prep-helper.vercel.app",
    ].filter(Boolean),
    credentials: true, // Essential for sending/receiving cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/interviewReport", aiRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Interview Guide API");
});

export default app;
