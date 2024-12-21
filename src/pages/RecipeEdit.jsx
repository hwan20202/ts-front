import { useState, useEffect } from "react";
import RecipeProfile from "../components/recipe/RecipeProfile";
import RecipeDescription from "../components/recipe/RecipeDescription";
import EditIngredientList from "../components/recipe/edit/EditIngredientList";
import EditCookingStepList from "../components/recipe/edit/EditCookingStepList";
import useRecipeEdit from "../hooks/useRecipeEdit";
import { useParams, useNavigate } from "react-router-dom";
import RecipeEditFooter from "../components/footer/RecipeEditFooter";
import { useRecipe } from "../context/RecipeProvider";
import RecipeLoading from "./RecipeLoading";
import FoldableSection from "../components/common/FoldableSection";
import FoldableBoxProvider from "../context/FoldableBoxProvider";
import MenuSelect from "../components/common/MenuSelect";
import Slider from "../components/common/Slider";
import { useRef } from "react";
const style = {
  page: "flex flex-col w-full h-full justify-start",
  comment:
    "flex flex-col w-full justify-start my-4 bg-gray-100 rounded-lg p-4 gap-4",
  aiComment: "flex flex-col w-full h-full justify-start text-black",
  commentTitle: "text-lg text-black font-bold leading-none mb-2",
  commentContent:
    "text-base font-semibold leading-[1.7] text-white px-4 py-2 rounded-lg my-1",
  bgColor: {
    orange: "bg-orange-400",
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
  },
};

const Comment = ({ children, className }) => {
  return (
    <div className="flex">
      <span className={`${style.commentContent} ${className}`}>{children}</span>
    </div>
  );
};

const RecipeComment = ({
  main_changes_from_original_recipe,
  reason_for_changes,
  unchanged_parts_and_reasons,
}) => {
  const [isReasonForChangesOpen, setIsReasonForChangesOpen] = useState(false);
  return (
    <div className={style.comment}>
      <div>
        <FoldableBoxProvider>
          <div
            className="flex justify-between items-center cursor-pointer hover:bg-gray-200"
            onClick={() => setIsReasonForChangesOpen(!isReasonForChangesOpen)}
          >
            <h2 className={style.commentTitle}>변경 이유</h2>
            <i
              className={`fa-solid ${
                isReasonForChangesOpen ? "fa-chevron-up" : "fa-chevron-down"
              } text-gray-500 mr-2`}
            ></i>
          </div>
          <FoldableSection isOpen={isReasonForChangesOpen}>
            {reason_for_changes.map((s, index) => (
              <span
                key={index}
                className="text-base text-gray-800 leading-[1.7]"
              >
                {s}
              </span>
            ))}
          </FoldableSection>
        </FoldableBoxProvider>
      </div>
      <div>
        <h2 className={style.commentTitle}>변경 사항</h2>
        {main_changes_from_original_recipe.map((s, index) => (
          <Comment key={index} className={style.bgColor.green}>
            {s}
          </Comment>
        ))}
      </div>
      <div>
        <h2 className={style.commentTitle}>변경 전 부분</h2>
        {unchanged_parts_and_reasons.map((s, index) => (
          <Comment key={index} className={style.bgColor.orange}>
            {s}
          </Comment>
        ))}
      </div>
    </div>
  );
};

const Tip = ({ children }) => {
  return (
    <span className="block text-base text-gray-800 leading-[1.7]">
      {children}
    </span>
  );
};

const RecipeTips = ({ recipe_tips }) => {
  return (
    <div className={style.comment}>
      <div>
        <h2 className={style.commentTitle}>
          <i className="fa-solid fa-circle-info text-sm"></i> 팁
        </h2>
        {recipe_tips.map((s, index) => (
          <Tip key={index}>{s}</Tip>
        ))}
      </div>
    </div>
  );
};

const RecipeEdit = () => {
  const navigate = useNavigate();
  const { editRecipe, aiEditRecipe } = useRecipe();
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef([null, null, null]);
  const [height, setHeight] = useState("100%");

  const {
    recipe,
    loading: loadingEdit,
    editIngredient,
    deleteIngredient,
    addIngredient,
    editCookingImg,
    editCookingOrder,
    addCookingOrder,
    editComplete,
  } = useRecipeEdit(aiEditRecipe.recipe);

  useEffect(() => {
    setHeight(
      ref?.current[currentSlide]
        ? `${ref?.current[currentSlide]?.offsetHeight}px`
        : "100%"
    );
  }, [currentSlide]);

  if (loadingEdit) {
    return <RecipeLoading />;
  }
  if (!recipe) {
    return;
  }

  return (
    <div className={style.page}>
      <RecipeProfile image={recipe?.main_img || ""} />
      <RecipeDescription {...recipe} />
      <MenuSelect
        options={
          aiEditRecipe.aiComment
            ? ["레시피 포인트", "재료 보기", "조리 순서 보기"]
            : ["재료 보기", "조리 순서 보기"]
        }
        onChange={(index) => {
          setCurrentSlide(index);
        }}
      />
      <Slider position={currentSlide} height={height}>
        {aiEditRecipe.aiComment && (
          <div className="w-full flex flex-col bg-white px-6 shrink-0">
            <div
              ref={(el) => (ref.current[0] = el)}
              className="flex flex-col gap-4 bg-white p-4"
            >
              <RecipeComment {...aiEditRecipe.aiComment} />
            </div>
          </div>
        )}
        <div className="w-full flex flex-col bg-white px-6 shrink-0">
          <div ref={(el) => (ref.current[1] = el)}>
            {aiEditRecipe.aiComment && (
              <RecipeTips {...aiEditRecipe.aiComment} />
            )}
            <EditIngredientList
              {...recipe}
              onChange={editIngredient}
              onDelete={deleteIngredient}
              onAdd={addIngredient}
            />
          </div>
        </div>
        <EditCookingStepList
          {...recipe}
          editCookingOrder={editCookingOrder}
          editCookingImg={editCookingImg}
          addCookingOrder={addCookingOrder}
        />
      </Slider>

      <RecipeEditFooter editComplete={editComplete} />
    </div>
  );
};

export default RecipeEdit;
