// Sidebar.jsx
// This component represents the application's sidebar, which contains the logo and main navigation links.

import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

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

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo /> {/* Display the application logo */}
      <MainNav /> {/* Render the navigation links */}
    </StyledSidebar>
  );
}

export default Sidebar;
