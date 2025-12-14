import { useState } from "react";

const ToggleButton = ({
  children,
  onSetTrue,
  onSetFalse,
  trueClassName,
  falseClassName,
  defaultToggle = false,
}) => {
  const [isToggle, setIsToggle] = useState(defaultToggle);

  const setTrue = () => {
    setIsToggle(true);
    onSetTrue();
  };

  const setFalse = () => {
    setIsToggle(false);
    onSetFalse();
  };

  const toggle = () => {
    if (isToggle) {
      setFalse();
    } else {
      setTrue();
    }
  };

  return (
    <button
      className={isToggle ? trueClassName : falseClassName}
      onClick={toggle}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
