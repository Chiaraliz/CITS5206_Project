function Button({ children, type }) {
  return (
    <button
      className={`${
        type === "login"
          ? "bg-red-600 text-white font-semibold text-sm rounded-lg py-2 mt-4 hover:opacity-70 ease-in duration-300"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
