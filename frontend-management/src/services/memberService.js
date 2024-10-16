import axios from "axios";
import { fallbackData } from "../data/Members";

export const fetchMembers = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/members");
    return Array.isArray(response.data) ? response.data : fallbackData;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return fallbackData;
  }
};

// 修改 updateMember 函数以调用新的更新接口
export const updateMember = async (userId, values) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/members/${userId}`, // 使用 PUT 方法更新成员信息
      values
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
