import React from 'react';
import { useNotesLogic } from './NotesLogic';
import { NotesSidebar, NoteEditor } from './NotesElements';
import './Notes.css';

export default function Notes() {
  const { notes, selectedNote, setSelectedNote } = useNotesLogic();

  return (
    <div className="notes-container relative">
      <div className="paper-texture" />
      <NotesSidebar notes={notes} onSelect={setSelectedNote} selectedNote={selectedNote} />
      <NoteEditor note={selectedNote} />
    </div>
  );
}
