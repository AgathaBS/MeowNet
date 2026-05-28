
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";
import { loginSchema } from "../../schemas/auth.schema";

// Infer TypeScript type from schema.
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  // React Hook Form setup.
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Login API mutation.
  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      // Store authenticated user and JWT token.
      setAuth(
        data.user,
        data.access_token
      );

      // Redirect authenticated user.
      navigate("/dashboard");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  // Handle form submission.
  const onSubmit = (
    data: LoginFormData
  ) => {
    mutation.mutate(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email input */}
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border p-3"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password input */}
      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border p-3"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* API error */}
      {mutation.isError && (
        <p className="text-sm text-red-500">
          Invalid credentials
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-black p-3 text-white"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Loading..."
          : "Login"}
      </button>
    </motion.form>
  );
}
