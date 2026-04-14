import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(
      "API Response successful:",
      response.config.url,
      response.status,
    );
    return response;
  },
  (error) => {
    console.error("API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      headers: error.response?.headers,
    });
    return Promise.reject(error);
  },
);

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
    // Return null instead of throwing on 401 - user is not authenticated
    if (error.response?.status === 401) {
      console.log("User not authenticated (401)");
      return null;
    }
    console.log(
      "Error inside getMe service:",
      error.response?.data || error.message,
    );
    return null; // Return null for any error to prevent breaking the app
  }
};

export { logoutUser, loginUser, registerUser, getMe };
