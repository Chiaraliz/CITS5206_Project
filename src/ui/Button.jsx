function Button({ children, type }) {
  let style = "";
  if (type === "login") {
    style =
      "bg-red-600 text-white font-semibold text-sm rounded-lg py-2 hover:opacity-70 ease-in duration-300";
  } else if (type === "logout") {
    style =
      "bg-red-600 text-white font-semibold text-sm rounded-lg px-6 py-2 hover:opacity-70 ease-in duration-300";
  }
  return <button className={`${style}`}>{children}</button>;
}

export default Button;
