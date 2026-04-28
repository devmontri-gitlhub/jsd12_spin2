const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-4 mt-6 bg-[#2D2A54] hover:bg-[#1E1C3A] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 active:scale-95"
    >
      {children}
    </button>
  );
};

export default Button;