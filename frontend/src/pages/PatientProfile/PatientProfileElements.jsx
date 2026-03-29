import React from 'react';

export function ProfileSidebar() {
  return (
    <aside className="profile-sidebar">
      {/* Informações Primárias (Avatar, Nome) */}
      <div className="card-soft h-56 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">account_circle</span>
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider text-center">Espaço:<br/>Foto e Nome do Paciente</span>
      </div>

      {/* Informações Detalhadas */}
      <div className="card-soft h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">info</span>
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">Espaço: Informações</span>
      </div>

      {/* Progresso Geral */}
      <div className="card-soft h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-3xl text-gray-300 mb-2">trending_up</span>
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider text-center">Espaço: Progresso<br/>(Verde)</span>
      </div>
    </aside>
  );
}

export function ProfileMainArea({ activeTab, onTabChange }) {
  return (
    <main className="profile-main">
      <div className="profile-tabs mb-6">
        {['anotacao', 'consulta', 'proxima'].map((tab) => (
          <button 
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          >
            Aba: {tab}
          </button>
        ))}
      </div>
      
      <div className="profile-content-area">
        <div className="card-soft flex-1 min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
           <span className="material-symbols-outlined text-5xl text-gray-300 mb-4">edit_document</span>
           <span className="font-bold text-gray-400 text-sm uppercase tracking-wider text-center">
             Espaço: Conteúdo da aba "{activeTab}"<br/>
             (ex: Área de digitação da Anotação)
           </span>
        </div>
        
        {activeTab === 'anotacao' && (
          <div className="card-soft h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-blue-50/30">
            <span className="material-symbols-outlined text-4xl text-blue-200 mb-2">history</span>
            <span className="font-bold text-blue-300 text-sm uppercase tracking-wider text-center">
              Espaço: Histórico - Anotações<br/>(Azul claro)
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
