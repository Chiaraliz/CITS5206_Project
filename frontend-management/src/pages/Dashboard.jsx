import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { Button, Row, Col, Card } from "antd";
import axios from "axios";

// The Dashboard component provides an overview of the platform's statistics
// and offers the ability to export the user database.

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0); // 总用户数量
  const [activeMembers, setActiveMembers] = useState(0); // 活跃用户数量
  const [loading, setLoading] = useState(true); // 加载状态

  // 调用API获取总用户数量和活跃用户数量
  useEffect(() => {
    const fetchMemberCounts = async () => {
      try {
        // 请求总用户数量
        const totalResponse = await axios.get(
          "http://localhost:5000/api/members/count"
        );
        setTotalMembers(totalResponse.data.total_count); // 更新总用户数量

        // 请求活跃用户数量
        const activeResponse = await axios.get(
          "http://localhost:5000/api/members/active/count"
        );
        setActiveMembers(activeResponse.data.active_count); // 更新活跃用户数量

        setLoading(false); // 请求完成，停止加载状态
      } catch (error) {
        console.error("Error fetching member counts:", error);
        setLoading(false); // 即使出错，也停止加载状态
      }
    };

    fetchMemberCounts(); // 调用API
  }, []);

  return (
    <>
      {/* Heading of the dashboard page */}
      <Row style={{ marginBottom: "24px" }}>
        <Heading as="h1">Dashboard</Heading>
      </Row>

      {/* Displaying statistics for all users and active users */}
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Card title="Total Members" loading={loading}>
            <p>{totalMembers}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active Members" loading={loading}>
            <p>{activeMembers}</p>
          </Card>
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
};

export default Dashboard;
