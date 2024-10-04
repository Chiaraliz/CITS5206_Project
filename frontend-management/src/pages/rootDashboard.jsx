import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Table } from 'antd';
import axios from 'axios';
import Heading from '../components/Heading';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

const RootDashboard = () => {
  const navigate = useNavigate(); // 使用 useNavigate
  const [totalAdmins, setTotalAdmins] = useState(0); // 总管理员数量
  const [activeAdmins, setActiveAdmins] = useState(0); // 活跃管理员数量
  const [loading, setLoading] = useState(true); // 加载状态
  const [adminData, setAdminData] = useState([]); // 管理员数据

  // 调用API获取管理员统计数据和管理员列表
  useEffect(() => {
    const fetchAdminCounts = async () => {
      try {
        const totalResponse = await axios.get(
          "http://localhost:5000/api/admins/count"
        );
        setTotalAdmins(totalResponse.data.total_count);

        const activeResponse = await axios.get(
          "http://localhost:5000/api/admins/active/count"
        );
        setActiveAdmins(activeResponse.data.active_count);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin counts:", error);
        setLoading(false);
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admins");
        setAdminData(response.data); // 假设返回的数据是管理员数组
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminCounts();
    fetchAdminData(); // 获取管理员信息
  }, []);

  // 表格列定义
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Heading as="h1">Admin Management Dashboard</Heading>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="Total Admins" loading={loading}>
            <p>{totalAdmins}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active Admins" loading={loading}>
            <p>{activeAdmins}</p>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Button type="primary" onClick={() => navigate("/addAdmin")}> {/* 注意这里的路径 */}
            Add Admin
          </Button>
        </Col>
      </Row>

      {/* 添加管理员信息表格 */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={adminData}
            rowKey="username"
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default RootDashboard;
