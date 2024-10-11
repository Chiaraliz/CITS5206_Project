// src/api/adminApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // 替换为你后端的实际地址

// 注册管理员
export const registerAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/register`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 登录管理员
export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 登录超级管理员 (Root)
export const loginRoot = async (rootUsername, rootPassword) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/root/login`, {
      root_username: rootUsername,
      root_password: rootPassword
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 获取所有管理员
export const fetchAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/manage`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 删除管理员
export const deleteAdmin = async (adminId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/manage`, {
      data: { admin_id: adminId }  // 注意 DELETE 请求的请求体使用了 data 参数
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
