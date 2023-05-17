import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import style from "./TodoListItem.module.css";
import Greeting from "./Greeting";
import MySelect from "./MySelect";
import PropTypes from "prop-types";

function TodoContainer({ isDarkMode, tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // { id: 1, Title: "todoList4", CreatedTime: "date4" },
  // { id: 2, Title: "todoList2", CreatedTime: "date2" },
  // { id: 3, Title: "todoList1", CreatedTime: "date1" },
  // { id: 4, Title: "todoList3", CreatedTime: "date3" },
  // ]);

  const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  useEffect(() => {
    fetch(
      `${API_ENDPOINT}`,

      //Sorting API

      // ?sort[0][field]=CreatedTime&sort[0][direction]=desc`,
      // `${API_ENDPOINT}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,
      //GET request to API
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())

      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [API_ENDPOINT]);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setIsLoading(true);
    fetch(`${API_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Title: newTodo.title,
            },
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("success:", result);
        setTodoList([...todoList, result.records[0]]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error:", error);
        setIsLoading(false);
      });
  };

  //Delete items from API

  const removeTodo = (id) => {
    console.log(id);
    if (!isLoading) {
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
      fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      })
        .then((response) => response.json())

        .then((result) => {
          console.log("success:", result);
        })
        .catch((error) => console.error("error:", error));
    }
  };
  //Sorting JS

  const titleSort = (order) => {
    setOrderTitle(order);
    sortTodos(order, "Title");
  };

  const createdTimeSort = (order) => {
    setOrderCreatedTime(order);
    sortTodos(order, "CreatedTime");
  };

  const [OrderTitle, setOrderTitle] = useState("");
  const [OrderCreatedTime, setOrderCreatedTime] = useState("");

  const sortTodos = (order, sort) => {
    if (order === "ascending") {
      todoList.sort((objectA, objectB) => {
        if (
          objectA.fields[sort].toLowerCase() <
          objectB.fields[sort].toLowerCase()
        )
          return -1;
        else if (
          objectA.fields[sort].toLowerCase() ===
          objectB.fields[sort].toLowerCase()
        )
          return 0;
        else return 1;
      });
    } else {
      todoList.sort((objectA, objectB) => {
        if (
          objectA.fields[sort].toLowerCase() <
          objectB.fields[sort].toLowerCase()
        )
          return 1;
        else if (
          objectA.fields[sort].toLowerCase() ===
          objectB.fields[sort].toLowerCase()
        )
          return 0;
        else return -1;
      });
    }
  };

  return (
    <div
      className={`${style.mainContainer} ${
        isDarkMode ? style["dark-theme"] : style["light-theme"]
      }`}
    >
      <div className={style.todoInput}>
        <div className={style.greeting}>
          <Greeting />
        </div>
        <h1>{tableName}</h1>

        <AddTodoForm onAddTodo={addTodo} />
        <>
          <div className={style.selectGroup}>
            <label className={style.label} htmlFor="ascending">
              Sorting by
            </label>
            <div className={style.sortGroup}>
              {/* select Title / CreatedTime */}
              <MySelect
                value={OrderTitle}
                onChange={titleSort}
                defaultValue="Title"
                options={[
                  { value: "ascending", name: "A-to-Z" },
                  { value: "descending", name: "Z-to-A" },
                ]}
              />

              <MySelect
                value={OrderCreatedTime}
                onChange={createdTimeSort}
                defaultValue="Created Time"
                options={[
                  { value: "descending", name: "Newest to Oldest" },
                  { value: "ascending", name: "Oldest to Newest" },
                ]}
              />
            </div>
          </div>
        </>

        <div className={style.todoListWithBtn}>
          {isLoading === true ? (
            <p>Loading...</p>
          ) : todoList.length === 0 ? (
            <p>Nothing todo</p>
          ) : (
            <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
          )}
        </div>
      </div>
    </div>
  );
}

TodoContainer.propTypes = {
  isDarkMode: PropTypes.bool,
  tableName: PropTypes.string,
};

export default TodoContainer;
