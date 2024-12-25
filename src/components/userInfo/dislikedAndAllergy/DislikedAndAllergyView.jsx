import Section from "../Section";
import InputSection from "../InputSection";
import { useUserContext } from "../../../context/UserProvider";

const styles = {
  container: "flex flex-col min-w-[300px] p-1",
};

const DislikedAndAllergyView = () => {
  const { allergyController } = useUserContext();

  return (
    <div className={styles.container}>
      <Section
        title="알레르기"
        subtitle={allergyController.allergies.join(" ")}
        onEdit={true}
      >
        <InputSection
          onSubmit={() => {
            console.log("submit");
          }}
          type="text"
          placeholder="알레르기 추가"
          defaultValue={allergyController.allergies.join(" ")}
        />
      </Section>
    </div>
  );
};

export default DislikedAndAllergyView;
