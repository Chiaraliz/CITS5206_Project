// src/pages/RootDashboard.jsx
import React from 'react';
import Heading from '../components/Heading';
import AdminTable from '../components/AdminTable'; // 引入AdminTable
import AdminTableOperations from '../components/AdminTableOperations'; // 引入AdminTableOperations
import { Row, Col } from 'antd';

const RootDashboard = () => {
  return (
    <>
      <Row style={{ marginBottom: '24px' }}>
        <Heading as="h1">Admin Management</Heading>
      </Row>
      <Row style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <AdminTableOperations />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <AdminTable />
        </Col>
      </Row>
    </>
  );
}

export default RootDashboard;
