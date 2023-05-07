import { React, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TodoContainer from "./components/TodoContainer";
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

  const [menuActive, setMenuActive] = useState(false);

  return (
    <>
      <div className={style.wrapper}>
        <BrowserRouter>
          <div
            className={style.burgerBtn}
            onClick={() => setMenuActive(!menuActive)}
          >
            <span />
          </div>

          <div
            className={`${style.burgerMenu_links} ${
              menuActive ? style.burgerMenu.active : style.burgerMenu
            }`}
          >
            <Link to="/">
              {tableName.table1}
              <span className={style.navbar_icons}>
                <CgUser />
              </span>
            </Link>
            <Link to="/family">
              {tableName.table2}
              <span className={style.navbar_icons}>
                <CgHeart />
              </span>
            </Link>
            <Link to="/work">
              {tableName.table3}
              <span className={style.navbar_icons}>
                <CgBriefcase />
              </span>
            </Link>
            <Link to="/grocery">
              {tableName.table4}
              <span className={style.navbar_icons}>
                <CgShoppingCart />
              </span>
            </Link>
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
