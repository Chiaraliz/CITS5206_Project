import Box from "./Box";
import Button from "./Button";
import WelcomeUser from "../features/profile/WelcomeUser";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate("/login");
  function handleClick() {
    navigate("/login");
  }
  return (
    <div className="flex justify-between px-60 py-5 mb-5 border-b shadow-sm">
      <a href="https://aasyp.org/">
        <img
          className="h-24"
          src="/cropped-AASYP-Logo-FC-Transparent-300x170.webp"
        />
      </a>
      <Box>
        <WelcomeUser />
        <Button type="logout" onClick={handleClick}>
          Log out
        </Button>
      </Box>
    </div>
  );
}

export default Header;
