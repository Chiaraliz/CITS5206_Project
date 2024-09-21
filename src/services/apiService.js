import axios from "axios";

const API_BASE_URL = "http://url//api"; // Replace with your backend URL
const CHARGEBEE_BASE_URL = "https://aasyp-test.chargebee.com/api/v2";
const CHARGEBEE_API_KEY = import.meta.env.VITE_API_KEY;

const apiService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, loginData);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  fetchUserById: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  updateUserById: async (userId, userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  //interact with chargebee api
  //customerId from chargebee
  fetchSubscriptionsByCustomerId: async (customerId) => {
    try {
      const response = await axios.get(`${CHARGEBEE_BASE_URL}/subscriptions`, {
        params: {
          customer_id: customerId,
        },
        auth: {
          username: CHARGEBEE_API_KEY,
          password: "",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching subscriptions by customer ID:", error);
      throw error;
    }
  },
};

export default apiService;
