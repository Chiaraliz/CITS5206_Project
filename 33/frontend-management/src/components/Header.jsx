// Header.jsx
// This component renders the top navigation header for the application.
// It includes a user avatar, username, and logout button.

import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

// Styled component for the header
const StyledHeader = styled.header`
  background-color: var(--color-grey-0); // White background
  padding: 1.2rem 4.8rem; // Padding inside the header
  border-bottom: 1px solid var(--color-grey-100); // Thin grey border at the bottom
  display: flex; // Flexbox layout to align items
  gap: 2.4rem; // Gap between avatar, username, and logout button
  align-items: center; // Vertically center items
  justify-content: flex-end; // Align items to the right
`;

function Header() {
  return (
    <StyledHeader>
      <Avatar size="large" icon={<UserOutlined />} /> {/* User avatar */}
      <Button>Username</Button> {/* Display username */}
      <Button>Log out</Button> {/* Logout button */}
    </StyledHeader>
  );
}

export default Header;
