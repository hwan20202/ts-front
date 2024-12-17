import { useFoldableBox } from "../../context/FoldableBoxProvider";
import { useEffect } from "react";

const styles = {
  foldableBox: "overflow-hidden transition-all duration-300",
};

const FoldableSection = ({ isOpen, children }) => {
  const { boxRef, open, close } = useFoldableBox(false, "0px");

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }
  }, [isOpen]);

  return (
    <div ref={boxRef} className={styles.foldableBox}>
      {children}
    </div>
  );
};

export default FoldableSection;
