import React from "react";
import { getFakePreferencesTags } from "../../services/fetchUserInfo";
import useUserPreference from "../../hooks/useUserPreference";
import { useToggle } from "../../hooks/useToggle";
import { useEffect, useRef } from "react";
import useSelect from "../../hooks/useSelect";
import FoldableSection from "./FoldableSection";
import InputSection from "./InputSection";
import FoldableBoxProvider from "../../context/FoldableBoxProvider";
import TagBox from "./TagBox";

const styles = {
  // container: "flex flex-col w-full p-1",
  // categoryWrapper: "flex flex-col text-sm p-2 mb-2",
  // titleWrapper: "flex justify-between",
  // title: "text-gray-700 font-bold text-lg",
  // editButton: "text-xs font-semibold text-gray-500",
  // subtitle: "text-xs font-semibold text-gray-500 mb-2",
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
          className={styles.editButton}
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

const CategorySection = ({ title, subtitle, children }) => {
  const { isTrue, toggle } = useToggle(false);
  return (
    <div className={styles.categoryWrapper}>
      <TitleSection onButtonClick={toggle} subtitle={subtitle} onEdit={isTrue}>
        {title}
      </TitleSection>
      <FoldableBoxProvider>
        <FoldableSection isOpen={isTrue}>{children}</FoldableSection>
      </FoldableBoxProvider>
    </div>
  );
};

const Preference = () => {
  const { allergies } = useUserPreference();
  const { getCategory, getValues, getNameCategory } = getFakePreferencesTags();

  return (
    <div className={styles.container}>
      {/* <CategorySection
        title="싫어하는 재료"
        subtitle={dislikedIngredients.map((i) => i.foodName).join(" ")}
        onEdit={true}
      >
        <InputSection
          onSubmit={() => {
            console.log("submit");
          }}
          type="text"
          placeholder="재료 추가"
          defaultValue={dislikedIngredients.map((i) => i.foodName).join(" ")}
        />
      </CategorySection> */}

      {/* <CategorySection
        title="알레르기"
        subtitle={allergies.join(" ")}
        onEdit={true}
      >
        <InputSection
          onSubmit={() => {
            console.log("submit");
          }}
          type="text"
          placeholder="알레르기 추가"
          defaultValue={allergies.join(" ")}
        />
      </CategorySection> */}
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
