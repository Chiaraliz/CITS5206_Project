import { Row, Col, Button } from "antd";
import Heading from "../components/Heading";
import UserTableOperations from "../components/UserTableOperations";
import SearchBar from "../components/SearchBar";
import MemberTable from "../components/MemberTable";

// The Members component handles the UI for member management.
// It includes the ability to add new members, search, and view the member table.
function Members() {
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
          <Button type="primary">Add New Member</Button>{" "}
          {/* Button to add new members */}
        </Col>
        <Col style={{ marginLeft: "20px" }}>
          <SearchBar /> {/* Search bar for filtering members */}
        </Col>
      </Row>

      {/* Table displaying member information */}
      <MemberTable />
    </>
  );
}

export default Members;
