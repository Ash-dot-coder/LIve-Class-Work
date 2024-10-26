document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const notesContainer = document.getElementById('notesContainer');
    const noteContentInput = document.getElementById('noteContent');
    const noteColorInput = document.getElementById('noteColor');

    let dragNote = null;

    // Function to create a new sticky note
    function createNote(content = '', color = '#ffeb3b') {
        const note = document.createElement('div');
        note.classList.add('note');
        note.setAttribute('draggable', 'true');
        note.style.backgroundColor = color;

        // Note content area
        const textarea = document.createElement('textarea');
        textarea.value = content;
        note.appendChild(textarea);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-btn');
        note.appendChild(deleteBtn);

        // Event: Delete the note
        deleteBtn.addEventListener('click', () => {
            notesContainer.removeChild(note);
        });

        // Drag and drop functionality
        note.addEventListener('dragstart', (e) => {
            dragNote = note;
            e.dataTransfer.setData('text/plain', null);
        });

        note.addEventListener('dragend', () => {
            dragNote = null;
        });

        // Allow dropping notes on container
        notesContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        notesContainer.addEventListener('drop', (e) => {
            if (dragNote) {
                const rect = notesContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Update note position
                dragNote.style.left = `${x - 100}px`;
                dragNote.style.top = `${y - 100}px`;
                dragNote.style.position = 'absolute';
                dragNote.style.cursor = 'grab';
            }
        });

        // Add the new note to the container
        notesContainer.appendChild(note);
    }

    // Event: Add a new note with user input
    addNoteBtn.addEventListener('click', () => {
        const content = noteContentInput.value;
        const color = noteColorInput.value;

        if (content.trim() !== '') {
            createNote(content, color);
            noteContentInput.value = ''; // Clear input after adding
        } else {
            alert('Please enter some content for the note!');
        }
    });
});
