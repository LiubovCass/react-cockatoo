import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import style from "./TodoListItem.module.css";
import Greeting from "./Greeting";
import PropTypes from "prop-types";
// import ReactSwitch from "react-switch";
// import ToggleSwitch from "./ToggleSwitch";

// create custom hook
// function useSemiPersistentState() {
//   // Create new state variable named todoTitle with setter setTodoTitle
//   const [todoList, setTodoList] = React.useState(
//     JSON.parse(localStorage.getItem("savedTodoList")) || []
//   );

//   // Define a useEffect React hook with todoList as a dependency
//   // Inside the side-effect handler function, save the todoList inside localStorage with the key "savedTodoList"
//   // convert todoList to a string before saving in localStorage
//   React.useEffect(() => {
//     localStorage.setItem("savedTodoList", JSON.stringify(todoList));
//   }, [todoList]);

//   return [todoList, setTodoList];

// }

// const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/{props.tableName}/`;

function TodoContainer(props) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ascending, setAscending] = useState(true);

  const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${props.tableName}`;

  useEffect(() => {
    fetch(
      `${API_ENDPOINT}`,
      // ascending alphabetical order by "Title" (A-to-Z) API

      // ?sort[0][field]=CreatedTime&sort[0][direction]=desc`,
      // `${API_ENDPOINT}?view=Grid%20view&sort[0][field]=Title&sort[0][direction]=asc`,

      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())

      .then((result) => {
        // ascending alphabetical order by "Title" (A-to-Z) JS
        ascending
          ? result.records.sort((objectA, objactB) => {
              if (objectA.fields.Title < objactB.fields.Title) return -1;
              else if (objectA.fields.Title === objactB.fields.Title) return 0;
              else return 1;
            })
          : result.records.sort((objectA, objactB) => {
              if (objectA.fields.Title < objactB.fields.Title) return 1;
              else if (objectA.fields.Title === objactB.fields.Title) return 0;
              else return -1;
            });

        setTodoList(result.records);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [API_ENDPOINT, ascending]);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  // const [todoList, setTodoList] = useSemiPersistentState("");
  // const [newTodo, setNewTodo] = React.useState("");
  // react.useEffect(() => {});

  // Remove the newTodo state variable and the corresponding JSX that displays it

  // const [newTodo, setNewTodo] = React.useState("");
  //   Inside the App functional component, above the return statement, create a new state variable named newTodo with update function named setNewTodo
  // hint: useState hook

  // Declare a new function named addTodo that takes newTodo as a parameter
  //  Call the setTodoList state setter and use the spread operator to pass the existing Objects in the todoList Array along with the newTodo Object
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

  //Delete items

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
  //Sorting

  // const [selectedSort, setSelectedSort] = useState("");
  // const sortTodos = (sort) => {
  // setSelectedSort(sort);
  // console.log(ascending);

  // ascending
  //   ? todoList.sort((objectA, objactB) => {
  //       if (objectA.fields[sort] < objactB.fields[sort]) return -1;
  //       else if (objectA.fields[sort] === objactB.fields[sort]) return 0;
  //       else return 1;
  //     })
  //   : todoList.sort((objectA, objactB) => {
  //       if (objectA.fields[sort] < objactB.fields[sort]) return 1;
  //       else if (objectA.fields[sort] === objactB.fields[sort]) return 0;
  //       else return -1;
  //     });
  // ascending
  // ? result.records.sort((objectA, objactB) => {
  //     if (objectA.fields.Title < objactB.fields.Title) return -1;
  //     else if (objectA.fields.Title === objactB.fields.Title) return 0;
  //     else return 1;
  //   })
  // : result.records.sort((objectA, objactB) => {
  //     if (objectA.fields.Title < objactB.fields.Title) return 1;
  //     else if (objectA.fields.Title === objactB.fields.Title) return 0;
  //     else return -1;
  //   });

  // setTodoList([...todoList].sort((a, b) => a[sort].localeCompare(b[sort])));
  // console.log([...todoList].sort((a, b) => a[sort].localeCompare(b[sort])));

  return (
    <>
      <div
        className={`${style.mainContainer} ${
          props.isDarkMode ? style["dark-theme"] : style["light-theme"]
        }`}
      >
        <div className={style.todoInput}>
          <div className={style.greeting}>
            <Greeting />
          </div>
          <h1>{props.tableName}</h1>

          <AddTodoForm onAddTodo={addTodo} />
          {/* Pass setNewTodo as a callback handler prop named onAddTodo to the AddTodoForm component */}

          {/* Pass todoList state as a prop named todoList to the TodoList component */}
        </div>

        <div className={style.todoListWithBtn}>
          {isLoading === true ? (
            <p>Loading...</p>
          ) : todoList.length === 0 ? (
            <p>Nothing todo</p>
          ) : (
            <>
              {/* <ToggleSwitch
                id="switch"
                type="checkbox"
                checked={ascending}
                onChange={() => setAscending(!ascending)}
              /> */}

              {/* onChange={handleChange}
                 checked={checked}

                 onChange={setAscending(!ascending)}
                 onChange={(ascending) => setAscending(!ascending)}
                 height="15px"
                background
                 onColor */}

              <label className="switch" htmlFor="switch">
                A-to-Z
              </label>

              <input
                id="switch"
                type="checkbox"
                checked={ascending}
                onChange={() => setAscending(!ascending)}
              />

              {/* label className="switch" htmlFor="switch"
              Switch ascending and descending
               <label></label>
          
              

              {/* <span className="slider round"></span> */}
              <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

TodoContainer.propTypes = {
  isDarkMode: PropTypes.bool,
};

export default TodoContainer;
