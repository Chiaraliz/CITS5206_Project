function FormRow({ label, error, children, type }) {
  return (
    <div className={`flex gap-2 ${type === "vertical" ? "flex-col" : ""}`}>
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
