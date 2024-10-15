// hooks/useMembers.js
import { useState, useEffect } from "react";
import { fetchMembers, updateMember } from "../services/memberService";
import { notification } from "antd";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const openSuccessNotification = () => {
    notification.success({
      message: "Success",
      description: "User information updated successfully!",
      placement: "topRight",
      duration: 3,
    });
  };

  const openErrorNotification = () => {
    notification.error({
      message: "Error",
      description: "Failed to update user information. Please try again later.",
      placement: "topRight",
      duration: 3,
    });
  };

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      const data = await fetchMembers();
      setMembers(data);
      setLoading(false);
    };
    loadMembers();
  }, []);

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleSubmit = async (values, onClose) => {
    if (editingMember) {
      try {
        await updateMember(editingMember.id, values);
        const updatedData = await fetchMembers();
        setMembers(updatedData);
        openSuccessNotification(); // 成功时显示通知
        onClose(); // 成功时关闭表单
      } catch (error) {
        console.error("Error updating user:", error);
        openErrorNotification(); // 失败时显示通知
      }
    }
  };

  return {
    members,
    setMembers, // 添加这一行以返回 setMembers
    loading,
    editingMember,
    handleEdit,
    handleSubmit,
  };
};
