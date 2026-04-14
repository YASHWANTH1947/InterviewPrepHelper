import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.services";
import AuthLayout from "../components/AuthLayout";
import AuthField from "../components/AuthField";

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (!data) {
        setErrorMessage("We couldn't create your account. Please try again.");
        return;
      }

      queryClient.setQueryData(["authUser"], data);
      navigate("/");
    },
    onError: () => {
      setErrorMessage("Registration failed. Try a different email or username.");
    },
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    mutate(formData);
  };
  return (
    <AuthLayout
      eyebrow="Create account"
      title="Start building your interview edge"
      description="Create your workspace, keep every practice session in one flow, and turn preparation into a repeatable system."
      ctaText="Already have an account?"
      ctaLabel="Sign in instead"
      ctaTo="/login"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthField
          id="register-username"
          label="Username"
          placeholder="How should we address you?"
          value={formData.username}
          onChange={(event) =>
            setFormData({ ...formData, username: event.target.value })
          }
          autoComplete="username"
        />
        <AuthField
          id="register-email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          autoComplete="email"
        />
        <AuthField
          id="register-password"
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
          autoComplete="new-password"
        />

        {errorMessage ? (
          <p className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-amber-300 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-amber-300/60"
        >
          {isPending ? "Creating your space..." : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
