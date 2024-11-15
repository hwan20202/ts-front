export default class Recipe {
  // - main_changes_from_original_recipe : 기존 레시피에서 주요 변경점
  // - reason_for_changes : 기존 레시피에서 변경된 이유
  // - unchanged_parts_and_reasons : 기존 레시피에서 변경되지 않은 이유
  // - recipe_type : 레시피 타입
  // - recipe_menu_name : 레시피 이름
  // - recipe_ingredients : 레시피 재료
  // - recipe_difficulty : 레시피 난이도
  // - recipe_cooking_time : 레시피 조리 시간
  // - recipe_cooking_order : 레시피 만드는 방법
  // - recipe_tips : 조리팁

  constructor({
    id,
    type = "",
    name = "",
    description = "",
    profileImage = "",
    ingredients = [],
    cookingTime = "",
    cookingImgs = [],
    cookingOrders = [],
    // difficulty = "",
    // changes = "",
    // reasonForChanges = "",
    // unchanged_parts_and_reasons = "",
    // tips = "",
  }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.description = description;
    this.profileImage = profileImage;
    this.ingredients = ingredients;
    this.cookingTime = cookingTime;
    this.cookingImgs = cookingImgs;
    this.cookingOrders = cookingOrders;

    // this.difficulty = difficulty;
    // this.tips = tips;
    // this.changes = changes;
    // this.reasonForChanges = reasonForChanges;
    // this.unchangedPartsAndReasons = unchangedPartsAndReasons;
  }
}
