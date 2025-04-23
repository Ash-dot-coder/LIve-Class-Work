import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Components/HeadingComponent";
import Markdown from "./Components/Markdown";
import NotesList from "./Components/NotesList";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNewNote = () => {
    const newNote = { id: Date.now(), title: "Untitled", content: "" };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };
  const updateNote = (id, title, content) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, title, content } : note))
    );
    setSelectedNote((prev) =>
      prev && prev.id === id ? { ...prev, title, content } : prev
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNote(null);
  };
  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="sidebar">
        <Header
          onAddNote={addNewNote}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          darkMode={darkMode}
        />
        <NotesList notes={notes} onSelectNote={setSelectedNote} />
      </div>

      <div className="editor">
        {selectedNote ? (
          <Markdown
            note={selectedNote}
            onUpdateNote={updateNote}
            onDeleteNote={deleteNote}
          />
        ) : (
          <p className="no-notes">You have no notes. Click "➕" to start.</p>
        )}
      </div>
    </div>
  );
}

export default App;
