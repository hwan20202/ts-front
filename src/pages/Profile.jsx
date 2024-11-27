import Gallary from "../components/common/Gallary.jsx";
import GallaryCard from "../components/common/GallaryCard.jsx";
import DislikedIngredientsView from "../components/ingredient/DislikedIngredientsView.jsx";
import { useEffect, useState } from "react";
import IngredientRegisterModal from "../components/ingredient/IngredientRegisterModal.jsx";
import { SelectedIngredientsList } from "../components/ingredient/DislikedIngredientsView.jsx";
import { useUserContext } from "../context/UserProvider.jsx";
import RecipeGallary from "../components/RecipeGallary.jsx";
import Modal from "../components/common/Modal.jsx";
import useModal from "../hooks/useModal.jsx";
import Research from "./Research.jsx";
import Preference from "../components/Preference.jsx";

const styles = {
  container: "flex flex-col justify-center items-center h-screen",
  wrapperContainer: "container mx-auto px-2 py-4 bg-white mb-4",
  headerBase: "flex justify-between items-center my-4",
  headerTitle: "text-md font-bold text-black",
  headerButton:
    "text-sm font-bold text-green-300 border border-green-300 px-3 py-1 rounded-md hover:bg-green-300 hover:text-white",
};

const Section = ({ title, children, buttonLabel, onButtonClick }) => (
  <div className={styles.wrapperContainer}>
    <div className={styles.headerBase}>
      <span className={styles.headerTitle}>{title}</span>
      {buttonLabel && (
        <button className={styles.headerButton} onClick={onButtonClick}>
          {buttonLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

const Profile = () => {
  const { myRecipes, bookmarkedRecipes, eatenRecipes } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: preferModalIsOpen,
    openModal: openPreferModal,
    closeModal: closePreferModal,
  } = useModal();

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(bookmarkedRecipes);
  }, [bookmarkedRecipes]);

  if (!bookmarkedRecipes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Section title="사용자 프로필">
        <div className="flex flex-col items-center text-black leading-none">
          <span>이름</span>
          <span>닉네임</span>
          <Preference />
          <button className={styles.headerButton} onClick={openPreferModal}>
            프로필 수정
          </button>
          {preferModalIsOpen && (
            <Modal onClose={closePreferModal} className="z-50">
              <Research />
            </Modal>
          )}
        </div>
      </Section>

      <Section title="내 레시피">
        <RecipeGallary recipes={myRecipes} loadRecipes={() => {}} />
      </Section>

      <Section title="먹었어요">
        <RecipeGallary recipes={eatenRecipes} loadRecipes={() => {}} />
      </Section>

      <Section title="먹고 싶어요">
        <RecipeGallary recipes={bookmarkedRecipes} loadRecipes={() => {}} />
      </Section>

      {/* <Section
        title="싫어하는 재료"
        buttonLabel="재료 등록"
        onButtonClick={openModal}
      >
        {/* <DislikedIngredientsView /> */}
      {/* {isOpen && ( 
          <IngredientRegisterModal onClose={closeModal} className="z-50">
            <SelectedIngredientsList />
          </IngredientRegisterModal>
        )}
      </Section> */}
    </div>
  );
};

export default Profile;
