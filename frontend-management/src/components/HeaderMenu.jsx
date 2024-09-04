import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon } from "react-icons/hi2";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
  list-style: none; /* 移除列表项符号 */
  padding: 0; /* 移除默认内边距 */
  margin: 0; /* 移除默认外边距 */
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>
          <HiOutlineMoon />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon>{<HiArrowRightOnRectangle />}</ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
