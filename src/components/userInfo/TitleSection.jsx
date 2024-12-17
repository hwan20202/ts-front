const styles = {
  titleWrapper: "flex justify-between",
  title: "text-gray-700 font-bold text-lg",
  editButton: "text-xs font-semibold text-gray-500",
  subtitle: "text-xs font-semibold text-gray-500 mb-2",
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

export default TitleSection;
