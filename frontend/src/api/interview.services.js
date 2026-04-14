import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});
/* 
form data is used when you send key value pairs, like the value can be file, here we are trying to send pdf file from frontend to backend where it will be recieved by multer.form data is browser api 

*/
const getInterviewReport = async ({
  resumeFile,
  jobDescription,
  selfDescription,
}) => {
  const formD = new FormData();
  formD.append("jobDescription", jobDescription);
  formD.append("selfDescription", selfDescription);
  formD.append("file", resumeFile);
  const response = await api.post("/api/interviewReport", formD);
  if (response.data) {
    console.log(response.data.message);
  }
  return response.data.report;
};

/**
 * We  need to understand axios automatically handles cookies so we do neet to worry about authentication as if we really are authenticated axios hands over the token inside the cookie to backend for verification
 */
const getAllReports = async () => {
  try {
    const response = await api.get("/api/interviewReport");
    if (response.data) {
      console.log(response.message);
    }
    return response.data.report;
  } catch (error) {
    console.log(
      "Error while fetching all reports,Reporting from frontend,By ben 10",
      error,
    );
    throw error;
  }
};

const getReportById = async (id) => {
  try {
    const response = await api.get(`/api/interviewReport/${id}`);
    if (response.data) {
      console.log(response.data);
    }
    return response.data.report;
  } catch (error) {
    console.log("Error happened while getting a single report,", error);
    throw error;
  }
};

export { getInterviewReport, getAllReports, getReportById };
