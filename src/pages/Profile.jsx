import { useState } from "react";
import SubscriptionManagement from "../features/profile/SubscriptionManagement";
import UserInfoForm from "../features/profile/UserInfoForm";
import NavBar from "../features/profile/NavBar";

function Profile() {
  const [activeBar, setActionBar] = useState("personal");
  function handleClick(newActiveBar) {
    setActionBar(newActiveBar);
  }
  return (
    <>
      <NavBar handleClick={handleClick} activeBar={activeBar} />
      {activeBar === "personal" ? <UserInfoForm /> : ""}
      {activeBar === "subscription" ? <SubscriptionManagement /> : ""}
    </>
  );
}

export default Profile;
