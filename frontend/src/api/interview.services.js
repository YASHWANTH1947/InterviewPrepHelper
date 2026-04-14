import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const getInterviewReport = async ({
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
