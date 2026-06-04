import { useEffect, useState } from "react";
import { getMyProfile, createProfile } from "../api/profile.api";
import type { Profile } from "../types/profile.types";
export default function ProfilePage() {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  void getMyProfile()
    .then(setProfile)
    .catch(() => setProfile(null))
    .finally(() => setLoading(false));
  }, []);



  const handleCreateProfile = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const newProfile = await createProfile({
        bio,
        avatar_url: avatarUrl,
      });

      setProfile(newProfile);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div>
        <h1>Create Profile</h1>

        <form onSubmit={handleCreateProfile}>
          <input
            type="text"
            placeholder="Avatar URL"
            value={avatarUrl}
            onChange={(e) =>
              setAvatarUrl(e.target.value)
            }
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />

          <button type="submit">
            Create Profile
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>My Profile</h1>

      {profile.avatar_url && (
        <img
          src={profile.avatar_url}
          alt="Profile avatar"
          width={150}
        />
      )}

      <h2>{profile.username}</h2>

      <p>{profile.bio}</p>
    </div>
  );
}