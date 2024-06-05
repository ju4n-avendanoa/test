const Button = ({ isActive, onClick, label }: any) => (
  <button
    className={`${
      isActive ? "scale-95 shadow-md shadow-sky-300 bg-sky-900" : "scale-100"
    } px-4 py-2 text-white border-2 rounded-md bg-sky-700 border-sky-500 w-[185px]`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;
