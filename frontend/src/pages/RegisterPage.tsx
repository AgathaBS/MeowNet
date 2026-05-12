import RegisterForm from "../components/auth/RegisterForm";

// Registration page displayed at route: /register
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold">
          Register
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
}