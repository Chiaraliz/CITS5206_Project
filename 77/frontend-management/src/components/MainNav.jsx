import { NavLink, useLocation } from "react-router-dom"; // 引入 useLocation
import styled from "styled-components";
import { HiOutlineCog } from "react-icons/hi2"; // 导入 Admin 图标

// Styles for the navigation list
const NavList = styled.ul`
  display: flex;
  flex-direction: column; // Vertical list
  gap: 0.8rem; // Space between items
`;

// Styles for individual navigation links
const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem; // Gap between icon and text
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem; // Icon size
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600); // Change color when active or hovered
  }
`;

function MainNav() {
  const location = useLocation(); // 获取当前的路由路径

  // 仅显示 Admin 选项在 rootDashboard 页面
  return (
    <nav>
      <NavList>
        {location.pathname.toLowerCase().startsWith("/rootdashboard") && (
          <li>
            <StyledNavLink to="/rootDashboard">
              <HiOutlineCog /> {/* Admin Dashboard icon */}
              <span>Admin</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </nav>
  );
}

export default MainNav;
