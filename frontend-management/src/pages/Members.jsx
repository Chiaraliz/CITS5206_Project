import { Row, Col } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";
import { useState } from "react";
import { fallbackData } from "../data/Members";
import axios from "axios";
import { useEffect } from "react";

// The Members component handles the UI for member management.
// It includes the ability to add new members, search, and view the member table.
function Members() {
  const [members, setMembers] = useState(fallbackData);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

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
      <MemberTable members={members} loading={loading} />
    </>
  );
}

export default Members;
