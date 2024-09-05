import { Row, Col, Button } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";

function Users() {
  return (
    <>
      <Row justify="space-between" align="middle" style={{ width: "100%" }}>
        <Col>
          <Heading as="h1">User Management</Heading>
        </Col>
        <Col>
          <UserTableOperations />
        </Col>
      </Row>
      <Row>
        <Row>
          <Col span={24}>
            <Button type="primary">Add New User</Button>
          </Col>
          <Col span={24}>
            <SearchBar />
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default Users;
