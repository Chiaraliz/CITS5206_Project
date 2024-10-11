import axios from "axios";
import { fallbackData } from "../data/Members";

export const fetchMembers = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/list_customers"
    );
    return Array.isArray(response.data) ? response.data : fallbackData;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return fallbackData;
  }
};

export const updateMember = async (userId, values) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/${userId}`,
      values
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const updateChargebeeMember = async (userId, values) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/user/${userId}/update`,
      values
    );
    return response;
  } catch (error) {
    console.error("Error updating Chargebee user:", error);
    throw error;
  }
};
