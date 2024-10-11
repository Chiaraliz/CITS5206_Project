import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";
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

  signup: async (signupData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, signupData);
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
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
      const response = await axios.post(`${API_BASE_URL}/user/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Interact with Chargebee API to fetch subscriptions by email
  fetchSubscriptionsByEmail: async (email) => {
    let allCustomers = [];
    let offset = null;
    let matchedCustomerId = null;
    let subscriptions = [];

    const headers = {
      "Authorization": `Basic ${btoa(CHARGEBEE_API_KEY + ":")}`,  // Encode API Key in Base64 format
    };

    try {
      // 1. Fetch all customers
      do {
        const response = await axios.get(`${CHARGEBEE_BASE_URL}/customers`, {
          params: {
            limit: 100,
            offset: offset,
          },
          headers: headers,  // Use Authorization header instead of auth
        });

        allCustomers = allCustomers.concat(response.data.list);
        offset = response.data.next_offset;
      } while (offset);

      // 2. Fin
