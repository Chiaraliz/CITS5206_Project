import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogout = () => {
    // Perform any logout logic here, like clearing user data or tokens
    localStorage.removeItem("authToken"); // Example of clearing user token (optional)

    // After logout logic, redirect the user to the login page
    navigate("/login");
  };

  return (
    <StyledHeader>
      <Avatar size="large" icon={<UserOutlined />} /> {/* User avatar */}
      <Button>Username</Button> {/* Display username */}
      <Button onClick={handleLogout}>Log out</Button> {/* Logout button */}
    </StyledHeader>
  );
}

export default Header;
