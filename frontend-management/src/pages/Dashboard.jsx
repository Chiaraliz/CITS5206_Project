import Heading from "../components/Heading";

import { Button, Statistic, Row, Col } from "antd";

function Dashboard() {
  return (
    <>
      <Row style={{ marginBottom: "24px" }}>
        <Heading as="h1">Dashboard</Heading>
      </Row>
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Statistic title="All Users" value={2333} />
        </Col>
        <Col span={12}>
          <Statistic title="Active Users" value={1145} />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button type="primary">Export Database</Button>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
