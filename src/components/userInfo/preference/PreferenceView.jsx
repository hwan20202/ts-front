import { getFakePreferencesTags } from "../../../services/fetchUserInfo";
import Section from "../Section";
import TagBox from "../TagBox";

const styles = {
  container: "flex flex-col min-w-[300px] p-1",
};

const PreferenceView = () => {
  const { getCategory, getValues, getNameCategory } = getFakePreferencesTags();

  return (
    <div className={styles.container}>
      {getCategory().map((category) => (
        <Section
          title={getNameCategory(category)}
          subtitle={getValues(category).join(" ")}
          key={category}
        >
          {getValues(category).length > 0 && (
            <>
              <TagBox tags={getValues(category)} selectedTags={[]} />
            </>
          )}
        </Section>
      ))}
    </div>
  );
};

export default PreferenceView;
