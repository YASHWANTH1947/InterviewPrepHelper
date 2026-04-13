import { Router } from "express";

import generateInterviewReportController from "../controllers/ai.controllers.js";
const router = Router();

router.get("/", generateInterviewReportController);

export default router;
