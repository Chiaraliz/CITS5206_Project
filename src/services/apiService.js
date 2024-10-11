import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Replace with your backend URL
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
  fetchSubscriptionsByEmail: async (email) => {
    let allCustomers = [];
    let offset = null;
    let matchedCustomerId = null;
    let subscriptions = [];

    try {
      // 1. 获取所有客户数据
      do {
        const response = await axios.get(`${CHARGEBEE_BASE_URL}/customers`, {
          params: {
            limit: 100, // 每次请求的最大记录数
            offset: offset,
          },
          auth: {
            username: CHARGEBEE_API_KEY,
            password: "",
          },
        });

        // 添加当前页的客户数据
        allCustomers = allCustomers.concat(response.data.list);

        // 更新offset以获取下一页数据
        offset = response.data.next_offset;
      } while (offset);

      // 2. 查找与指定email匹配的客户
      for (let customerData of allCustomers) {
        const customer = customerData.customer;
        if (customer.email === email) {
          matchedCustomerId = customer.id; // 找到匹配的客户ID
          break; // 找到匹配的客户后直接退出循环
        }
      }

      if (!matchedCustomerId) {
        return `No customer found with email: ${email}`; // 如果没有找到匹配的客户
      }

      // 3. 使用 customer_id 获取客户的订阅信息
      const subscriptionResponse = await axios.get(
        `${CHARGEBEE_BASE_URL}/subscriptions`,
        {
          params: {
            customer_id: matchedCustomerId, // 根据customer_id获取订阅信息
          },
          auth: {
            username: CHARGEBEE_API_KEY,
            password: "",
          },
        }
      );

      // 获取到的订阅信息
      subscriptions = subscriptionResponse.data.list;

      if (subscriptions.length > 0) {
        return subscriptions; // 返回该客户的订阅数据
      } else {
        return `No subscriptions found for customer with email: ${email}`;
      }
    } catch (error) {
      console.error("Error fetching subscriptions by email:", error);
      throw error;
    }
  },
};

export default apiService;
