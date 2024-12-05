import Ingredient from "../models/Ingredient";

const useDashboard = () => {
  const categories = {
    EXPIRED: {
      name: "만료",
      savingType: "EXPIRED",
      filter: function (_ingredients) {
        return _ingredients.filter((_ingredient) => _ingredient.isExpired);
      },
    },
    EXPIRING_SOON: {
      name: "유통기한 임박",
      savingType: "EXPIRING_SOON",
      filter: function (_ingredients) {
        return _ingredients.filter((_ingredient) =>
          Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    REFRIGERATED: {
      name: "냉장",
      savingType: "REFRIGERATED",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.savingType === "REFRIGERATED" &&
            !_ingredient.isExpired &&
            !Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    FROZEN: {
      name: "냉동",
      savingType: "FROZEN",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.savingType === "FROZEN" &&
            !_ingredient.isExpired &&
            !Ingredient.isExpiringSoon(_ingredient)
        );
      },
    },
    ROOM_TEMPERATURE: {
      name: "실온",
      savingType: "ROOM_TEMPERATURE",
      filter: function (_ingredients) {
        return _ingredients.filter(
          (_ingredient) =>
            _ingredient.savingType === "ROOM_TEMPERATURE" &&
            !_ingredient.isExpired &&
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
