import React from "react";

const Header = ({ onAddNote, onToggleDarkMode, darkMode }) => {
  return (
    <div className="header">
      <span>NOTES</span>
      <div>
        <button onClick={onAddNote} className="add-note">
          ➕
        </button>
        <button onClick={onToggleDarkMode} className="toggle-mode">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Header;
