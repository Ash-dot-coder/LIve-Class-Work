import React from "react";

const Toolbar = ({ onFormatText, onInsertImage }) => {
  return (
    <div className="toolbar">
      <button onClick={() => onFormatText("**")} title="Bold">
        <b>B</b>
      </button>
      <button onClick={() => onFormatText("_")} title="Italic">
        <i>I</i>
      </button>
      <button onClick={() => onFormatText("~~")} title="Strikethrough">
        <s>S</s>
      </button>
      <button onClick={onInsertImage} title="Insert Image">
        🖼️
      </button>
      <button onClick={() => onFormatText("- ", true)} title="Unordered List">
        • List
      </button>
      <button onClick={() => onFormatText("1. ", true)} title="Ordered List">
        1. List
      </button>
    </div>
  );
};

export default Toolbar;
