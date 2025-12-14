import { Children } from "react";
import useSelect from "../../hooks/useSelect";

const styles = {
  tagBox: "flex flex-wrap gap-1",
  tag: "flex items-center justify-center rounded-sm leading-[1.5] px-1 mr-1 text-xs text-gray-600",
};

const TagBox = ({ children }) => {
  return (
    <div className={styles.tagBox}>
      {/* {selections.map((tag) => (
        <div
          key={tag.id}
          className={
            styles.tag + " " + (tag.isSelected ? "bg-green-200" : "bg-gray-100")
          }
          onClick={() => {
            toggle(tag);
          }}
        >
          {tag.value}
        </div>
      ))} */}
      {children}
    </div>
  );
};

export default TagBox;
