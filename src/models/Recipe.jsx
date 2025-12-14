export default class Recipe {
  constructor({
    id,
    tag = "original",
    type = "",
    title = "",
    // description = "",
    hashtag = [],
    main_img = "",
    ingredients = [],
    cooking_time = "",
    cooking_img = [],
    cooking_order = [],
    method_key = "",
    recipe_type = [],
    difficulty = "",
    servings = "",
    tips = "",
    type_key,
    // changes = "",
    // reasonForChanges = "",
    // unchanged_parts_and_reasons = "",
  }) {
    this.id = id;
    this.tag = tag;
    this.type = type;
    this.title = title;
    // this.description = description;
    this.hashtag = hashtag;
    this.main_img = main_img;
    this.ingredients = ingredients;
    this.cooking_time = cooking_time;
    this.cooking_img = cooking_img || [];
    this.cooking_order = cooking_order || [];
    this.method_key = method_key;
    this.recipe_type = recipe_type;
    this.difficulty = difficulty;
    this.servings = servings;
    this.tips = tips;
    this.type_key = type_key;
    if (this.cooking_img.length < this.cooking_order.length) {
      this.cooking_img = this.cooking_order.map((index) =>
        this.cooking_img[index] ? this.cooking_img[index] : ""
      );
    }
  }
}
