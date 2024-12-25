import FoldableBoxProvider from "../../context/FoldableBoxProvider";
import FoldableSection from "../common/FoldableSection";
import { useState } from "react";
const styles = {
  categoryWrapper: "flex flex-col text-sm p-2 mb-2",
  titleWrapper: "flex justify-between",
  title: "text-gray-700 font-bold text-lg",
  editButton: "text-xs font-semibold text-gray-500",
  subtitle: "text-xs font-semibold text-gray-500 mb-2",
};

const Section = ({ title, subtitle, children }) => {
  const [onEdit, setOnEdit] = useState(false);
  return (
    <div className={styles.categoryWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{title}</div>
        {!onEdit ? (
          <button className={styles.editButton} onClick={() => setOnEdit(true)}>
            수정
          </button>
        ) : (
          <button
            className={styles.editButton}
            onClick={() => {
              setOnEdit(false);
            }}
          >
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
