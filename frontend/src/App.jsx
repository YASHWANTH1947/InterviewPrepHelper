import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getMe } from "./api/auth.services.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
function App() {
  const queryClient = useQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // This stops the constant background calling
        retry: false, // Optional: stops it from trying 3 times on failure
      },
    },
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"], // The "ID" for this user's data in the cache
    queryFn: getMe, // Call your getMe service
    retry: false, // If 401 Unauthorized, don't try again
  });

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
