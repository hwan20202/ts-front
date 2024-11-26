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
    title = "",
    // description = "",
    hashtag = [],
    mainImg = "",
    ingredients = [],
    cookingTime = "",
    cookingImg = [],
    cookingOrder = [],
    methodKey = "",
    recipeType = [],
    difficulty = "",
    servings = "",
    tips = "",
    typeKey,
    // changes = "",
    // reasonForChanges = "",
    // unchanged_parts_and_reasons = "",
  }) {
    this.id = id;
    this.type = type;
    this.title = title;
    // this.description = description;
    this.hashtag = hashtag;
    this.mainImg = mainImg;
    this.ingredients = ingredients;
    this.cookingTime = cookingTime;
    this.cookingImg = cookingImg;
    this.cookingOrder = cookingOrder;
    this.methodKey = methodKey;
    this.recipeType = recipeType;
    this.difficulty = difficulty;
    this.servings = servings;
    this.tips = tips;
    this.typeKey = typeKey;
    // this.changes = changes;
    // this.reasonForChanges = reasonForChanges;
    // this.unchangedPartsAndReasons = unchangedPartsAndReasons;
  }
}
