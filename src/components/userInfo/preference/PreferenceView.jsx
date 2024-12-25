import { getPreferencesTagsAll } from "../../../services/fetchUserInfo";
import ToggleButton from "../../common/ToggleButton";
import { PreferenceService } from "../../../services/PreferenceService";
import { useUserContext } from "../../../context/UserProvider";

const styles = {
  container: "flex flex-col gap-3 min-w-[300px]",
  section: "flex flex-col p-1",
  title: "text-lg font-semibold leading-none mb-5",
  button: {
    common: "text-base font-semibold leading-none py-2 px-4 rounded-md",
    default: "bg-gray-200 text-gray-800",
    selected: "bg-orange-500 text-white",
    hover: "hover:bg-orange-400 hover:text-white",
  },
  buttonBox: "flex flex-wrap gap-2",
};

const PreferenceView = () => {
  const { getCategory, getValues, getNameCategory, getEntriesByKey } =
    getPreferencesTagsAll();
  const { preferenceController } = useUserContext();

  if (!preferenceController.userPreferences) return null;

  const prefersWithType = preferenceController.userPreferences.map((prefer) =>
    getEntriesByKey(prefer)
  );

  // const userPreferenceTags = prefersWithType.reduce((acc, prefer) => {
  //   const [key, value] = prefer;
  //   acc[value] = [...(acc[value] || []), key];
  //   return acc;
  // }, {});

  return (
    <div className={styles.container}>
      {getCategory().map((category, index) => (
        <div key={index} className={styles.section}>
          <div className={styles.title}>{getNameCategory(category)}</div>
          <div className={styles.buttonBox}>
            {getValues(category)?.map((tag, index) => (
              <ToggleButton
                key={index}
                defaultToggle={preferenceController.userPreferences.includes(
                  tag
                )}
                onSetTrue={() => {
                  // PreferenceService.postUserPreferences(tag);
                  preferenceController.addUserPreferences(tag);
                }}
                onSetFalse={() => {
                  // PreferenceService.deleteUserPreferences(tag);
                  preferenceController.removeUserPreferences(tag);
                }}
                trueClassName={`${styles.button.common} ${styles.button.selected} ${styles.button.hover}`}
                falseClassName={`${styles.button.common} ${styles.button.default} ${styles.button.hover}`}
              >
                {tag}
              </ToggleButton>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreferenceView;
