import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.services";
import AuthLayout from "../components/AuthLayout";
import AuthField from "../components/AuthField";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data) {
        setErrorMessage("We couldn't sign you in. Please try again.");
        return;
      }

      queryClient.setQueryData(["authUser"], data);
      navigate("/");
    },
    onError: () => {
      setErrorMessage("Invalid credentials. Double-check your email and password.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    mutate({ email, password });
  };

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your prep space"
      description="Pick up your interview rhythm, reopen your notes, and continue where your last session left off."
      ctaText="New here?"
      ctaLabel="Create an account"
      ctaTo="/register"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField
          id="login-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />
        <AuthField
          id="login-password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
        />

        {errorMessage ? (
          <p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/60"
        >
          {isPending ? "Signing you in..." : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
