import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import AskGoogle from ".//pages/AskGoogle";
import TodoContainer from "./components/TodoContainer";
// import MyNewToDoList from ".//pages/MyNewToDoList";
import Toggle from ".//components/Toggle.js";

import style from "./components/TodoListItem.module.css";
import { CgShoppingCart } from "react-icons/cg";
import { CgBriefcase } from "react-icons/cg";
import { CgUser } from "react-icons/cg";
import { CgHeart } from "react-icons/cg";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const tableName = {
    table1: "My todo",
    table2: "Family",
    table3: "Work",
    table4: "Grocery",
  };
  // const arrayTableNames = tableNames.map((tableName) => <div>{tableName}</div>);

  return (
    <>
      <div className={style.wrapper}>
        <BrowserRouter>
          <div className={style.navbar}>
            <div className={style.burgerBtn}>
              <span />
            </div>
            <div className={style.navbar_links}>
              <Link to="/">
                {tableName.table1}
                <CgUser size="1.5rem" color="var(--color)" />
              </Link>
              <Link to="/family">
                {tableName.table2}
                <CgHeart size="1.5rem" color="var(--color)" />
              </Link>
              <Link to="/work">
                {tableName.table3}
                <CgBriefcase size="1.5rem" color="var(--color)" />
              </Link>
              <Link to="/grocery">
                {tableName.table4}
                <CgShoppingCart size="1.5rem" color="var(--color)" />
              </Link>
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
              path="/family"
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
            <Route
              path="/grocery"
              element={
                <TodoContainer
                  tableName={tableName.table4}
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
