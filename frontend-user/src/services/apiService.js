import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api"; // Replace with your backend URL

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
  getSubscriptionByUserId: async (userId) => {
    try {
      // 调用 API 根据 userId 获取订阅信息
      const response = await axios.get(
        `${API_BASE_URL}/user/${userId}/subscription`
      );

      // 提取返回的订阅数据
      const subscription = response.data;

      // 检查 subscription 是否为空对象或没有订阅项目
      if (!subscription || Object.keys(subscription).length === 0) {
        return {
          error: "No subscription available", // 返回自定义错误信息
        };
      }

      // 返回订阅信息
      return {
        subscription_items: subscription.subscription_items, // 订阅项目
        currency_code: subscription.currency_code, // 货币代码
        billing_period_unit: subscription.billing_period_unit, // 计费周期单位
        status: subscription.status, // 订阅状态
        started_at: new Date(
          subscription.started_at * 1000
        ).toLocaleDateString(), // 订阅开始日期
        current_term_end: new Date(
          subscription.current_term_end * 1000
        ).toLocaleDateString(), // 当前订阅期结束日期
      };
    } catch (error) {
      // 处理异常
      console.error(
        `Error fetching subscription for user ${userId}:`,
        error.message
      );
      return { error: error.message };
    }
  },
};

export default apiService;
