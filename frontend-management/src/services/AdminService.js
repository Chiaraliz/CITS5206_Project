import axios from "axios";

// Fetch the list of all admins
export const fetchAdmins = async () => {
  try {
    const response = await axios.get("http://localhost:5000/admin/manage");
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching admin list:", error);
    return []; // Return empty list in case of error
  }
};

// Delete an admin by admin ID
export const deleteAdmin = async (adminId) => {
  try {
    const response = await axios.delete("http://localhost:5000/admin/manage", {
      data: { admin_id: adminId }, // Admin ID is sent in the body
    });
    return response;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};

// Root login function
export const loginRoot = async (rootUsername, rootPassword) => {
    try {
      const response = await axios.post("http://localhost:5000/root/login", {
        root_username: rootUsername,
        root_password: rootPassword,
      });
      return response.data; // Return response data on success
    } catch (error) {
      console.error("Error during root login:", error.response?.data || error);
      throw error;
    }
  };

  // Admin registration function
export const registerAdmin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/admin/register", {
        username: username,
        password: password,
      });
      return response.data; // Return response data on successful registration
    } catch (error) {
      console.error("Error during admin registration:", error.response?.data || error);
      throw error;
    }
  };

  // Admin login function
export const loginAdmin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        username: username,
        password: password,
      });
      return response.data; // Return response data on successful login
    } catch (error) {
      console.error("Error during admin login:", error.response?.data || error);
      throw error;
    }
  };