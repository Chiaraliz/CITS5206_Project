import { useState, useEffect } from "react";
import {
  fetchAdmins,
  deleteAdmin,
  loginRoot,
  registerAdmin,
  loginAdmin,
  editAdmin, // 引入 editAdmin 函数
} from "../services/AdminService"; // 确保路径正确

export const useAdmin = () => {
  const [admins, setAdmins] = useState([]); // 管理员列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误信息

  // 获取管理员列表
  const loadAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdmins();
      setAdmins(data);
    } catch (err) {
      setError("Error fetching admins");
      console.error("Error fetching admin list:", err);
    } finally {
      setLoading(false);
    }
  };

  // 删除管理员
  const removeAdmin = async (adminId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAdmin(adminId);
      // 删除成功后重新加载管理员列表
      loadAdmins();
    } catch (err) {
      setError("Error deleting admin");
      console.error("Error deleting admin:", err);
    } finally {
      setLoading(false);
    }
  };

  // 编辑管理员
  const updateAdmin = async (adminId, values) => {
    setLoading(true);
    setError(null);
    try {
      await editAdmin(adminId, values); // 调用 editAdmin API
      // 更新成功后重新加载管理员列表
      loadAdmins();
    } catch (err) {
      setError("Error updating admin");
      console.error("Error updating admin:", err);
      throw err; // 抛出错误，供调用方处理
    } finally {
      setLoading(false);
    }
  };

  // Root 登录
  const loginAsRoot = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginRoot(username, password);
      return response; // 返回登录成功的数据
    } catch (err) {
      setError("Error logging in as root");
      console.error("Error during root login:", err);
      throw err; // 抛出错误，供调用方处理
    } finally {
      setLoading(false);
    }
  };

  // 管理员注册
  const addAdmin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerAdmin(username, password);
      // 注册成功后重新加载管理员列表
      loadAdmins();
      return response; // 返回注册成功的数据
    } catch (err) {
      setError("Error registering admin");
      console.error("Error during admin registration:", err);
      throw err; // 抛出错误，供调用方处理
    } finally {
      setLoading(false);
    }
  };

  // 管理员登录
  const loginAsAdmin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAdmin(username, password);
      return response; // 返回登录成功的数据
    } catch (err) {
      setError("Error logging in as admin");
      console.error("Error during admin login:", err);
      throw err; // 抛出错误，供调用方处理
    } finally {
      setLoading(false);
    }
  };

  // 初次加载管理员列表
  useEffect(() => {
    loadAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    loadAdmins,
    removeAdmin,
    updateAdmin, // 返回更新管理员的函数
    loginAsRoot,
    addAdmin,
    loginAsAdmin,
  };
};
