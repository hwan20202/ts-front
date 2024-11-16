import { createContext, useContext, useState } from "react";

const IngredientContext = createContext();

const useIngredient = () => {
  return useContext(IngredientContext);
};

const IngredientProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        setIngredients,
        selectedIngredients,
        setSelectedIngredients,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientProvider;
export { useIngredient };
