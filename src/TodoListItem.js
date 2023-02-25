import React from "react";

// update props to use destructuring
const TodoListItem = ({ id, onRemoveTodo, title }) => {
  return (
    <>
      <li key={id}>
        {title}
        <button type="button" onClick={() => onRemoveTodo(id)}>
          Remove
        </button>
        {/* Add an onClick prop to the button element and pass a function that calls onRemoveTodo from props with the current item id as an argument */}
      </li>
    </>
  );
};

export default TodoListItem;
