import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Toolbar from "./Toolbar";

export default function Markdown({ note, onUpdateNote, onDeleteNote }) {
  const [title, setTitle] = useState(note?.title || "");
  const [text, setText] = useState(note ? note.content : "");
  const fileInputRef = useRef(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setText(note?.content || "");
  }, [note]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    onUpdateNote(note.id, e.target.value, text);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    onUpdateNote(note.id, title, e.target.value);
  };

  const formatText = (symbol, block = false) => {
    const editor = document.getElementById("editor");
    const selectionStart = editor.selectionStart;
    const selectionEnd = editor.selectionEnd;
    const selectedText = text.substring(selectionStart, selectionEnd);

    let newText;

    if (block) {
      const lines = selectedText
        .split("\n")
        .map((line, index) =>
          symbol === "1. " ? `${index + 1}. ${line}` : `${symbol}${line}`
        );
      newText =
        text.substring(0, selectionStart) +
        "\n" +
        lines.join("\n") +
        "\n" +
        text.substring(selectionEnd);
    } else {
      newText =
        text.substring(0, selectionStart) +
        symbol +
        selectedText +
        symbol +
        text.substring(selectionEnd);
    }

    setText(newText);
    onUpdateNote(note.id, title, newText);

    setTimeout(() => {
      editor.selectionStart = selectionStart + symbol.length;
      editor.selectionEnd = selectionEnd + symbol.length;
      editor.focus();
    }, 0);
  };

  const insertImage = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const markdownImage = `\n![Image](${base64String})\n`;
        setText(text + markdownImage);
        onUpdateNote(note.id, title, text + markdownImage);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="markdown-editor">
      <input
        className="title-input"
        value={title}
        onChange={handleTitleChange}
        placeholder="Enter note title..."
      />
      <Toolbar onFormatText={formatText} onInsertImage={insertImage} />
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
        accept="image/*"
      />
      <div className="editor-container">
        <textarea
          id="editor"
          className="text-editor"
          value={text}
          onChange={handleTextChange}
        />
        <div className="preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
        </div>
      </div>
      <button className="delete-note" onClick={() => onDeleteNote(note.id)}>
        Delete Note 🗑️
      </button>
    </div>
  );
}
