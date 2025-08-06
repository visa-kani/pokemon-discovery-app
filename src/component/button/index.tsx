type ButtonProps = {
  children: React.ReactNode;
  btnClass?: string;
  onClick?: () => void;
  btnType?: "button" | "submit" | "reset" | undefined;
  btnSize?: string;
  btnMode?: string;
  btnStyle?: React.CSSProperties;
  btnDisabled?: boolean;
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    btnClass,
    onClick,
    btnType,
    btnSize,
    btnMode,
    btnStyle,
    btnDisabled,
  } = props;
  return (
    <button
      style={btnStyle}
      className={`${btnClass} 
      ${
        btnSize === "lg" ? "px-6 py-3" : "px-4 py-1.5"
      } 
      ${
        btnMode === "primary" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      } 
      rounded-full font-semibold transition-all duration-200`}
      onClick={onClick}
      type={btnType}
      disabled={btnDisabled}
    >
      {children}
    </button>
  );
};
