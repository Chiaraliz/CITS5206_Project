import { Row, Col, Button } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";
import { useState } from "react";
import { fallbackData } from "../data/Members";

// The Members component handles the UI for member management.
// It includes the ability to add new members, search, and view the member table.
function Members() {
  const [members, setMembers] = useState(fallbackData); // 默认使用示例数据
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  // 搜索逻辑：根据用户输入的内容过滤成员
  const handleSearch = (value) => {
    if (!value) {
      // 如果搜索框为空，重置为全部成员
      setMembers(fallbackData);
      return;
    }

    const searchTerm = value.trim();

    // 如果是数字，则搜索ID
    if (!isNaN(searchTerm)) {
      const filteredMembers = fallbackData.filter(
        (member) => member.id === parseInt(searchTerm, 10)
      );
      setMembers(filteredMembers);
    } else {
      // 如果是字母，搜索first_name或last_name
      const filteredMembers = fallbackData.filter(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMembers(filteredMembers);
    }
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
        justify="space-between"
        align="middle"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <Col>
          <Button type="primary">Add New Member</Button>
          {/* Button to add new members */}
        </Col>
        <Col style={{ marginLeft: "20px" }}>
          <SearchBar onSearch={handleSearch} />
          {/* Search bar for filtering members */}
        </Col>
      </Row>

      {/* Table displaying member information */}
      <MemberTable members={members} loading={loading} />
    </>
  );
}

export default Members;
