// UserTableOperations.jsx
// This component provides table operations such as segmented controls and a dropdown button for user actions.
// It utilizes Ant Design (antd) components like Segmented and Dropdown.

import { Segmented } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

// Handler for button clicks
const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

// Handler for menu item clicks
const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

// Dropdown menu items configuration
const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true, // Danger style for the third item
  },
  {
    label: "4th menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true, // Disable the fourth item
  },
];

// Configuration for the dropdown menu
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const UserTableOperations = () => (
  <Space size="large">
    {/* Segmented control for time period selection */}
    <Segmented
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
      onChange={(value) => {
        console.log(value); // Log the selected value
      }}
    />

    {/* Dropdown button with menu items */}
    <Space wrap>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        Dropdown
      </Dropdown.Button>
    </Space>
  </Space>
);

export default UserTableOperations;
