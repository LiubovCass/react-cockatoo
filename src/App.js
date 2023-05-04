import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

  const [active, setActive] = useState(false);
  // active = { navbarActive };
  // setActive = { setNavbarActive };
  //by default navbar hidden

  return (
    <>
      <div className={style.wrapper}>
        <BrowserRouter>
          <div
            className={active ? style.navbar.active : style.navbar}
            onClick={() => setActive(false)}
          >
            <div className={style.burgerBtn} onClick={() => setActive(!active)}>
              <span />
            </div>
            <div
              className={style.navbar_links}
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/">
                {tableName.table1}
                <span className={style.navbar_icons}>
                  <CgUser
                    size="1.5rem"
                    color="var(--color)"
                    padding-left="1rem"
                  />
                </span>
              </Link>
              <Link to="/family">
                {tableName.table2}
                <span className={style.navbar_icons}>
                  <CgHeart size="1.5rem" color="var(--color)" />
                </span>
              </Link>
              <Link to="/work">
                {tableName.table3}
                <span className={style.navbar_icons}>
                  <CgBriefcase size="1.5rem" color="var(--color)" />
                </span>
              </Link>
              <Link to="/grocery">
                {tableName.table4}
                <span className={style.navbar_icons}>
                  <CgShoppingCart size="1.5rem" color="var(--color)" />
                </span>
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
