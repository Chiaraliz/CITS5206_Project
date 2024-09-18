// src/api/apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5173//api"; // Replace with your backend URL

// Example API for user management
const apiService = {
  // Fetch all members
  fetchMembers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/members`);
      return response.data;
    } catch (error) {
      console.error("Error fetching members:", error);
      throw error;
    }
  },

  // Create a new member
  createMember: async (memberData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/members`, memberData);
      return response.data;
    } catch (error) {
      console.error("Error creating member:", error);
      throw error;
    }
  },

  // Update a member
  updateMember: async (memberId, updatedData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/members/${memberId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
  },

  // Delete a member
  deleteMember: async (memberId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/members/${memberId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting member:", error);
      throw error;
    }
  },
};

export default apiService;
