import { useState } from "react";
import IconButton from "./IconButton.jsx";
import PropTypes from "prop-types";

// 색상 및 스타일을 위한 상수 정의
const colors = {
  text: "text-black", // 텍스트 색상을 검정색으로 설정
};

const styles = {
  container: "relative",
  bar: `flex items-center justify-between gap-2 w-full px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 ${colors.text}`,
  label: `font-medium ${colors.text}`,
  menu: "absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full z-50",
  menuItem: `px-4 py-2 cursor-pointer hover:bg-gray-100 ${colors.text}`,
};

const DropdownBar = ({ label, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} onClick={onClick}>
        <span className={styles.label}>{label || ""}</span>
        <IconButton
          label="Toggle dropdown"
          icon={<i className="fa-solid fa-caret-down"></i>}
          className="w-4 h-4"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

const DropdownMenu = ({ onClick, list }) => {
  const onSelect = (title) => {
    onClick(title);
  };

  return (
    <div className={styles.menu}>
      <ol className="divide-y divide-gray-200">
        {list.length > 0 &&
          list.map((l, i) => (
            <li key={i} onClick={() => onSelect(l)} className={styles.menuItem}>
              {l}
            </li>
          ))}
      </ol>
    </div>
  );
};

DropdownBar.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

DropdownMenu.propTypes = {
  onClick: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
};

const DropdownContainer = ({ list, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onBtnClick = (title) => {
    setSelected(title);
    onSelect(title);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <DropdownBar label={selected} onClick={toggleMenu} />
      {isOpen && list.length > 0 && (
        <DropdownMenu onClick={onBtnClick} list={list} />
      )}
    </div>
  );
};

DropdownContainer.propTypes = {
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const Dropdown = ({ list, setSelected }) => {
  return <DropdownContainer list={list} onSelect={setSelected} />;
};

Dropdown.propTypes = {
  list: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Dropdown;
