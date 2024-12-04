import { getIngredientListByName } from "../services/fetchIngredient.jsx";
import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";
import Ingredient from "../models/Ingredient";
const useIngredient = () => {
  const searchIngredient = async (keyword) => {
    const resultList = await getIngredientListByName(keyword);
    if (resultList) {
      return resultList;
    }
    return [];
  };

  const divideByFoodType = (ingredients) => {
    const dividedIngredients = {};
    ingredients.forEach((ingredient) => {
      if (!dividedIngredients[ingredient.foodType]) {
        dividedIngredients[ingredient.foodType] = [];
      }
      dividedIngredients[ingredient.foodType].push(ingredient);
    });
    return dividedIngredients;
  };

  const divideBySavingType = (ingredients) => {
    const dividedIngredients = {
      EXPIRING_SOON: [],
      ...createSavingTypeEnum()
        .keys()
        .reduce((acc, key) => {
          acc[key] = [];
          return acc;
        }, {}),
    };
    ingredients.forEach((ingredient) => {
      if (Ingredient.isExpiringSoon(ingredient)) {
        dividedIngredients.EXPIRING_SOON.push(ingredient);
      } else {
        dividedIngredients[ingredient.savingType].push(ingredient);
      }
    });
    return dividedIngredients;
  };

  return {
    searchIngredient,
    divideByFoodType,
    divideBySavingType,
  };
};

export { useIngredient };
