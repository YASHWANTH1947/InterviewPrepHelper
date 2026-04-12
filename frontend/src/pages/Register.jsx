import React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.services";

function Register() {
  const Navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["authUser"], data);
      Navigate("/");
    },
    onError: (error) => {
      console.log("Error while finding data in register", error);
    },
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData); // This triggers the service function
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Use your stitched UI inputs here */}
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
