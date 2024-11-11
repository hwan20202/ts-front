import React, { useState } from "react";
import MenuSearchForm from "../services/MenuSearchForm.jsx";
import Dashboard from "../services/Dashboard.jsx";
import { DashboardProvider } from "../context/DashboardProvider.jsx";
import IngredientSearch from "../services/IngredientSearch.jsx";

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
    </div>
  );
};

export default Home;
