import React from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

//sorting with <select/>
const MySelect = ({ defaultValue, options, value, onChange }) => {
  const handleSelectChange = (event) => {
    onChange(event.target.value);

    console.log(typeof defaultValue);
    console.log(typeof options);
  };
  return (
    <div className={style.mySelect}>
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

MySelect.propTypes = {
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default MySelect;
