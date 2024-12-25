import React from "react";
import { useFoldableBox } from "../../context/FoldableBoxProvider";

const styles = {
  form: "w-full bg-gray-100 rounded-sm",
  input: "w-full bg-gray-100 outline-none text-gray-500",
  focusInput: "focus:border-b-[0.5px] focus:border-b-green-500",
};

const InputSection = ({ onSubmit, type, placeholder, defaultValue, name }) => {
  const { focusRef } = useFoldableBox();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      className={styles.form}
    >
      <input
        ref={focusRef}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="input inputFocus"
        name={name}
      />
    </form>
  );
};

export default InputSection;
