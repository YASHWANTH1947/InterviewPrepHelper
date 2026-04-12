import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/index.js";
import cookeParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookeParser());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the Interview Guide API");
});

export default app;
