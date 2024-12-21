export class AiComment {
  constructor({
    main_changes_from_original_recipe,
    reason_for_changes,
    recipe_tips,
    unchanged_parts_and_reasons,
    user_meal_food_group_requirements,
  }) {
    this.main_changes_from_original_recipe = main_changes_from_original_recipe
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    this.reason_for_changes = reason_for_changes
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    this.recipe_tips = recipe_tips
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    this.unchanged_parts_and_reasons = unchanged_parts_and_reasons
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    this.user_meal_food_group_requirements = user_meal_food_group_requirements;
  }
}

export class AiResponse {
  constructor(recipe, aiComment) {
    this.recipe = recipe;
    this.aiComment = aiComment;
  }

  getRecipe() {
    return this.data.after.recipe_cooking_order;
  }
}
