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
  background-color: var(--color-grey-50); // Light grey background for the content area
  padding: 4rem 4.8rem 6.4rem; // Padding around the main content
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header /> {/* 显示 Header */}
      <Sidebar /> {/* 始终显示 Sidebar */}
      <Main>
        <Outlet /> {/* 显示动态内容 */}
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
