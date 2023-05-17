import React from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

const Checkbox = ({ isChecked, setIsChecked }) => {
  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={style.checkbox_wrapper}>
      <div className={style.round}>
        <label htmlFor="checkbox" className={style.container}>
          <input
            type="checkbox"
            id="checkbox-item"
            onChange={handleChecked}
            checked={isChecked}
          />
          <span className={style.checkmark}></span>
        </label>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  setIsChecked: PropTypes.func,
};
export default Checkbox;
