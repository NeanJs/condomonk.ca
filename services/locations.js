import { api } from "@/handlers/axios";

export const fetchCities = async () => {
  const response = await api.get("locations");
  return response.data.data;
};
export const addCity = async (city) => {
  const response = await api.post("locations", city);
  return response.data;
};
export const removeCity = async (id) => {
  const response = await api.delete("locations?id=" + id);
  return response.data;
};
export const updateCity = async (city) => {
  const response = await api.put("locations", city);
  return response.data;
};

export const fetchCityById = async (id) => {
  const response = await api.get(`locations?id=${id}`);
  return response.data;
};

export const fetchCityByName = async (name) => {
  const response = await api.get(`locations?name=${name}`);
  return response.data;
};
