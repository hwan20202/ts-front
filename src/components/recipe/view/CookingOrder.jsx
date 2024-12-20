import FoldableBoxProvider, {
  useFoldableBox,
} from "../../../context/FoldableBoxProvider";
import FoldableSection from "../../common/FoldableSection";
import { useState, useEffect } from "react";
import ToggleButton from "../../common/ToggleButton";
import ImageWithSkeleton from "../../common/ImageWithSkeleton";
const CookingOrder = ({
  title = "",
  image = [],
  isImageOpenDefault,
  children,
}) => {
  const [isImageOpen, setIsImageOpen] = useState(isImageOpenDefault);

  useEffect(() => {
    setIsImageOpen(isImageOpenDefault);
  }, [isImageOpenDefault]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className=" text-sm leading-none text-gray-500">{title}</h2>
        <ToggleButton
          isOpen={isImageOpen}
          onSetTrue={() => {
            setIsImageOpen(true);
          }}
          onSetFalse={() => setIsImageOpen(false)}
        >
          <i
            className={`fa-solid ${
              isImageOpen ? "fa-chevron-up" : "fa-chevron-down"
            } text-gray-500 m-1`}
          ></i>
        </ToggleButton>
      </div>
      <FoldableBoxProvider>
        <FoldableSection isOpen={isImageOpen}>
          <div className="flex justify-center aspect-w-16 aspect-h-9 items-center overflow-hidden rounded-md">
            <ImageWithSkeleton
              src={image}
              alt={title}
              className="w-full object-cover"
            />
          </div>
        </FoldableSection>
      </FoldableBoxProvider>
      {children}
    </div>
  );
};

export default CookingOrder;
