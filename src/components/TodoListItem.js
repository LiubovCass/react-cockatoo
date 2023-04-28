import React from "react";
import style from "./TodoListItem.module.css";
//import IconButton from "./IconButton";
import { FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

// update props to use destructuring
const TodoListItem = ({ id, onRemoveTodo, title, todo }) => {
  return (
    <>
      {/* <div className={style.todoListWithBtn}> */}
      {/* <ul className={style.todoListItemContainer}> */}

      <ul>
        <li className={style.listItem}>
          {title} <br />
          <span>{todo.createdTime}</span>
        </li>
        <button
          className={style.removeButton}
          type="button"
          onClick={() => onRemoveTodo(id)}
        >
          <FaTrashAlt size="1rem" color="var(--color)" />
        </button>
      </ul>
      {/* </div> */}
    </>
  );
};

TodoListItem.propTypes = {
  id: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  title: PropTypes.string,
};

export default TodoListItem;
