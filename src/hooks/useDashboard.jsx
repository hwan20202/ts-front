import Ingredient from "../models/Ingredient";

const useDashboard = () => {
  const categories = {
    EXPIRED: {
      name: "만료",
      saving_type: "EXPIRED",
      filter: function (_ingredients) {
        return _ingredients.filter((_ingredient) => _ingredient.is_expired);
      },
    },
    EXPIRING_SOON: {
      name: "유통기한 임박",
      saving_type: "EXPIRING_SOON",
      filter: function (_ingredients) {
        return _ingredients.filter((_ingredient) =>
          Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    REFRIGERATED: {
      name: "냉장",
      saving_type: "REFRIGERATED",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.saving_type === "REFRIGERATED" &&
            !_ingredient.is_expired &&
            !Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    FROZEN: {
      name: "냉동",
      saving_type: "FROZEN",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.saving_type === "FROZEN" &&
            !_ingredient.is_expired &&
            !Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    ROOM_TEMPERATURE: {
      name: "실온",
      saving_type: "ROOM_TEMPERATURE",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.saving_type === "ROOM_TEMPERATURE" &&
            !_ingredient.is_expired &&
            !Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
  };

  return {
    categories,
  };
};

export default useDashboard;
