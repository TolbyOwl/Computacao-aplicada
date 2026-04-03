import React from 'react';

export function PatientHeader() {
  return (
    <header className="flex justify-center items-center h-20 bg-gray-50/50 rounded-[24px] border-2 border-dashed border-gray-300">
      <span className="font-bold text-gray-400 uppercase tracking-widest text-sm">Espaço do Cabeçalho (Botão Sair, Logo)</span>
    </header>
  );
}

export function NextSessionCard() {
  return (
    <section className="card-soft h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
      <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">video_camera_front</span>
      <span className="font-bold text-gray-400 uppercase tracking-widest text-sm text-center">Espaço: Detalhes da Próxima Sessão<br/>(Sessão Verde Grande)</span>
    </section>
  );
}

export function InfoBlocks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-soft h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">person_search</span>
        <span className="font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Detalhes sobre o<br/>Psicólogo</span>
      </div>
      <div className="card-soft h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">assignment</span>
        <span className="font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Detalhes sobre a<br/>Consulta</span>
      </div>
    </div>
  );
}

export function MoodSection() {
  return (
    <section className="card-soft h-48 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 bg-yellow-50/20">
      <span className="material-symbols-outlined text-4xl text-yellow-500/30 mb-2">mood</span>
      <span className="font-bold text-gray-400 uppercase tracking-widest text-sm text-center">Bloco: "Como está se sentindo?"<br/>(Botões de humor)</span>
    </section>
  );
}
