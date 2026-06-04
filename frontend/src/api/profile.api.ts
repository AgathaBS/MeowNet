import { api } from "./client";
import type { Profile, CreateProfilePayload } from "../types/profile.types";


//Fetch current authenticated user profile.
export const getMyProfile = async (): Promise<Profile> => {
  const response = await api.get("/profiles/me");

  return response.data;
};
//Create a new profile.
export const createProfile = async (
  data: CreateProfilePayload
): Promise<Profile> => {
  const response = await api.post("/profiles/", data);

  return response.data;
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