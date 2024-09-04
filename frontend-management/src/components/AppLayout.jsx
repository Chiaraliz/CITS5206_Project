import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const { Sider, Content } = Layout;

function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 左侧的 Sidebar */}
      <Sider width={260} theme="light">
        <Sidebar />
      </Sider>

      {/* 主布局区域 */}
      <Layout>
        {/* 顶部的 Header */}
        <Header />

        {/* 内容区域 */}
        <Content
          style={{
            padding: "40px 48px 64px",
            backgroundColor: "#f9fafb",
            overflow: "auto",
          }}
        >
          <div
            style={{
              maxWidth: "120rem",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
