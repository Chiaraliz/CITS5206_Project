function FormRow({ label, error, children, type }) {
  return (
    <div
      className={`flex flex-grow ${
        type === "vertical" ? "flex-col gap-2" : "gap-5"
      }`}
    >
      {label && (
        <label className="text-sm font-semibold" htmlFor={children.props.id}>
          {label}
        </label>
      )}
      {children}
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormRow;
