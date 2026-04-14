import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getMe } from "./api/auth.services.js";
import { useQuery } from "@tanstack/react-query";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import InterviewReport from "./pages/InterviewReport.jsx";
import InterviewReportResult from "./pages/InterviewReportResult.jsx";
import PreviousReports from "./pages/PreviousReports.jsx";

function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent px-6 text-slate-100">
        <div className="glass-panel rounded-[2rem] px-6 py-5 text-sm uppercase tracking-[0.3em] text-cyan-100/80">
          Loading your workspace
        </div>
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
        <Route
          path="/interview-report"
          element={user ? <InterviewReport /> : <Navigate to="/login" />}
        />
        <Route
          path="/interview-result"
          element={user ? <InterviewReportResult /> : <Navigate to="/login" />}
        />
        <Route
          path="/previous-reports"
          element={user ? <PreviousReports /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
