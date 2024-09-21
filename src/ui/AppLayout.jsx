import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto max-w-5xl flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
