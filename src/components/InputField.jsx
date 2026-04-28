const InputField = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="mb-4 text-left">
      {label && <label className="block text-white/80 text-sm mb-1 ml-2">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl bg-[#ABA7EB] placeholder-white/60 text-white outline-none focus:ring-2 focus:ring-white/50 transition-all"
        required
      />
    </div>
  );
};

export default InputField;