import React, { useState } from "react";
import MenuSearchForm from "../services/MenuSearchForm.jsx";
import Modal from "../components/Modal.jsx";
import Button from "../components/Button.jsx";
import Dropdown from "../components/Dropdown.jsx";
import IngredientRegisterModal from "../services/IngredientRegisterModal.jsx";
import Dashboard from "../services/Dashboard.jsx";
import { DashboardProvider } from "../context/DashboardProvider.jsx";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="Home-page w-full">
      <MenuSearchForm />
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
      <Button label="modal" onClick={openModal} />
      {isOpen && <IngredientRegisterModal onClose={closeModal} />}
    </div>
  );
};

export default Home;
