import Box from "./Box";
import Button from "./Button";
import WelcomeUser from "../features/profile/WelcomeUser";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();

  // 处理用户登出逻辑
  const handleLogout = () => {
    // 清除localStorage中的token
    localStorage.removeItem("token");

    // 可以清除其他相关的用户数据（如果有）
    // localStorage.removeItem("userId");

    // 重定向到登录页面
    navigate("/login");
  };
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
        <Button type="logout" onClick={handleLogout}>
          Log out
        </Button>
      </Box>
    </div>
  );
}

export default Header;
