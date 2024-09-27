import Heading from "../components/Heading";
import { Button, Statistic, Row, Col } from "antd";

// The Dashboard component provides an overview of the platform's statistics
// and offers the ability to export the user database.
function Dashboard() {
  return (
    <>
      {/* Heading of the dashboard page */}
      <Row style={{ marginBottom: "24px" }}>
        <Heading as="h1">Dashboard</Heading>
      </Row>

      {/* Displaying statistics for all users and active users */}
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Statistic title="All Users" value={2333} /> {/* Total user count */}
        </Col>
        <Col span={12}>
          <Statistic title="Active Users" value={1145} />{" "}
          {/* Active user count */}
        </Col>
      </Row>

      {/* Button for exporting the database */}
      <Row>
        <Col span={24}>
          <Button type="primary">Export Database</Button> {/* Export action */}
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
