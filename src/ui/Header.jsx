import Box from "./Box";
import Button from "./Button";
import WelcomeUser from "../features/profile/WelcomeUser";
function Header() {
  return (
    <div className="flex justify-between px-32 py-5 border-b shadow-sm">
      <a href="https://aasyp.org/">
        <img
          className="h-24"
          src="/cropped-AASYP-Logo-FC-Transparent-300x170.webp"
        />
      </a>
      <Box>
        <WelcomeUser />
        <Button type="logout">Log out</Button>
      </Box>
    </div>
  );
}

export default Header;
