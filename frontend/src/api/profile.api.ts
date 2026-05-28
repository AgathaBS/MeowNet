import { apiClient } from "./client";

export const getMyProfile = async () => {
  const { data } = await apiClient.get("/profiles/me");
  return data;
};

export const createProfile = async (payload: {
  first_name: string;
  last_name: string;
  bio?: string;
}) => {
  const { data } = await apiClient.post("/profiles", payload);
  return data;
};

export const updateProfile = async (
  payload: Partial<{
    first_name: string;
    last_name: string;
    bio: string;
  }>
) => {
  const { data } = await apiClient.put("/profiles/me", payload);
  return data;
};