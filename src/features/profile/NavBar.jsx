function NavBar({ handleClick, activeBar }) {
  return (
    <div className="mt-[5rem] inline-flex border rounded-2xl shadow-sm font-medium text-sm mb-10">
      <button
        className={`px-5 py-2 border-r hover:bg-stone-50 rounded-l-2xl ${
          activeBar === "personal" ? "bg-stone-50" : ""
        }`}
        onClick={() => handleClick("personal")}
      >
        Personal Information
      </button>
      <button
        className={`px-5 py-2 border-r hover:bg-stone-50 rounded-r-2xl ${
          activeBar === "subscription" ? "bg-stone-50" : ""
        }`}
        onClick={() => handleClick("subscription")}
      >
        Subscription Management
      </button>
    </div>
  );
}

export default NavBar;
