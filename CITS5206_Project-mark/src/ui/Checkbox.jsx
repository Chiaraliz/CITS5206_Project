function Checkbox({ label, value, setValue }) {
  return (
    <div>
      <label className="text-sm">
        <input
          type="checkbox"
          checked={value}
          className="border-2 outline-none mr-2"
          onChange={(e) => setValue(e.target.checked)}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
