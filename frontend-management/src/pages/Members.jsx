import { Row, Col } from "antd";
import Heading from "../components/Heading";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";
import UserEditForm from "../components/UserEditForm";
import { useMembers } from "../hooks/useMembers";
import { searchMembers } from "../utils/search";
import { fetchMembers } from "../services/memberService";

function Members() {
  const {
    members,
    setMembers,
    loading,
    editingMember,
    handleEdit,
    handleSubmit,
  } = useMembers();

  const handleSearch = async (value) => {
    if (!value) {
      // 如果搜索框为空，重新加载全部成员数据
      const allMembers = await fetchMembers(); // 重新获取所有成员
      setMembers(allMembers); // 重置为全部成员
      return;
    }

    // 使用封装好的 searchMembers 函数来过滤成员
    const filteredMembers = searchMembers(members, value);
    setMembers(filteredMembers); // 设置过滤后的成员
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
