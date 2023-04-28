import React, { useState } from "react";
import ReactSwitch from "react-switch";
import style from "./TodoListItem.module.css";

function ToggleSwitch() {
  const [checked, setChecked] = useState(true);
  const handleChange = (val) => {
    setChecked(val);
  };
  return (
    <div className={style.switch} style={{ textAlign: "center" }}>
      <label className={style.turn} htmlFor="switch">
        A-to-Z
      </label>
      <input className={style.toggle} id="switch" type="checkbox"></input>
      {/* <h4>A-to-Z</h4> */}
      <ReactSwitch onChange={handleChange} checked={checked} />
    </div>
  );
}

export default ToggleSwitch;
