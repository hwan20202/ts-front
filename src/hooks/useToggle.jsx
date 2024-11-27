import { useState } from "react";

export const useToggle = () => {
  const [isTrue, setIsTrue] = useState(false);

  const toggle = () => {
    setIsTrue(!isTrue);
  };

  return { isTrue, toggle };
};
