import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import { RiAddFill } from "react-icons/ri";
import PropTypes from "prop-types";

//created form with input and add button
const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(event) {
    // retrieve the input value from the event object and store in variable named newTodoTitle

    let newTodoTitle = event.target.value;

    // call the state setter setTodoTitle and pass newTodoTitle
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    //logic to reset the todoTitle state to an empty String

    event.preventDefault();
    if (todoTitle === "") {
      return;
    }

    onAddTodo({ title: todoTitle, id: new Date() });
    setTodoTitle("");
  }

  return (
    <div className={style.addTodoForm}>
      <form onSubmit={handleAddTodo}>
        <div className={style.todo_field}>
          <label className={style.label} htmlFor="todoTitle">
            Title
          </label>
          <div className={style.inputGroupe}>
            <InputWithLabel
              todoTitle={todoTitle}
              handleTitleChange={handleTitleChange}
              children
            ></InputWithLabel>

            <button
              className={style.addButton}
              type="submit"
              aria-label="Add Todo Button"
            >
              <RiAddFill />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};
export default AddTodoForm;
