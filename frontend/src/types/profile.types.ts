export interface Profile {
  id: number;
  user_id: number;

  username: string;

  bio: string | null;

  avatar_url: string | null;

  created_at: string;
}

export interface CreateProfilePayload {
  bio?: string;
  avatar_url?: string;
}