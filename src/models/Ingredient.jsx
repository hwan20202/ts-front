import { createSavingTypeEnum } from "../utils/createSavingTypeEnum";

const SavingTypeEnum = createSavingTypeEnum();

export default class Ingredient {
  constructor({ id, food_name, expiration_date, saving_type, food_type }) {
    this.id = id ? id : null;
    this.food_name = food_name; //required
    this.expiration_date =
      expiration_date || Ingredient.formatDateToYYYYMMDD(new Date());
    this.is_expired = this.getDaysUntilExpiration() <= 0;
    this.saving_type = saving_type || SavingTypeEnum.defaultKey();
    this.food_type = food_type || "기타";
  }

  static formatDateToYYYYMMDD(date) {
    return date.toISOString().split("T")[0];
  }

  getDaysUntilExpiration() {
    const today = new Date();
    const expiration_date_obj = new Date(this.expiration_date); // 문자열을 Date 객체로 변환
    const diff_time = expiration_date_obj.getTime() - today.getTime();
    return Math.ceil(diff_time / (1000 * 60 * 60 * 24));
  }

  static isExpiringSoon(ingredient, threshold = 3) {
    return (
      ingredient.getDaysUntilExpiration() <= threshold && !ingredient.is_expired
    );
  }
}
