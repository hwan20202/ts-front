import { useState, useEffect, useRef } from "react";
import SearchBar from "../common/SearchBar.jsx";
import Ingredient from "../../models/Ingredient";
import { useIngredient } from "../../hooks/useIngredient";

const ingredientSearchStyle = {
  container: "w-full",
};

const searchBarStyle = {
  formStyle: "",
  inputStyle: "rounded-full mr-3 px-6",
  buttonStyle:
    "overflow-hidden w-16 h-8 rounded-full leading-[0] text-xs whitespace-nowrap bg-green-500",
};

const colorStyles = {
  itemBackground: "bg-gray-600",
  itemHoverBackground: "hover:bg-gray-500",
  selectedItemBackground: "bg-blue-600",
  confirmButtonBackground: "bg-green-500",
  confirmButtonHoverBackground: "hover:bg-green-600",
  confirmButtonDisabledBackground: "disabled:bg-gray-400",
};

const baseStyles = {
  container: "flex mt-2 max-h-[200px] overflow-y-auto",
  item: "shrink-0 inline-flex items-center justify-center text-white h-8 rounded-full m-1 px-3 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400",
  confirmButton: "w-full text-white rounded-md py-2 mt-4",
};

const resultContainerStyle = {
  container: baseStyles.container,
  item: `${baseStyles.item} ${colorStyles.itemBackground} ${colorStyles.itemHoverBackground}`,
  selectedItem: `${baseStyles.item} ${colorStyles.selectedItemBackground}`,
  confirmButton: `${baseStyles.confirmButton} ${colorStyles.confirmButtonBackground} ${colorStyles.confirmButtonHoverBackground} ${colorStyles.confirmButtonDisabledBackground}`,
};

const ResultContainer = ({ resultList, onClick }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelectItem = (item) => {
    setSelectedItems((prevSelected) => {
      const newSelectedItems = prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item];
      return newSelectedItems;
    });
  };

  useEffect(() => {
    onClick(selectedItems);
  }, [selectedItems]);

  return (
    <div className={resultContainerStyle.container}>
      <div className="inline-flex flex-col">
        {resultList.map((item, index) => (
          <button
            key={index}
            onClick={() => toggleSelectItem(item)}
            className={`${
              selectedItems.includes(item)
                ? resultContainerStyle.selectedItem
                : resultContainerStyle.item
            }`}
          >
            {item.foodName}
          </button>
        ))}
      </div>
    </div>
  );
};

const IngredientSearch = ({ onConfirm }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { searchIngredient } = useIngredient();

  useEffect(() => {}, [selectedItems]);

  const handleSearch = async (keyword) => {
    if (keyword === "") {
      setResults([]);
      return;
    }
    const userKeyword = keyword;
    const resultList = await searchIngredient(userKeyword);
    setResults(
      resultList.map(
        (item) =>
          new Ingredient({
            ...item,
          })
      )
    );
  };

  const handleConfirm = (selectedItems) => {
    // 선택된 아이템을 처리하는 로직을 여기에 추가
    onConfirm(selectedItems);
    setSelectedItems([]);
    setResults([]);
  };

  return (
    <div className={ingredientSearchStyle.container}>
      <SearchBar
        label="검색"
        onSearch={handleSearch}
        className={searchBarStyle.formStyle}
        inputStyle={searchBarStyle.inputStyle}
        buttonStyle={searchBarStyle.buttonStyle}
      />
      {results.length > 0 && (
        <ResultContainer
          resultList={results}
          onClick={(items) => setSelectedItems(items)}
        />
      )}
      {results.length > 0 && (
        <button
          className={resultContainerStyle.confirmButton}
          onClick={() => handleConfirm(selectedItems)}
          disabled={selectedItems.length === 0}
        >
          확인
        </button>
      )}
    </div>
  );
};

export default IngredientSearch;
