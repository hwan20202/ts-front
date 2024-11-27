import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";

const SavingTypeEnum = createSavingTypeEnum();

export default class Ingredient {
  constructor({ id, foodName, expirationDate, savingType, foodType }) {
    this.id = id ? id : null;
    this.foodName = foodName; //required
    this.expirationDate =
      expirationDate || Ingredient.formatDateToYYYYMMDD(new Date());
    this.savingType = savingType || SavingTypeEnum.defaultKey();
    this.foodType = foodType || "기타";
  }

  static formatDateToYYYYMMDD(date) {
    return date.toISOString().split("T")[0];
  }

  //return object {group: [ingredients]}
  static getIngredientsByFoodType(ingredients) {
    const ingredientsByFoodType = {};
    ingredients.forEach((ingredient) => {
      if (!ingredientsByFoodType[ingredient.foodType]) {
        ingredientsByFoodType[ingredient.foodType] = [];
      }
      ingredientsByFoodType[ingredient.foodType].push(ingredient);
    });
    return ingredientsByFoodType;
  }

  static getIngredientsBySavingType(ingredients) {
    const ingredientsBySavingType = {};
    ingredients.forEach((ingredient) => {
      if (!ingredientsBySavingType[ingredient.savingType]) {
        ingredientsBySavingType[ingredient.savingType] = [];
      }
      ingredientsBySavingType[ingredient.savingType].push(ingredient);
    });
    return ingredientsBySavingType;
  }

  getDaysUntilExpiration() {
    const today = new Date();
    const expirationDateObj = new Date(this.expirationDate); // 문자열을 Date 객체로 변환
    const diffTime = expirationDateObj.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static isExpiringSoon(ingredient, threshold = 3) {
    return ingredient.getDaysUntilExpiration() <= threshold;
  }
}
