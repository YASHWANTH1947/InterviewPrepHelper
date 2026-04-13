import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.models.js";

import { resumeText, jobDescription, selfDescription } from "../sample.js";
async function generateInterviewReportController(req, res) {
  console.log(object);
  const response = await generateInterviewReport({
    resume: resumeText,
    jobDescription,
    selfDescription,
  });

  console.log("Response from ai,", response);
}

export default generateInterviewReportController;
