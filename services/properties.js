import { api } from "@/handlers/axios";

export const fetchProperties = async (city) => {
  const URL = city ? `properties?city=${city}` : "properties";
  const response = await api.get(URL);
  return response.data.data;
};

export const postProperty = async (data) => {
  const response = await api.post("properties", data);
  return response;
};
export const updateProperty = async (data) => {
  const response = await api.put(`properties`, data);
  return response;
};
export const deleteProperty = async (id) => {
  const response = await api.delete("properties?id=" + id);
  return response;
};

export const fetchBySlug = async (id) => {
  const response = await api.get("properties?slug=" + id);
  return response.data;
};
