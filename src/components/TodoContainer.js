import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import style from "./TodoListItem.module.css";
import Greeting from "./Greeting";
import MySelect from "./MySelect";
import PropTypes from "prop-types";

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
  //const [todos, setTodos] = useState([
  // { id: 1, Title: "todoList4", CreatedTime: "date4" },
  // { id: 2, Title: "todoList2", CreatedTime: "date2" },
  // { id: 3, Title: "todoList1", CreatedTime: "date1" },
  // { id: 4, Title: "todoList3", CreatedTime: "date3" },
  // ]);

  const API_ENDPOINT = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${props.tableName}`;

  useEffect(() => {
    fetch(
      `${API_ENDPOINT}`,
      //Sorting API

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
        // console.log(result.records);
        // ascending alphabetical order by "Title" (A-to-Z)
        // ascending
        //   ? result.records.sort((objectA, objactB) => {
        //       if (objectA.fields.Title < objactB.fields.Title) return -1;
        //       else if (objectA.fields.Title === objactB.fields.Title) return 0;
        //       else return 1;
        //     })
        //   : result.records.sort((objectA, objactB) => {
        //       if (objectA.fields.Title < objactB.fields.Title) return 1;
        //       else if (objectA.fields.Title === objactB.fields.Title) return 0;
        //       else return -1;
        //     });

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

  // const filterListTitles = (todoList) => {
  //   let todoListLowerCased;

  //   return (todoListLowerCased = todoList(
  //     (todo) => todo.fields.Title && todo.fields.Title.toLowerCase()
  //   ));
  // };

  // console.log(selectedSort);
  const sortTodos = (order, sort) => {
    // console.log(order, sort);

    // const todoListLowerCased = todoList.filter((todo) => {
    //   todo.fields[sort].toLowerCase();
    // });
    // const todoListLowerCased = JSON.parse(
    //   JSON.stringify(todoList, function (a, b) {
    //     return typeof b === "string" ? b.toLowerCase() : b;
    //   })
    // );
    // const LTodoList = [];
    // for (var sort in todoList) {
    //   if (typeof todoList[sort] === "string") {
    //     LTodoList.push(todoList[sort].toLowerCase());
    //   }
    // }

    // console.log(JSON.stringify(todoList));

    // console.log(todoList.fields[sort].toLowerCase());

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
  };

  return (
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
      {/* //selector for ascending// */}
      {/* <MySelect
        value={selectedSort}
        // setSelectedSort={setSelectedSort}
        onChange={sortTodos}
        defaultValue="Sorting by"
        options={[
          { value: "Title", name: "Title" },
          { value: "CreatedTime", name: "Created Time" },
        ]}
      /> */}

      <div className={style.todoListWithBtn}>
        {isLoading === true ? (
          <p>Loading...</p>
        ) : todoList.length === 0 ? (
          <p>Nothing todo</p>
        ) : (
          <>
            <div className={style.selectGroup}>
              <label className={style.label} htmlFor="ascending">
                Sorting by
              </label>
              {/* select Title / CreatedTime */}
              <MySelect
                value={OrderTitle}
                // setSelectedSort={setSelectedSort}
                // onChange={() => setAscending(!ascending)}
                onChange={titleSort}
                defaultValue="Title"
                options={[
                  { value: "ascending", name: "A-to-Z" },
                  { value: "descending", name: "Z-to-A" },
                ]}
              />

              <MySelect
                value={OrderCreatedTime}
                // setSelectedSort={setSelectedSort}
                onChange={createdTimeSort}
                defaultValue="Created Time"
                options={[
                  { value: "descending", name: "Newest to Oldest" },
                  { value: "ascending", name: "Oldest to Newest" },
                ]}
              />
            </div>
            {/* <label htmlFor="switch">Switch ascending and descending</label>
            <input
              id="switch"
              type="checkbox"
              checked={ascending}
              onChange={() => setAscending(!ascending)}
            /> */}
            <TodoList onRemoveTodo={removeTodo} todoList={todoList} />
          </>
        )}
      </div>
    </div>
  );
}

TodoContainer.propTypes = {
  isDarkMode: PropTypes.bool,
};

export default TodoContainer;

// const CarsOptions= [
//   { value: "subaruforester", label: "Subaru Forester" }
//   { value: "hondapilot", label: "Honda Pilot" },
//   { value: "toyota4runner", label: "Toyota 4Runner" },
//   { value: "chevroletequinox", label: "Chevrolet Equinox" }
//   { value: "fordescape", label: "Ford Escape" }
//   { value: "hyundaituxson", label: "Hyundai Tucson" }
//   //list is much longer...
// ];

// //Function

// const [car, setCar] = useState([]);

// function handleSelectCar(data) {
//   setCar(data);
// }

// //JSX

// <Select
//   options={CarsOptions}
//   placeholder="Search"
//   value={car}
//   onChange={handleSelectCar}
//   isSearchable={true}
//   className="w-full"
//   aria-label="Select"
//   menuPortalTarget={document.body}
//   styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//   components={{
//     NoOptionsMessage,
//   }}
// />
// const sortedOptions = useMemo(() => CarsOptions.sort(({label: labelA = ""}, {label: labelB = ""}) => labelA.localeCompare(labelB)), [CarsOptions]);

// <Select options={sortedOptions} {...other} />
