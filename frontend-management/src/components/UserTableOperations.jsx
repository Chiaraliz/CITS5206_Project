import { Segmented } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";

const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};
const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

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
    danger: true,
  },
  {
    label: "4rd menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const UserTableOperations = () => (
  <Space size="large">
    <Segmented
      options={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
      onChange={(value) => {
        console.log(value); // string
      }}
    />

    <Space wrap>
      <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
        Dropdown
      </Dropdown.Button>
    </Space>
  </Space>
);
export default UserTableOperations;
