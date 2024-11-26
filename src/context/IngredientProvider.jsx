import { createContext, useContext, useEffect, useState } from "react";
import { getIngredientListByName } from "../services/fetchIngredient.jsx";
const IngredientContext = createContext();

const useIngredient = () => {
  return useContext(IngredientContext);
};

const IngredientProvider = ({ children }) => {
  const searchIngredient = async (keyword) => {
    const resultList = await getIngredientListByName(keyword);
    if (resultList) {
      return resultList;
    }
    return [];
  };

  return (
    <IngredientContext.Provider
      value={{
        searchIngredient,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
export { useIngredient };
