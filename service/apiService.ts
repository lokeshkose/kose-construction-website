// src/services/apiService.ts

import { ApiWithoutToken, ApiWithToken } from "./axiosService";

// Generic GET (Fetch Data)
export const fetchData = async <T>(
  endpoint: string,
  query: any
): Promise<T | null> => {
  try {
    const response = await ApiWithToken.get<any>(`/api/${endpoint}`, {
      params: query,
    });
    return response.data;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return null;
  }
};

// Generic POST (Create Data)
export const createItem = async <T>(
  endpoint: string,
  newData: any
): Promise<T | null> => {
  try {
    const response = await ApiWithoutToken.post<any>(`/api/${endpoint}`, newData);
    return response.data;
  } catch (err: any) {
    console.error(`Error creating ${endpoint}:`, err);
    return err?.response?.data?.error || 'Something went wrong!';
  }
};

// Generic PUT (Update Data)
export const updateItem = async (
  endpoint: string,
  id: string,
  updatedData: any
): Promise<boolean> => {
  try {
    const response = await ApiWithToken.put(
      `/api/${endpoint}/${id}`,
      updatedData
    );
    return response.data;
  } catch (err) {
    console.error(`Error updating ${endpoint}:`, err);
    return false;
  }
};

// Generic DELETE (Remove Data)
export const deleteItem = async (
  endpoint: string,
  id: string
): Promise<boolean> => {
  try {
    const response = await ApiWithToken.delete(`/api/${endpoint}/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error deleting ${endpoint}:`, err);
    return false;
  }
};
