import React from "react";
import TodoListItem from "./TodoListItem";

// const todoList = [
//     {
//       id: 1,
//       title: "Read the book",
//     },
//     {
//       id: 2,
//       title: "Watch video",
//     },
//     {
//       id: 3,
//       title: "Complete assignment",
//     }
//   ]
// Add props as a parameter to the TodoList functional component
export default function TodoList({ onRemoveTodo, todoList }) {
  return (
    <ul>
      {todoList.map((item) => {
        return (
          // Pass onRemoveTodo prop as a callback handler prop named onRemoveTodo to the TodoListItem component
          <TodoListItem
            onRemoveTodo={onRemoveTodo}
            key={item.id}
            title={item.title}
            id={item.id}
          />
        );
        //         Inside the map() method, use the TodoListItem component
        //  Pass key as a prop equal to the id of the todo object
        //  Pass todo as a prop
      })}
    </ul>
  );
}
