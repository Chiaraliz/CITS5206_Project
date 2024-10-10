// hooks/useMembers.js
import { useState, useEffect } from "react";
import {
  fetchMembers,
  updateMember,
  updateChargebeeMember,
} from "../services/memberService";

export const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

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

  const handleSubmit = async (values) => {
    if (editingMember) {
      await updateMember(editingMember.id, values);
      const updatedData = await fetchMembers();
      setMembers(updatedData);
    }
  };

  const handleChargebeeSubmit = async (values) => {
    if (editingMember) {
      try {
        await updateChargebeeMember(editingMember.id, values);
        const updatedData = await fetchMembers();
        setMembers(updatedData);
      } catch (error) {
        console.error("Error updating Chargebee user:", error);
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
    handleChargebeeSubmit,
  };
};
