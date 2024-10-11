function Button({ children, type, onClick, disabled }) {
  let style = "";
  if (type === "login") {
    style =
      "bg-red-600 text-white font-semibold text-sm rounded-lg py-2 hover:opacity-70 ease-in duration-300";
  } else if (type === "logout") {
    style =
      "bg-red-600 text-white font-semibold text-sm rounded-lg px-6 py-2 hover:opacity-70 ease-in duration-300";
  } else if (type === "primary") {
    style =
      "bg-stone-100 text-stone-600 font-semibold text-sm rounded-lg px-6 py-2 hover:opacity-70 ease-in duration-300";
  }
  return (
    <button
      className={`${style}`}
      onClick={onClick ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
