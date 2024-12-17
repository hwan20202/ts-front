import { useRef, useState, useEffect, createContext, useContext } from "react";

const FoldableBoxContext = createContext();

const FoldableBoxProvider = ({ children }) => {
  const boxRef = useRef(null);
  const focusRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.height = isOpen
        ? `${boxRef.current.scrollHeight}px`
        : "0px";
    }
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [isOpen]);

  return (
    <FoldableBoxContext.Provider
      value={{ isOpen, toggle, boxRef, open, close, focusRef }}
    >
      {children}
    </FoldableBoxContext.Provider>
  );
};

export const useFoldableBox = () => {
  return useContext(FoldableBoxContext);
};

export default FoldableBoxProvider;
export { FoldableBoxContext };
