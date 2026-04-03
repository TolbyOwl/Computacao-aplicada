import React from 'react';

export function NotesSidebar({ notes, onSelect, selectedNote }) {
  return (
    <aside className="notes-sidebar border-2 border-dashed border-gray-300 bg-gray-50/50 items-center justify-center">
      <span className="material-symbols-outlined text-4xl text-gray-300 mb-4">list_alt</span>
      <span className="font-bold text-gray-400 uppercase tracking-widest text-sm text-center">
        Lista de<br/>Anotações
      </span>
      <div className="mt-8 flex flex-col w-full gap-2">
         <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg bg-white/50" />
         <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg bg-white/50" />
         <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg bg-white/50 flex items-center justify-center text-xs text-gray-400 font-bold">Botão Nova</div>
      </div>
    </aside>
  );
}

export function NoteEditor({ note }) {
  return (
    <main className="note-editor-area border-2 border-dashed border-gray-300 bg-gray-50/50 items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4 block">stylus_note</span>
        <span className="font-bold text-gray-400 uppercase tracking-widest text-lg">Área de Visualização / Edição<br/>da Anotação Selecionada</span>
      </div>
    </main>
  );
}
