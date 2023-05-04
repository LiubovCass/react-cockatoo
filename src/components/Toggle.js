import { useState } from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

const Toggle = ({ onSwitch }) => {
  const [toggle, setToggle] = useState(false);

  const switchToggle = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    onSwitch(newToggle);
  };
  return (
    <div>
      <button
        onClick={switchToggle}
        className={`${style["toggle-button"]} ${
          toggle ? style["dark-theme"] : style["light-theme"]
        }`}
        // className={toggle ? style["dark-theme"] : style["light-theme"]}
      >
        {/* {" "} */}
        {toggle ? <FiSun size="1.5rem" /> : <FiMoon size="1.5rem" />}
      </button>
    </div>
  );
  //   return <button onClick={switchToggle}>{children}</button>;
};

Toggle.propTypes = {
  onSwitch: PropTypes.func,
};

export default Toggle;
