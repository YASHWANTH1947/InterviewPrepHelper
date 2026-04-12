import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.services";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const Navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      Navigate("/");
    },
  });

  return (
    <div>
      {/* Stitched UI login fields */}
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => mutate({ email, password })}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
      // Inside Login.jsx
      <button onClick={() => Navigate("/register")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
}

export default Login;
