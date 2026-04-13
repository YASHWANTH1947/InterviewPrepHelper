import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.middleware.js";
import generateInterviewReportController from "../controllers/ai.controllers.js";
const router = Router();
console.log("Interview routes are being trigered!!");

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  generateInterviewReportController,
);

export default router;
