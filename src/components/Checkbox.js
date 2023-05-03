import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

const Checkbox = ({ label, checked, ...props }) => {
  //   const defaultChecked = checked ? checked : false;
  const [isChecked, setIsChecked] = useState(localStorage.getItem("false"));

  useEffect(() => {
    localStorage.setItem("false", isChecked);
  }, [isChecked]);
  const handleChecked = (event) => {
    setIsChecked(event.target.value);
  };

  //   const switchCheckbox = ({ onSwitchCheckbox }) => {
  //     const newIsChecked = !isChecked;
  //     setIsChecked(newIsChecked);
  //     onSwitchCheckbox(newIsChecked);
  //   };

  // const handleCheckbox = (event) => {

  // const [searchTerm, setSearchTerm] = React.useState(
  //     localStorage.getItem('search') || 'React'
  // );
  //   React.useEffect(() => {
  //     localStorage.setItem('search', searchTerm);
  //   }, [searchTerm]);
  //   const handleSearch = (event) => {
  //     setSearchTerm(event.target.value);
  // };

  console.log(isChecked);

  return (
    <div className={style.checkbox_wrapper}>
      <div className={style.round}>
        <label>
          {/* <label htmlFor="checkbox">{children}</label> */}
          {/* <label> */}
          <input
            type="checkbox"
            checked={handleChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            {...props}
            className={isChecked ? "checked" : ""}
            // value={selected}
            //checked={checked}
            //   onChange={isChecked ? background="#66bb6a"
            //     .checkbox_wrapper.round input[type="checkbox"]:checked + label {
            //       background-color: #66bb6a;
            //       border-color: #66bb6a;
            //     }

            //     .checkbox_wrapper.round input[type="checkbox"]:checked + label:after {
            //       opacity: 1;
            //     }}
            //   {isChecked? Если да то ${один css} : иначе ${второй css}}
          />
          <span>{label}</span>

          {/* const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}; */}

          {/* {label} */}
          {/* </label> */}
        </label>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  //   onChange: PropTypes.func,
};
export default Checkbox;
