import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

import { register } from "../../api/auth.api";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: register,

    onSuccess: () => {
      navigate("/login");
    },

    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      username,
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
        type="text"
        placeholder="Username"
        className="w-full rounded-lg border p-3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

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
      >
        Register
      </button>
    </motion.form>
  );
}