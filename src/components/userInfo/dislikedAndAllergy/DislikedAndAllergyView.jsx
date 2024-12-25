import Section from "../Section";
import InputSection from "../InputSection";
import { useUserContext } from "../../../context/UserProvider";

const styles = {
  container: "flex flex-col min-w-[300px] p-1",
};

const DislikedAndAllergyView = () => {
  const { allergyController } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.allergies.value === "") {
      return;
    }
    const newAllergies = e.target.allergies.value.replace(/,/g, " ").split(" ");
    if (newAllergies) {
      console.log(newAllergies);
      allergyController.set(newAllergies);
      allergyController.complete(newAllergies);
    }
  };

  return (
    <div className={styles.container}>
      <Section
        title="알레르기"
        subtitle={allergyController.allergies.join(" ")}
        onEdit={true}
        onComplete={() => {}}
      >
        <InputSection
          onSubmit={handleSubmit}
          type="text"
          name="allergies"
          placeholder="알레르기 추가"
          defaultValue={allergyController.allergies.join(" ")}
        />
      </Section>
    </div>
  );
};

export default DislikedAndAllergyView;
