import { useRef, useState, useEffect } from "react";

export const useFoldableBox = (defaultOpen = false, defaultHeight = "0px") => {
  const boxRef = useRef(null);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.height = isOpen
        ? `${boxRef.current.scrollHeight}px`
        : defaultHeight;
    }
  }, [isOpen]);

  return { isOpen, toggle, boxRef, open, close };
};
