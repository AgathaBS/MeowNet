import { useAuthStore } from "../store/auth.store";

import { useMyProfileQuery } from "../hooks/useProfile";
import { useMyCatsQuery } from "../hooks/useCats";

/**
 * Protected dashboard page.
 * Only authenticated users can access this page.
 */
export default function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useMyProfileQuery();

  const {
    data: cats,
    isLoading: catsLoading,
    error: catsError,
  } = useMyCatsQuery();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          You are successfully authenticated.
        </p>

        {/* Profile Section */}
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">
            My Profile
          </h2>

          {profileLoading && (
            <p>Loading profile...</p>
          )}

          {profileError && (
            <p className="text-red-500">
              Failed to load profile.
            </p>
          )}

          {profile && (
            <pre className="rounded bg-gray-100 p-4 text-sm overflow-auto">
              {JSON.stringify(profile, null, 2)}
            </pre>
          )}
        </div>

        {/* Cats Section */}
        <div className="mb-8">
          <h2 className="mb-3 text-2xl font-semibold">
            My Cats
          </h2>

          {catsLoading && (
            <p>Loading cats...</p>
          )}

          {catsError && (
            <p className="text-red-500">
              Failed to load cats.
            </p>
          )}

          {cats && (
            <pre className="rounded bg-gray-100 p-4 text-sm overflow-auto">
              {JSON.stringify(cats, null, 2)}
            </pre>
          )}
        </div>

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