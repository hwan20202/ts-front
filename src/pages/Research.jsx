import { useState, useRef } from "react";
import { getFakePreferencesTags } from "../services/fetchUserInfo";
import { useUserContext } from "../context/UserProvider";
const styles = {
  section: {
    container:
      "flex flex-col w-full h-[80vh] justify-center text-black bg-white",
    title: "text-2xl font-bold m-0 p-0",
  },
  buttonBox:
    "flex flex-row bg-gray-200 flex-wrap py-6 px-10 rounded-md justify-center",
  button: {
    default:
      "flex flex-row rounded-full px-6 py-3 m-2 whitespace-nowrap text-sm leading-[0] p-0",
    unselected: "bg-white",
    selected: "bg-blue-500 text-white",
  },
  nextButton: "text-green-300 m-0 h-full p-0 font-bold text-2xl",
  submitButton:
    "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
};

const Section = ({
  title,
  children,
  sectionRef,
  onPrev,
  onNext,
  isFirst,
  isLast,
}) => {
  return (
    <div ref={sectionRef} className={styles.section.container}>
      {isFirst ? (
        <div className="flex flex-row h-full justify-center items-center">
          <h1>기본 정보 입력</h1>
        </div>
      ) : (
        <button className={styles.nextButton} onClick={onPrev}>
          <i class="fa-solid fa-chevron-up"></i>
        </button>
      )}
      <h2 className={styles.section.title}>{title}</h2>
      {children}
      {isLast ? (
        <div className="flex flex-col justify-center h-full">
          <button className={styles.submitButton} onClick={onNext}>
            결과 확인
          </button>
        </div>
      ) : (
        <button className={styles.nextButton} onClick={onNext}>
          <i class="fa-solid fa-chevron-down"></i>
        </button>
      )}
    </div>
  );
};

const Research = () => {
  const { getCategory, getValues, getNameCategory } = getFakePreferencesTags();
  const categories = getCategory();
  const sectionRefs = useRef([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { postUserPreferences } = useUserContext();
  const submitTags = () => {
    postUserPreferences(selectedTags);
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  const handleTagRemove = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const toggleTag = (tag) => {
    selectedTags.includes(tag) ? handleTagRemove(tag) : handleTagClick(tag);
  };

  const scrollToNextSection = (currentIndex) => {
    const nextIndex = currentIndex + 1;
    if (sectionRefs.current[nextIndex]) {
      sectionRefs.current[nextIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPrevSection = (currentIndex) => {
    const prevIndex = currentIndex - 1;
    if (sectionRefs.current[prevIndex]) {
      sectionRefs.current[prevIndex].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {categories.map((category, index) => (
        <Section
          index={index}
          key={category}
          title={getNameCategory(category)}
          sectionRef={(el) => (sectionRefs.current[index] = el)}
          onPrev={index > 0 ? () => scrollToPrevSection(index) : undefined}
          onNext={
            index < categories.length - 1
              ? () => scrollToNextSection(index)
              : submitTags
          }
          isFirst={index === 0}
          isLast={index === categories.length - 1}
        >
          <div className="flex flex-col">
            <div className="flex flex-row">
              {Array.from({ length: categories.length }).map((_, i) => (
                <i
                  key={i}
                  class={`fa-solid fa-circle-dot ${
                    i === index ? "text-green-300" : "text-gray-300"
                  }`}
                ></i>
              ))}
            </div>
            <div className={styles.buttonBox}>
              {getValues(category).map((tag) => (
                <button
                  key={tag}
                  className={`${styles.button.default} ${
                    selectedTags.includes(tag)
                      ? styles.button.selected
                      : styles.button.unselected
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Section>
      ))}
      <span className="text-green-500">{selectedTags.join(", ")}</span>
    </>
  );
};

export default Research;
