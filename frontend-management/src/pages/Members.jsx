import { Row, Col, message } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";
import { useState } from "react";
import { fallbackData } from "../data/Members";
import axios from "axios";
import { useEffect } from "react";
import UserEditForm from "../components/UserEditForm";

// The Members component handles the UI for member management.
// It includes the ability to add new members, search, and view the member table.
function Members() {
  const [members, setMembers] = useState(fallbackData);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // 添加两个状态，分别用于控制 Modal 和保存编辑的成员
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Real Api ultilization
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/list_customers"
        );
        console.log("Fetched datax from API:", response.data);

        if (Array.isArray(response.data)) {
          setMembers(response.data);
        } else {
          console.error("API response is not an array.");
          setMembers(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setMembers(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // 打开编辑窗口
  const openEditModal = (member) => {
    setEditingMember(member); // 设置当前要编辑的成员
    setIsModalVisible(true); // 显示 Modal
  };

  // 关闭编辑窗口
  const handleCancel = () => {
    setIsModalVisible(false); // 关闭 Modal
    setEditingMember(null); // 清空当前编辑的成员
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/list_customers"
      );
      console.log("Fetched data from API:", response.data);

      if (Array.isArray(response.data)) {
        setMembers(response.data);
      } else {
        console.error("API response is not an array.");
        setMembers(fallbackData);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setMembers(fallbackData);
    } finally {
      setLoading(false);
    }
  };
  // 提交表单
  const handleSubmit = async (values) => {
    try {
      // 获取编辑中的用户 ID
      const userId = editingMember.id;

      // 发送 POST 请求更新用户信息
      const response = await axios.post(
        `http://localhost:5000/user/${userId}`,
        values
      );

      // 如果请求成功，显示成功消息
      if (response.status === 200) {
        message.success("User updated successfully");

        // 更新用户列表
        await fetchMembers(); // 重新拉取用户数据

        // 关闭 Modal
        setIsModalVisible(false);
      }
    } catch (error) {
      // 如果请求失败，显示错误消息
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    }
  };

  // 搜索逻辑：根据用户输入的内容过滤成员
  const handleSearch = (value) => {
    if (!value) {
      // 如果搜索框为空，重置为全部成员
      setMembers(fallbackData);
      return;
    }

    const searchTerm = value.trim().toLowerCase();

    const filteredMembers = members.filter(
      (member) =>
        (member.first_name &&
          member.first_name.toLowerCase().includes(searchTerm)) ||
        (member.last_name &&
          member.last_name.toLowerCase().includes(searchTerm)) ||
        (member.email && member.email.toLowerCase().includes(searchTerm)) ||
        (member.id && member.id.toString().includes(searchTerm))
    );

    setMembers(filteredMembers);
  };

  return (
    <>
      {/* Section with heading and member table operations */}
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Heading as="h1">Member Management</Heading>
        </Col>
        <Col>
          <UserTableOperations />{" "}
          {/* Provides options to switch between views */}
        </Col>
      </Row>

      {/* Section with 'Add New Member' button and search bar */}
      <Row
        align="middle"
        style={{ marginTop: "20px", width: "100%" }}
        justify="end"
      >
        <Col>
          <SearchBar onSearch={handleSearch} />
          {/* Search bar for filtering members */}
        </Col>
      </Row>

      {/* Table displaying member information */}
      <MemberTable members={members} loading={loading} onEdit={openEditModal} />

      {/* 编辑表单的 Modal */}
      <UserEditForm
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        editingMember={editingMember}
      />
    </>
  );
}

export default Members;
