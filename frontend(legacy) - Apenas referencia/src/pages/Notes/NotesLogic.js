import { useState } from 'react';

export function useNotesLogic() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes] = useState([
    { id: 1, title: 'Anotação 1' },
    { id: 2, title: 'Anotação 2' },
    { id: 3, title: 'Anotação 3' },
  ]);

  return { notes, selectedNote, setSelectedNote };
}
