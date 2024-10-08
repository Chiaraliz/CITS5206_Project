import { Row, Col, Button } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";

function Members() {
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Heading as="h1">Member Management</Heading>
        </Col>
        <Col>
          <UserTableOperations />
        </Col>
      </Row>

      <Row
        justify="space-between"
        align="middle"
        style={{ marginTop: "20px", width: "100%" }}
      >
        <Col>
          <Button type="primary">Add New Member</Button>
        </Col>

        <Col style={{ marginLeft: "20px" }}>
          <SearchBar />
        </Col>
      </Row>
      <MemberTable />
    </>
  );
}

export default Members;
