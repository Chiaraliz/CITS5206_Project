import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon } from "react-icons/hi2";

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <ul className="flex gap-1">
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
    </ul>
  );
}

export default HeaderMenu;
