import { generateInterviewReport } from "../services/ai.services.js";
import interviewReportModel from "../models/interviewReport.models.js";
import { PDFParse } from "pdf-parse";
import { resumeText, jobDescription, selfDescription } from "../sample.js";

/* This function generates a report based on input and also stores it into backend*/
async function generateInterviewReportController(req, res) {
  if (!req.file || !req.file.buffer) {
    console.log("The resume file is not successfully uploaded!!");
    return res.status(400).json({ message: "Resume file is required" });
  }
  /* Multer gives a buffer which is simply a format in which data is stored in ram, it works well on node server, but pdf-parser requires universal data, broswer also needs to parse data, so we use uint8array
   */

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
  const newReport = await interviewReportModel.create({
    resume: data.text,
    user: req.user.userId,
    jobDescription,
    selfDescription,
    ...response,
  });
  console.log("Schema saved in database:", newReport);
  console.log("Response from ai,", response);
  return res.status(200).json({
    message: "Interview report generated successfully",
    report: response,
  });
}

const getSingleReport = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from the URL
    const report = await interviewReportModel.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID format or Server Error" });
  }
};

const getAllUserReports = async (req, res) => {
  try {
    // 1. Filter by user ID (from your auth middleware)
    // 2. Select ONLY specific fields using .select()
    // 3. Sort by newest first
    const reports = await interviewReportModel
      .find({ user: req.user.userId })
      .select("title matchScore createdAt")
      .sort({ createdAt: -1 });
    console.log("Reports obtained", reports);
    res.status(200).json({
      message: "Successfully obtained all reports!!",
      report: reports,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
export {
  generateInterviewReportController,
  getSingleReport,
  getAllUserReports,
};
