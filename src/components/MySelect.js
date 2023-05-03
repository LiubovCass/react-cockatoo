import React from "react";

const MySelect = ({
  defaultValue,
  options,
  value,
  onChange,
  // setSelectedSort,
}) => {
  const handleSelectChange = (event) => {
    onChange(event.target.value);
    // let selectedTitleValue = event.target.value;
    // setSelectedSort(selectedTitleValue);
  };
  return (
    <div>
      <select value={value} onChange={handleSelectChange}>
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
