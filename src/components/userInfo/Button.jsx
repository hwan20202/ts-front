const Button = ({ toggle, isDisabled = false, onClick, children }) => {
  const styles = {
    button: "px-4 py-2 rounded-lg",
    disabled: "opacity-50",
    normal: "bg-gray-300",
    orange: "bg-orange-500 text-white",
  };

  return (
    <button
      className={`${styles.button} ${
        styles[toggle ? "orange" : "normal"]
      } text-white`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
