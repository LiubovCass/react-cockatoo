import { useState } from "react";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";

//dark mode/light mode
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
        aria-label="switch dark mode on light mode"
        className={`${style["toggle-button"]} ${
          toggle ? style["dark-theme"] : style["light-theme"]
        }`}
      >
        {toggle ? (
          <FiSun size="1.5rem" color="#f5f5f5" />
        ) : (
          <FiMoon size="1.5rem" color="#f5f5f5" />
        )}
      </button>
    </div>
  );
};

Toggle.propTypes = {
  onSwitch: PropTypes.func,
};

export default Toggle;
