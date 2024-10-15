import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { Button, Row, Col, Card } from "antd";
import axios from "axios";
import { saveAs } from "file-saver";

// The Dashboard component provides an overview of the platform's statistics
// and offers the ability to export the user database.

const Dashboard = () => {
  const [members, setMembers] = useState([]);
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

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/members");
        console.log("Fetched data from API:", response.data);

        if (Array.isArray(response.data)) {
          setMembers(response.data);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // 导出 CSV 文件的函数
  const exportToCSV = () => {
    // 构建 CSV 头
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Date of Birth",
      "Membership Type",
    ];
    // 构建 CSV 行
    const rows = members.map((member) => [
      member.id,
      member.first_name,
      member.last_name,
      member.email,
      member.date_of_birth,
      member.membership_type,
    ]);

    // 组合成 CSV 字符串
    let csvContent = headers.join(",") + "\n"; // 添加 CSV 头
    csvContent += rows.map((row) => row.join(",")).join("\n"); // 添加 CSV 行

    // 创建 Blob 对象并触发下载
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "members_data.csv"); // 保存文件为 members_data.csv
  };

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
          <Button type="primary" onClick={exportToCSV}>
            Export Database
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
