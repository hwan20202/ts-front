export class AiComment {
  constructor({
    main_changes_from_original_recipe,
    reason_for_changes,
    recipe_tips,
    unchanged_parts_and_reasons,
    user_meal_food_group_requirements,
  }) {
    this.main_changes_from_original_recipe = main_changes_from_original_recipe;
    this.reason_for_changes = reason_for_changes;
    this.recipe_tips = recipe_tips;
    this.unchanged_parts_and_reasons = unchanged_parts_and_reasons;
    this.user_meal_food_group_requirements = user_meal_food_group_requirements;
  }
}

export class AiResponse {
  constructor(recipeId, aiComment) {
    this.recipeId = recipeId;
    this.aiComment = aiComment;
  }

  getRecipeId() {
    return this.recipeId;
  }
}
