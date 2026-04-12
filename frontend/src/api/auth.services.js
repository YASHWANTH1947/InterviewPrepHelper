import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const registerUser = async ({ username, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error spoted inside api services,register", error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error spotted inside api services,login,", error);
  }
};

const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log("Error spotted inside api services,logout", error);
  }
};

const getMe = async () => {
  try {
    const response = await api.get("/api/auth/getMe");
    return response.data; // If successful (200 OK), return the user data
  } catch (error) {
    // 1. Log the error for your own debugging
    console.log(
      "Error inside getMe service:",
      error.response?.data || error.message,
    );

    // 2. CRITICAL: Throw the error so React Query receives a FAILURE, not 'undefined'
    // This allows isLoading to flip to false and 'isError' to become true.
    throw error;
  }
};

export { logoutUser, loginUser, registerUser, getMe };
