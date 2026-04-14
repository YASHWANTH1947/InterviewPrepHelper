import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
});

const extractUser = (response) => response.data?.user ?? null;

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return extractUser(response);
  } catch (error) {
    console.log("Error spoted inside api services,register", error);
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return extractUser(response);
  } catch (error) {
    console.log("Error spotted inside api services,login,", error);
    throw error;
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Error spotted inside api services,logout", error);
    throw error;
  }
};

const getMe = async () => {
  try {
    const response = await api.get("/api/auth/getMe");
    return extractUser(response);
  } catch (error) {
    console.log(
      "Error inside getMe service:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export { logoutUser, loginUser, registerUser, getMe };
