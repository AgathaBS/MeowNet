import { apiClient } from "./client";

export const createCat = async (payload: {
  name: string;
  age: number;
  breed?: string;
}) => {
  const { data } = await apiClient.post("/cats", payload);
  return data;
};

export const getMyCats = async () => {
  const { data } = await apiClient.get("/cats/me");
  return data;
};

export const deleteCat = async (catId: number) => {
  const { data } = await apiClient.delete(`/cats/${catId}`);
  return data;
};