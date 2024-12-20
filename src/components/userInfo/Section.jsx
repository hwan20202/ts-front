import { useToggle } from "../../hooks/useToggle";
import FoldableBoxProvider from "../../context/FoldableBoxProvider";
import FoldableSection from "../common/FoldableSection";
import TitleSection from "./TitleSection";

const styles = {
  categoryWrapper: "flex flex-col text-sm p-2 mb-2",
};

const Section = ({ title, subtitle, children }) => {
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

export default Section;
