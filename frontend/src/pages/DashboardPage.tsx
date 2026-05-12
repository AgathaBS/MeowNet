import { useAuthStore } from "../store/auth.store";

// Protected dashboard page.
// Only authenticated users can access this page.
export default function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mb-6 text-gray-600">
          You are successfully authenticated.
        </p>

        <button
          onClick={logout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}