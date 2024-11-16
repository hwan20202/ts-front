import { createContext, useContext, useState, useEffect } from "react";
import Ingredient from "../utils/Ingredient";
import { SavingTypeEnum } from "../utils/savingType";

const UserContext = createContext();

const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [dislikedIngredients, setDislikedIngredients] = useState([
    new Ingredient({ id: 1, name: "양파", group: "채소" }),
    new Ingredient({ id: 2, name: "마늘", group: "채소" }),
    new Ingredient({ id: 3, name: "버섯", group: "채소" }),
    new Ingredient({ id: 4, name: "오이", group: "채소" }),
    new Ingredient({ id: 5, name: "우유", group: "유제품" }),
    new Ingredient({ id: 6, name: "초코 우유", group: "유제품" }),
    new Ingredient({ id: 7, name: "바나나 우유", group: "유제품" }),
  ]);
  const [dislikedIngredientsByGroup, setDislikedIngredientsByGroup] = useState(
    {}
  );
  const [ingredients, setIngredients] = useState([
    new Ingredient({
      id: 1,
      name: "양파",
      group: "채소",
      expirationDate: "2024-11-24",
      savingType: SavingTypeEnum.실온,
    }),
    new Ingredient({
      id: 2,
      name: "마늘",
      group: "채소",
      expirationDate: "2024-11-13",
      savingType: SavingTypeEnum.실온,
    }),
    new Ingredient({
      id: 3,
      name: "버섯",
      group: "채소",
      expirationDate: "2024-11-13",
      savingType: SavingTypeEnum.실온,
    }),
    new Ingredient({
      id: 4,
      name: "오이",
      group: "채소",
      expirationDate: "2024-11-17",
      savingType: SavingTypeEnum.냉동,
    }),
    new Ingredient({
      id: 5,
      name: "우유",
      group: "유제품",
      savingType: SavingTypeEnum.냉장,
      expirationDate: "2024-11-17",
    }),
    new Ingredient({
      id: 6,
      name: "초코 우유",
      group: "유제품",
      savingType: SavingTypeEnum.냉장,
      expirationDate: "2024-11-17",
    }),
    new Ingredient({
      id: 7,
      name: "바나나 우유",
      group: "유제품",
      savingType: SavingTypeEnum.냉장,
      expirationDate: "2024-11-12",
    }),
  ]);
  const [ingredientsBySavingType, setIngredientsBySavingType] = useState({});
  const [expiringIngredients, setExpiringIngredients] = useState([]);

  useEffect(() => {
    setDislikedIngredientsByGroup(
      Ingredient.getIngredientsByGroups(dislikedIngredients)
    );
  }, [dislikedIngredients]);

  useEffect(() => {
    setIngredientsBySavingType(
      Ingredient.getIngredientsBySavingType(ingredients)
    );
    setExpiringIngredients(
      ingredients.filter(
        (ingredient) => ingredient.getDaysUntilExpiration() <= 3
      )
    );
  }, [ingredients]);

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  return (
    <UserContext.Provider
      value={{
        dislikedIngredients,
        setDislikedIngredients,
        dislikedIngredientsByGroup,
        ingredients,
        ingredientsBySavingType,
        expiringIngredients,
        addIngredient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { useUserContext };
