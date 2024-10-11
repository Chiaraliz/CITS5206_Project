import { useLocation, NavLink } from "react-router-dom"; // 引入 useLocation
import styled from "styled-components";
import { HiOutlineHome, HiOutlineUsers, HiOutlineCog } from "react-icons/hi2"; // 导入图标
import Logo from "./Logo"; // 引入Logo

// Styled component for the sidebar layout
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0); // White background
  padding: 3.2rem 2.4rem; // Padding around the sidebar content
  border-right: 1px solid var(--color-grey-100); // Thin grey border on the right
  grid-row: 1 / -1; // The sidebar spans the full height of the layout grid
  display: flex;
  flex-direction: column; // Stack items vertically
  gap: 3.2rem; // Space between logo and navigation
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  color: var(--color-grey-600);

  &:hover,
  &.active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function Sidebar() {
  const location = useLocation(); // 获取当前路径
  const path = location.pathname.toLowerCase(); // 忽略路径大小写

  const isRootDashboard = path === "/rootdashboard";
  const isDashboardOrUsers = path === "/dashboard" || path === "/users";

  return (
    <StyledSidebar>
      <Logo /> {/* 显示应用 Logo */}
      <nav>
        <NavList>
          {/* 如果是 /rootDashboard 页面，显示 Admin */}
          {isRootDashboard && (
            <li>
              <StyledNavLink to="/rootDashboard">
                <HiOutlineCog /> {/* Admin 图标 */}
                <span>Admin</span>
              </StyledNavLink>
            </li>
          )}
          {/* 如果是 /dashboard 或 /users 页面，显示 Dashboard 和 Users */}
          {isDashboardOrUsers && (
            <>
              <li>
                <StyledNavLink to="/dashboard">
                  <HiOutlineHome /> {/* Dashboard 图标 */}
                  <span>Dashboard</span>
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink to="/users">
                  <HiOutlineUsers /> {/* Users 图标 */}
                  <span>Users</span>
                </StyledNavLink>
              </li>
            </>
          )}
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default Sidebar;
