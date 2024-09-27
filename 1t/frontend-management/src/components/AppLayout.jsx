// AppLayout.jsx
// This component represents the overall layout of the application.
// It includes a header, sidebar, and a main content area (which is dynamically loaded using the Outlet from react-router-dom).

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

// Define the main grid layout for the app
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr; // Sidebar takes 26rem, and main content takes the rest
  grid-template-rows: auto 1fr; // Header is auto-sized, content takes remaining space
  height: 100vh; // Full viewport height
`;

// Main content area styling
const Main = styled.main`
  background-color: var(
    --color-grey-50
  ); // Light grey background for the content area
  padding: 4rem 4.8rem 6.4rem; // Padding around the main content
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header /> {/* Header at the top */}
      <Sidebar /> {/* Sidebar on the left */}
      <Main>
        <Outlet /> {/* Dynamic content based on current route */}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
