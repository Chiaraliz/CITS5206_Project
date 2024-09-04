import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside className="bg-gray-50 p-8 border-r border-gray-200 flex flex-col gap-8 h-full">
      <Logo />
      <MainNav />
    </aside>
  );
}

export default Sidebar;
