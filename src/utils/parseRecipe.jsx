import Recipe from "../services/Recipe.jsx";

const parseRecipe = () => {
  const mockRecipe = new Recipe({
    id: 1,
    type: "요리",
    name: "김치볶음밥",
    description:
      "김치볶음밥은 잘 익은 김치를 기본 재료로 하여 밥과 함께 볶아낸 한국의 대표적인 가정식 요리입니다. 김치의 매콤하고 새콤한 맛이 밥과 어우러져 독특한 풍미를 자아내며, 손쉽고 빠르게 만들 수 있어 바쁜 일상 속 한 끼 식사로 사랑받고 있습니다. 계란 프라이, 참기름, 파 등을 추가하면 풍미를 더할 수 있고, 기호에 따라 햄, 베이컨, 소시지 등을 넣어 다채롭게 즐길 수 있습니다.",
    profileImage:
      "https://recipe1.ezmember.co.kr/cache/recipe/2019/03/14/4c1d1794eb908c1bfec012999d7b43cc1.jpg",
    ingredients: [
      { id: 1, name: "김치", quantity: "1 cup" },
      { id: 2, name: "밥", quantity: "2 cups" },
      { id: 3, name: "대파", quantity: "1 stalk" },
      { id: 4, name: "간장", quantity: "1 tbsp" },
      { id: 5, name: "참기름", quantity: "1 tsp" },
      { id: 6, name: "계란", quantity: "1" },
    ],
    cookingTime: "15 minutes",
    cookingImgs: [
      "https://example.com/step1.jpg",
      "https://example.com/step2.jpg",
      "https://example.com/step3.jpg",
    ],
    cookingOrders: [
      "팬에 참기름을 두르고 대파를 볶아 향을 내준다.",
      "김치를 넣고 2-3분간 볶는다.",
      "밥을 넣고 김치와 잘 섞이도록 볶는다.",
      "간장을 넣고 고루 섞어준다.",
      "계란을 프라이하여 밥 위에 올린다.",
    ],
  });

  return mockRecipe;
};

export default parseRecipe;
