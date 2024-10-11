import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function AppLayout() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
