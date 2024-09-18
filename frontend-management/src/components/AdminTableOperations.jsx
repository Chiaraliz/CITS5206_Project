// src/components/AdminTableOperations.jsx
import { Button, Space, Dropdown, message, Segmented } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items = [
  {
    label: "All",
    key: "1",
  },
  {
    label: "Active",
    key: "2",
  },
  {
    label: "Inactive",
    key: "3",
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const AdminTableOperations = () => (
  <Space size="large">
    <Segmented
      options={["All", "Super Admins", "Moderators"]}
      onChange={(value) => {
        console.log(value); // string
      }}
    />
    
    {/* 使用 Link 来导航到 AddAdmin 页面 */}
    <Link to="/addadmin">
      <Button icon={<UserAddOutlined />} type="primary">
        Add Admin
      </Button>
    </Link>

    <Space wrap>
      <Dropdown.Button menu={menuProps}>
        Filter
      </Dropdown.Button>
    </Space>
  </Space>
);

export default AdminTableOperations;
