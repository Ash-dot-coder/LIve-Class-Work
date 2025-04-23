import React from "react";

export default function Note({ note, onSelectNote }) {
  return (
    <div className="note" onClick={() => onSelectNote(note)}>
      {note.title}
    </div>
  );
}
