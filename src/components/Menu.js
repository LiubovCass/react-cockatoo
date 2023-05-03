import React from "react";
import style from "./TodoListItem.module.css";

const Menu = ({ header, items }) => {
  return (
    <div className={style.menu}>
      <div className={style.menu_content}></div>
    </div>
  );
};
