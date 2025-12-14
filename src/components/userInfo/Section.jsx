import FoldableBoxProvider from "../../context/FoldableBoxProvider";
import FoldableSection from "../common/FoldableSection";
import { useState } from "react";
const styles = {
  categoryWrapper: "flex flex-col text-sm p-2 mb-2",
  titleWrapper: "flex justify-between",
  title: "text-gray-700 font-bold text-xl",
  editButton: "text-xs font-semibold text-gray-500",
  subtitle: "text-base font-semibold text-gray-500 mb-2",
};

const Section = ({ title, subtitle, children, onComplete }) => {
  const [onEdit, setOnEdit] = useState(false);

  const handleComplete = (e) => {
    e.preventDefault();
    onComplete(e);
    setOnEdit(false);
  };

  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        {!onEdit ? (
          <button className={styles.editButton} onClick={() => setOnEdit(true)}>
            수정
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleComplete}>
            완료
          </button>
        )}
      </div>
      <div className={styles.subtitle + " " + (onEdit ? "invisible" : "")}>
        {subtitle}
      </div>
      <FoldableBoxProvider>
        <FoldableSection isOpen={onEdit}>{children}</FoldableSection>
      </FoldableBoxProvider>
    </div>
  );
};

export default Section;
