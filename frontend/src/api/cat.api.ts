import { api } from "./client";

export const createCat = async (payload: {
  name: string;
  age: number;
  breed?: string;
}) => {
  const { data } = await api.post("/cats", payload);
  return data;
};

export const getMyCats = async () => {
  const { data } = await api.get("/cats/me");
  return data;
};

export const deleteCat = async (catId: number) => {
  const { data } = await api.delete(`/cats/${catId}`);
  return data;
};