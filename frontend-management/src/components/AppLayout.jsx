import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid grid-cols-[26rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Header className="row-span-1 col-span-2" />

      <Sidebar className="row-span-2" />

      <main className="bg-gray-50 p-16 overflow-y-scroll">
        <div className="max-w-screen-lg mx-auto flex flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
