import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

//import style from "./TodoListItem.module.css";

//Create Reusable Input with Label Component

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  //input element is re-focused automatically!!!
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  // console.log(children);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
        ref={inputRef}
        id="todoTitle"
        name="title"
        type="text"
        placeholder="new todo"
        value={todoTitle}
        onChange={handleTitleChange}
      ></input>
    </>
  );
}
InputWithLabel.propTypes = {
  handleTitleChange: PropTypes.func,
  todoTitle: PropTypes.string,
  children: PropTypes.bool,
  // children: PropTypes.node.isRequired,
};

export default InputWithLabel;

// return (
//     <form onSubmit={handleAddTodo}>
//       <InputWithLabel
//         todoTitle={todoTitle}
//         handleTitleChange={handleTitleChange}
//       >
//         Title
//       </InputWithLabel>

//       <button type="submit">Add</button>
//     </form>
//   );
