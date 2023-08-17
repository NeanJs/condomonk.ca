import { api } from "@/handlers/axios";

export const fetchDevelopers = async () => {
  const response = await api.get("developers");
  return response.data.data;
};
export const addDeveloper = async (developer) => {
  const response = await api.post("developers", developer);
  return response.data;
};
export const removeDeveloper = async (id) => {
  const response = await api.delete("developers?id=" + id);
  return response.data;
};
export const updateDeveloper = async (developer) => {
  const response = await api.put("developers", developer);
  return response.data;
};

export const fetchDeveloperById = async (id) => {
  const response = await api.get(`developers?id=${id}`);
  return response.data;
};

export const fetchDeveloperByName = async (name) => {
  const response = await api.get(`developers?name=${name}`);
  return response.data;
};
