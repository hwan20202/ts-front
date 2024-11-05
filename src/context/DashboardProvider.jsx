import React, { useContext, createContext, useState, useEffect } from "react";
import { fetchDashboard } from "../utils/fetchData";

const DashboardContext = createContext();

const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }

  return context;
};

const DashboardProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const _ingredients = await fetchDashboard();
      setIngredients(_ingredients);
    };

    getIngredients();
  }, []);

  const [dashboardInfo, setDashboardInfo] = useState({
    containers: {
      expiringSoon: { title: "유통기한 임박", foodGroups: [] },
      roomTemperature: { title: "실온", foodGroups: [] },
      refrigerated: { title: "냉장", foodGroups: [] },
      frozen: { title: "냉동", foodGroups: [] },
    },
  });

  const addIngredient = (item) => {
    setIngredients([...ingredients, item]);
  };

  useEffect(() => {
    const today = new Date();
    const _expiringSoon = [];
    const _roomTemperature = [];
    const _refrigerated = [];
    const _frozen = [];

    ingredients.forEach((ingredient) => {
      const expirationDate = new Date(ingredient.expirationDate);
      const daysLeft = (expirationDate - today) / (1000 * 60 * 60 * 24);

      if (daysLeft <= 3) {
        _expiringSoon.push(ingredient);
      } else {
        switch (ingredient.storageMethod) {
          case "실온":
            _roomTemperature.push(ingredient);
            break;
          case "냉장":
            _refrigerated.push(ingredient);
            break;
          case "냉동":
            _frozen.push(ingredient);
            break;
          default:
            break;
        }
      }
    });

    if (ingredients.length > 0) {
      setDashboardInfo({
        containers: {
          expiringSoon: { title: "유통기한 임박", foodGroups: _expiringSoon },
          roomTemperature: { title: "실온", foodGroups: _roomTemperature },
          refrigerated: { title: "냉장", foodGroups: _refrigerated },
          frozen: { title: "냉동", foodGroups: _frozen },
        },
      });
    }
  }, [ingredients]);

  return (
    <DashboardContext.Provider value={{ dashboardInfo, addIngredient }}>
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider, DashboardContext, useDashboard };
