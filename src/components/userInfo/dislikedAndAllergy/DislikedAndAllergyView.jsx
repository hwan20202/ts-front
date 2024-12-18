import useUserPreference from "../../../hooks/useUserPreference";
import Section from "../Section";
import InputSection from "../InputSection";

const styles = {
  container: "flex flex-col min-w-[300px] p-1",
};

const DislikedAndAllergyView = () => {
  const { allergies } = useUserPreference();
  return (
    <div className={styles.container}>
      <Section title="알레르기" subtitle={allergies.join(" ")} onEdit={true}>
        <InputSection
          onSubmit={() => {
            console.log("submit");
          }}
          type="text"
          placeholder="알레르기 추가"
          defaultValue={allergies.join(" ")}
        />
      </Section>
    </div>
  );
};

export default DislikedAndAllergyView;
