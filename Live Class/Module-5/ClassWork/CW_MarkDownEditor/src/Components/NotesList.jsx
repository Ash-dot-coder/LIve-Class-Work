import React from "react";
import Note from "./Note";

export default function NotesList({ notes, onSelectNote }) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note key={note.id} note={note} onSelectNote={onSelectNote} />
      ))}
    </div>
  );
}
