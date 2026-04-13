import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.models.js";
import { PDFParse } from "pdf-parse";
import { resumeText, jobDescription, selfDescription } from "../sample.js";
async function generateInterviewReportController(req, res) {
  if (!req.file || !req.file.buffer) {
    console.log("The resume file is not successfully uploaded!!");
    return res.status(400).json({ message: "Resume file is required" });
  }
  const { jobDescription, selfDescription } = req.body;
  const unitData = new Uint8Array(req.file.buffer);
  const parser = new PDFParse(unitData);
  const data = await parser.getText();
  console.log("Extracted text from resume pdf file,", data.text);

  const response = await generateInterviewReport({
    resume: data.text,
    jobDescription,
    selfDescription,
  });

  console.log("Response from ai,", response);
  return res.status(200).json({
    message: "Interview report generated successfully",
    report: response,
  });
}

export default generateInterviewReportController;
