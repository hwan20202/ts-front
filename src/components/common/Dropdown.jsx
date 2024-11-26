import { useState } from "react";
import IconButton from "./IconButton.jsx";
import PropTypes from "prop-types";

// 색상 및 스타일을 위한 상수 정의
const colors = {
  text: "text-black", // 텍스트 색상을 검정색으로 설정
};

const styles = {
  container: "relative",
  bar: "bg-white rounded-md outline-none shadow-sm cursor-pointer text-black",
  option: `px-4 py-2 cursor-pointer hover:bg-gray-100 ${colors.text}`,
  menu: "absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-full z-50",
};

const DropdownBar = ({ label, onClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} onClick={onClick}>
        <span className={styles.label}>{label || "3"}</span>
        {/* <IconButton
          label="Toggle dropdown"
          // icon={<i className="fa-solid fa-caret-down"></i>}
          className="w-4 h-4"
          onClick={onClick}
        /> */}
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

const DropdownContainer = ({ list, selected, onSelect }) => {
  const handleSelect = (e) => {
    onSelect(parseInt(e.target.value));
  };

  return (
    <div className={styles.container}>
      <form>
        <select
          className={styles.bar}
          defaultValue={selected}
          onChange={handleSelect}
        >
          {list.map((l, i) => (
            <option
              key={i}
              value={l}
              className={styles.option}
              onClick={handleSelect}
            >
              {l}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

DropdownContainer.propTypes = {
  list: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const Dropdown = ({ list, selected, setSelected }) => {
  return (
    <DropdownContainer list={list} selected={selected} onSelect={setSelected} />
  );
};

Dropdown.propTypes = {
  list: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Dropdown;
