import PropTypes from "prop-types";
import { useState } from "react";
import getCurrentDate from "../utils/getCurrentDate.jsx";
import Button from "../components/common/Button.jsx";

// 날짜에 특정 일수를 더하는 함수
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DateForm = ({
  date = getCurrentDate(),
  setDate = () => {},
  className,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setDate(event.target.value);
  };

  const handleShortcutClick = (days) => {
    setSelectedDate(addDays(new Date(), days));
    setDate(addDays(new Date(), days));
  };

  const classList = `grid grid-cols-2 w-full justify-between item-center py-2 ${className}`;

  return (
    <div className={classList}>
      <div className="">
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-3 block w-full border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xxs"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 ml-2">
        {[
          { days: 7, label: "1주" },
          { days: 14, label: "2주" },
          { days: 28, label: "4주" },
        ].map(({ days, label }) => (
          <Button
            key={days}
            onClick={() => handleShortcutClick(days)}
            label={label}
            className="w-auto whitespace-nowrap leading-[0] p-0 m-0 bg-blue-500 text-white rounded-xl hover:bg-blue-600 text-xxs"
          />
        ))}
      </div>
    </div>
  );
};

DateForm.propTypes = {
  date: PropTypes.string,
  setDate: PropTypes.func,
  className: PropTypes.string,
};

export default DateForm;
