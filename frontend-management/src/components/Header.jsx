import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

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
  return (
    <StyledHeader>
      <Avatar size="large" icon={<UserOutlined />} />

      <Button>Username</Button>
      <Button>Log out</Button>
    </StyledHeader>
  );
}

export default Header;
