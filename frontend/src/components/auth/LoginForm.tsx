import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export default function LoginForm() {
  const navigate = useNavigate();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      // Store authentication data after successful login.
      setAuth(
        {
          id: "temp-id",
          username: "temp-user",
          email,
        },
        data.access_token
      );

      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full rounded-lg border p-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-lg border p-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full rounded-lg bg-black p-3 text-white"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Loading..." : "Login"}
      </button>
    </motion.form>
  );
}