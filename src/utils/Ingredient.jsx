import { SavingTypeEnum } from "./savingType.jsx";

export default class Ingredient {
  constructor({ id, name, expirationDate, savingType, group }) {
    this.id = id ? id : null;
    this.name = name; //required
    this.expirationDate =
      expirationDate || Ingredient.formatDateToYYYYMMDD(new Date());
    this.savingType = savingType || SavingTypeEnum.실온;
    this.group = group || "기타";
  }

  static formatDateToYYYYMMDD(date) {
    return date.toISOString().split("T")[0];
  }

  //return object {group: [ingredients]}
  static getIngredientsByGroups(ingredients) {
    const ingredientsByGroups = {};
    ingredients.forEach((ingredient) => {
      if (!ingredientsByGroups[ingredient.group]) {
        ingredientsByGroups[ingredient.group] = [];
      }
      ingredientsByGroups[ingredient.group].push(ingredient);
    });
    return ingredientsByGroups;
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
    const expirationDate = new Date(this.expirationDate); // 문자열을 Date 객체로 변환
    const diffTime = expirationDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static isExpiringSoon(ingredient, threshold = 3) {
    return ingredient.getDaysUntilExpiration() <= threshold;
  }
}
