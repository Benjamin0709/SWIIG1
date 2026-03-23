// components/Button.jsx
const Button = ({ children }) => {
  return (
    <button className="bg-secondary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary hover:font-semibold transition">
      {children}
    </button>
  );
};

export default Button;