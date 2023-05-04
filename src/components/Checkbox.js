import React from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";
// import style from "./Checkbox.module.css";

const Checkbox = ({ isChecked, setIsChecked }) => {
  //   const defaultChecked = checked ? checked : false;

  //   useEffect(() => {
  //     localStorage.setItem("false", isChecked);
  //   }, [isChecked]);

  const handleChecked = () => {
    setIsChecked(!isChecked);
    // localStorage.setItem("isChecked", JSON.stringify(isChecked));
  };
  //   const handleChecked = (event) => {
  //     setIsChecked(event.target.value);
  //   };

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
    // <div>
    //   {/* <div className={style["checkbox-wrapper"]}> */}
    //   <input
    //     type="checkbox"
    //     id="checkbox-item"
    //     name="check"
    //     checked={isChecked}
    //     onClick={handleChecked}
    //   />
    //   <label htmlFor="checkbox-item">
    //     <span>{/*This span is needed to create the "checkbox" element*/}</span>
    //     {/*Checkbox*/}
    //   </label>
    // </div>

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

// <div className={style.checkbox_wrapper}>
//   <div className={style.round}>
//     <label>

/* <label htmlFor="checkbox">{children}</label> */

/* <label> */

//   <input
//     type="checkbox"
//     checked={handleChecked}
//     onChange={() => setIsChecked((prev) => !prev)}
//     {...props}
//     className={isChecked ? "checked" : ""}
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
//   />
//   <span>{label}</span>

/* const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
}; */

/* {label} */

/* </label> */

//         </label>
//       </div>
//     </div>
//   );
// };

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  //   onChange: PropTypes.func,
};
export default Checkbox;
