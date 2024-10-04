import { Row, Col } from "antd";
import Heading from "../components/Heading";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";
import UserEditForm from "../components/UserEditForm";
import { useMembers } from "../hooks/useMembers";
import { searchMembers } from "../utils/search";

function Members() {
  const {
    members,
    setMembers,
    loading,
    editingMember,
    handleEdit,
    handleSubmit,
  } = useMembers();

  const handleSearch = (value) => {
    const filteredMembers = searchMembers(members, value);
    setMembers(filteredMembers); // 使用 setMembers 更新成员状态
  };

  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Heading as="h1">Member Management</Heading>
        </Col>
      </Row>

      <Row
        align="middle"
        style={{ marginTop: "20px", width: "100%" }}
        justify="end"
      >
        <Col>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>

      <MemberTable members={members} loading={loading} onEdit={handleEdit} />

      <UserEditForm
        visible={!!editingMember}
        onCancel={() => handleEdit(null)}
        onSubmit={handleSubmit}
        editingMember={editingMember}
      />
    </>
  );
}

export default Members;
