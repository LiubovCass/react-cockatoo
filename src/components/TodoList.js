import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types";
// import style from "./TodoListItem.module.css";

// Inside the map() method, use the TodoListItem component

function TodoList({ onRemoveTodo, todoList }) {
  return (
    <>
      {
        todoList.map(function (todo) {
          return (
            <TodoListItem
              onRemoveTodo={onRemoveTodo}
              key={todo.id}
              title={todo.fields.Title}
              id={todo.id}
              todo={todo}
            />
          );
        })
        //    Inside the map() method, use the TodoListItem component
      }
    </>
  );
}
TodoList.propTypes = {
  onRemoveTodo: PropTypes.func,
  todoList: PropTypes.array,
};
export default TodoList;
