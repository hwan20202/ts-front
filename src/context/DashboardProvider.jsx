import React, { useContext, createContext, useState, useEffect } from "react";
import { fetchDashboard } from "../utils/fetchData";
import Ingredient from "../utils/Ingredient";
import {
  fetchIngredientRegister,
  fetchIngredientDelete,
} from "../utils/fetchIngredient";

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
      const rawIngredients = await fetchDashboard();
      const _ingredients = rawIngredients.map(
        (item) =>
          new Ingredient({
            id: item.id,
            name: item.foodName,
            expirationDate: item.expirationDate,
            savingType: item.savingType,
            group: item.group,
          })
      );
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

  const addIngredient = async (item) => {
    const result = await fetchIngredientRegister(item);
    if (result.success) {
      const newIngredient = new Ingredient({
        id: result.data.id,
        name: result.data.foodName,
        expirationDate: result.data.expirationDate,
        savingType: result.data.savingType,
        group: result.data.group,
      });
      setIngredients([...ingredients, newIngredient]);
    }
  };

  const deleteIngredient = async (id) => {
    const result = await fetchIngredientDelete(id);
    if (result.success) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  const updateIngredient = (id, newIngredient) => {
    setIngredients((prevIngredients) => [
      ...prevIngredients.filter((ingredient) => ingredient.id !== id),
      newIngredient,
    ]);
  };

  useEffect(() => {
    if (ingredients.length === 0) return;
    const _expiringSoon = [];
    const _roomTemperature = [];
    const _refrigerated = [];
    const _frozen = [];

    ingredients.forEach((ingredient) => {
      if (ingredient.isExpiringSoon()) {
        _expiringSoon.push(ingredient);
      } else {
        switch (ingredient.savingType) {
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

    setDashboardInfo({
      containers: {
        expiringSoon: { title: "유통기한 임박", foodGroups: _expiringSoon },
        roomTemperature: { title: "실온", foodGroups: _roomTemperature },
        refrigerated: { title: "냉장", foodGroups: _refrigerated },
        frozen: { title: "냉동", foodGroups: _frozen },
      },
    });
  }, [ingredients]);

  return (
    <DashboardContext.Provider
      value={{
        dashboardInfo,
        addIngredient,
        updateIngredient,
        deleteIngredient,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardProvider, DashboardContext, useDashboard };
