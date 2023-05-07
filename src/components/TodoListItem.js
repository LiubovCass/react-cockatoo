import React, { useState } from "react";
import style from "./TodoListItem.module.css";
import { CgTrash } from "react-icons/cg";
import PropTypes from "prop-types";
import Checkbox from "./Checkbox";
import { format } from "date-fns";

const TodoListItem = ({ id, onRemoveTodo, title, todo }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <ul className={style.todoListItemContainer}>
        <li className={style.listItem}>
          <div className={style.checkbox_wrapper}>
            <label htmlFor="checkbox">
              <Checkbox isChecked={isChecked} setIsChecked={setIsChecked} />
            </label>
          </div>
          <div
            className={
              isChecked
                ? style.todoTitleCreatedTimeDone
                : style.todoTitleCreatedTime
            }
          >
            {title} <br />
            <span className={style.createdTime}>
              {format(new Date(todo.createdTime), "MM/dd/yyyy HH:mm")}
            </span>
          </div>

          <button
            className={style.removeButton}
            aria-label="Remove"
            type="button"
            onClick={() => onRemoveTodo(id)}
          >
            <span className={style.btnContrntWrap}>
              <CgTrash
                size="1.1rem"
                color="#252832"
                aria-hidden="true"
                focusable="false"
                aria-label="remove todo"
              />
              {/* <span class={style.visuallyHidden}>Trash Can</span> */}
              {/* <VisuallyHidden>{label}</VisuallyHidden> */}
            </span>
          </button>
        </li>
      </ul>
    </>
  );
};

TodoListItem.propTypes = {
  id: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  title: PropTypes.string,
  todo: PropTypes.object,
};

export default TodoListItem;
