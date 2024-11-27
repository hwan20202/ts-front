import React from "react";
import { getFakePreferencesTags } from "../services/fetchUserInfo";
import useUserPreference from "../hooks/useUserPreference";
import { useToggle } from "../hooks/useToggle";
import { useFoldableBox } from "../hooks/useFoldableBox";
import { useEffect, useRef } from "react";
import useSelect from "../hooks/useSelect";

const styles = {
  container: "flex flex-col w-full p-1",
  categoryWrapper: "flex flex-col text-sm p-2 mb-2",

  titleWrapper: "flex justify-between",
  title: "text-gray-700 font-bold text-lg",
  editButton: "text-xs font-semibold text-gray-500",
  subtitle: "text-xs font-semibold text-gray-500 mb-2",

  foldableBox: "overflow-hidden transition-all duration-300",

  tagBox: "flex flex-wrap gap-1",
  tag: "flex items-center justify-center rounded-sm leading-[1.5] px-1 mr-1 text-xs text-gray-600",
  form: "w-full p-2 bg-gray-100 rounded-sm",
  input: "w-full bg-gray-100 outline-none",
  focusInput: "focus:border-b-[0.5px] focus:border-b-green-500",
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

const TitleSection = ({
  children,
  onButtonClick,
  subtitle,
  onEdit = false,
}) => {
  return (
    <>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>{children}</div>
        <button
          className={styles.button}
          onClick={() => {
            onButtonClick();
          }}
        >
          {!onEdit ? "수정" : "완료"}
        </button>
      </div>
      <div className={styles.subtitle + " " + (onEdit ? "invisible" : "")}>
        {subtitle}
      </div>
    </>
  );
};

const DescriptionSection = ({ children, isOpen }) => {
  return (
    <div className={styles.description}>
      <FoldableSection isOpen={isOpen}>{children}</FoldableSection>
    </div>
  );
};

const CategorySection = ({ title, subtitle, children }) => {
  const { isTrue, toggle } = useToggle(false);
  return (
    <div className={styles.categoryWrapper}>
      <TitleSection onButtonClick={toggle} subtitle={subtitle} onEdit={isTrue}>
        {title}
      </TitleSection>
      <DescriptionSection isOpen={isTrue}>{children}</DescriptionSection>
    </div>
  );
};

const CategoryInputSection = ({ title, subtitle, onSubmit, children }) => {
  const { isTrue, toggle } = useToggle(false);
  const focusRef = useRef(null);

  useEffect(() => {
    if (isTrue) {
      focusRef.current.focus();
    }
  }, [isTrue]);

  return (
    <div className={styles.categoryWrapper}>
      <TitleSection onButtonClick={toggle} subtitle={subtitle} onEdit={isTrue}>
        {title}
      </TitleSection>
      <DescriptionSection isOpen={isTrue}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className={styles.form}
        >
          {React.cloneElement(children, { ref: focusRef })}
        </form>
      </DescriptionSection>
    </div>
  );
};

const TagBox = ({ tags, selectedTags }) => {
  const { selections, toggle } = useSelect({
    selectionList: tags,
    initialSelected: selectedTags,
  });

  return (
    <div className={styles.tagBox}>
      {selections.map((tag) => (
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
      ))}
    </div>
  );
};

const Preference = () => {
  const { preferredTags, dislikedIngredients, allergies } = useUserPreference();
  const { getCategory, getValues, getNameCategory } = getFakePreferencesTags();

  return (
    <div className={styles.container}>
      <CategoryInputSection
        title="싫어하는 재료"
        subtitle={dislikedIngredients.map((i) => i.foodName).join(" ")}
        onEdit={true}
      >
        <input
          type="text"
          placeholder="재료 추가"
          defaultValue={dislikedIngredients.map((i) => i.foodName).join(" ")}
          className={`${styles.input} ${styles.focusInput}`}
        />
      </CategoryInputSection>

      <CategoryInputSection
        title="알레르기"
        subtitle={allergies.join(" ")}
        onEdit={true}
      >
        <input
          type="text"
          placeholder="알레르기 추가"
          defaultValue={allergies.join(" ")}
          className={`${styles.input} ${styles.focusInput}`}
        />
      </CategoryInputSection>
      {getCategory().map((category) => (
        <CategorySection
          title={getNameCategory(category)}
          subtitle={getValues(category).join(" ")}
          key={category}
        >
          {getValues(category).length > 0 && (
            <div className={styles.tagBox}>
              <TagBox tags={getValues(category)} selectedTags={[]} />
            </div>
          )}
        </CategorySection>
      ))}
    </div>
  );
};

export default Preference;
