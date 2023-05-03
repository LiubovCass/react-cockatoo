import React from "react";
import style from "./TodoListItem.module.css";
//import IconButton from "./IconButton";
// import { FaTrashAlt } from "react-icons/fa";
import { CgTrash } from "react-icons/cg";

import PropTypes from "prop-types";
import Checkbox from "./Checkbox";

// update props to use destructuring
const TodoListItem = ({ id, onRemoveTodo, title, todo }) => {
  return (
    <>
      {/* <div className={style.todoListWithBtn}> */}
      {/* <ul className={style.todoListItemContainer}> */}

      <ul className={style.todoListItemContainer}>
        <li className={style.listItem}>
          <div className={style.checkbox_wrapper}>
            <div className={style.round}>
              <Checkbox
                label={""}
                checked={true}
                // selected={checked}
              />

              {/* <label htmlFor="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={handleChange}
              />
            </label> */}
            </div>
          </div>
          <div className={style.todoItemCreatedTime}>
            {title} <br />
            <span>{todo.createdTime}</span>
          </div>
          <button
            className={style.removeButton}
            type="button"
            onClick={() => onRemoveTodo(id)}
          >
            <CgTrash size="1.2rem" color="#252832" />
          </button>
        </li>
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
