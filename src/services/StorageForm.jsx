import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../components/common/Button.jsx";

const StorageForm = ({
  initialMethod = "",
  setStorageMethod = () => {},
  className,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(initialMethod);

  const storageMethods = [
    { label: "냉동", value: "frozen" },
    { label: "냉장", value: "refrigerated" },
    { label: "실온", value: "room temperature" },
  ];

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setStorageMethod(method);
  };

  const handleSubmit = () => {
    // 선택된 보관 방법을 제출하는 로직을 여기에 추가
    console.log("Selected storage method:", selectedMethod);
  };

  const classList = `grid grid-cols-3 gap-2 min-h-[24px] ${className}`;

  return (
    <div className={classList}>
      {storageMethods.map(({ label, value }) => (
        <Button
          key={value}
          onClick={() => handleMethodChange(value)}
          label={label}
          className={`${
            selectedMethod === value
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-black"
          } w-auto whitespace-nowrap leading-[0] p-3 m-0 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-xxs`}
        />
      ))}
    </div>
  );
};

StorageForm.propTypes = {
  initialMethod: PropTypes.string,
  setStorageMethod: PropTypes.func,
  className: PropTypes.string,
};

export default StorageForm;
