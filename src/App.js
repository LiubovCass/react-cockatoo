import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import AskGoogle from ".//pages/AskGoogle";
import TodoContainer from "./components/TodoContainer";
// import MyNewToDoList from ".//pages/MyNewToDoList";
import Toggle from ".//components/Toggle.js";

import style from "./components/TodoListItem.module.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const tableName = { table1: "My todo", table2: "Grocery", table3: "Work" };
  // const arrayTableNames = tableNames.map((tableName) => <div>{tableName}</div>);

  return (
    <>
      <div className={style.wrapper}>
        <BrowserRouter>
          <div className={style.navbar}>
            <div className={style.navbar_links}>
              <Link to="/">{tableName.table1}</Link>
              <Link to="/grocery">{tableName.table2}</Link>
              <Link to="/work">{tableName.table3}</Link>
            </div>
            <Toggle onSwitch={setIsDarkMode} />
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <TodoContainer
                  tableName={tableName.table1}
                  isDarkMode={isDarkMode}
                />
              }
            ></Route>
            <Route
              path="/grocery"
              element={
                <TodoContainer
                  tableName={tableName.table2}
                  isDarkMode={isDarkMode}
                />
              }
            ></Route>
            <Route
              path="/work"
              element={
                <TodoContainer
                  tableName={tableName.table3}
                  isDarkMode={isDarkMode}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
