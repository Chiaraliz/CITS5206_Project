import UserAvatar from "./UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="bg-gray-50 p-4 px-12 border-b border-gray-200 flex items-center justify-end gap-6">
      <UserAvatar />
      <HeaderMenu />
    </header>
  );
}

export default Header;
