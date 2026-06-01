import { api } from "./client";

//Fetch current authenticated user profile.
export const getMyProfile = async () => {
  const { data } = await api.get("/profiles/me");
  return data;
};

//Create a new profile.
export const createProfile = async (payload: {
  first_name: string;
  last_name: string;
  bio?: string;
}) => {
  const { data } = await api.post("/profiles", payload);
  return data;
};


 //Update current user profile.
 export const updateProfile = async (
  payload: Partial<{
    first_name: string;
    last_name: string;
    bio: string;
  }>
) => {
  const { data } = await api.put("/profiles/me", payload);
  return data;
};