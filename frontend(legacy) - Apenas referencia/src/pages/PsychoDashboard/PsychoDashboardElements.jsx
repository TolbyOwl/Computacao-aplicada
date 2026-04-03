import React from 'react';

export function PsychoSidebar() {
  return (
    <aside className="psycho-sidebar">
      {/* Logo Area */}
      <div className="size-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
        <span className="text-[10px] font-bold text-gray-400">Logo</span>
      </div>
      
      {/* Links Placeholders */}
      {[1, 2, 3, 4].map(n => (
        <div key={n} className={`size-12 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center ${n===1 ? 'bg-primary/10 border-primary/30' : 'bg-gray-50'}`}>
          <span className={`text-[10px] font-bold ${n===1 ? 'text-primary' : 'text-gray-400'}`}>Menu {n}</span>
        </div>
      ))}
      
      {/* Config Placeholder */}
      <div className="mt-auto size-12 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
        <span className="text-[10px] font-bold text-gray-400">Config</span>
      </div>
    </aside>
  );
}

export function PsychoMainArea() {
  return (
    <div className="psycho-main flex flex-col gap-6">
      <header className="mb-2 h-16 flex items-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 justify-center">
        <span className="font-bold text-gray-400 text-sm tracking-widest uppercase">Espaço: Saudação & Data</span>
      </header>

      <section className="card-soft h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">event_available</span>
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider text-center">Espaço: Bloco Próxima Sessão<br/>(Destaque visual)</span>
      </section>
      
      <section className="flex-1 card-soft flex flex-col border-2 border-dashed border-gray-300 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Agenda de Hoje</h3>
        
        <div className="flex flex-col gap-4 w-full h-full justify-center opacity-70">
          <div className="w-full h-16 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center">
            <span className="font-bold text-blue-300 text-sm uppercase">Item: Sessão Online</span>
          </div>
          <div className="w-full h-16 bg-green-50 border-2 border-dashed border-green-200 rounded-xl flex items-center justify-center">
            <span className="font-bold text-green-300 text-sm uppercase">Item: Sessão Concluída</span>
          </div>
          <div className="w-full h-16 bg-red-50 border-2 border-dashed border-red-200 rounded-xl flex items-center justify-center">
            <span className="font-bold text-red-300 text-sm uppercase">Item: Urgência</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PsychoRightPanel() {
  return (
    <aside className="psycho-right-panel flex flex-col gap-6">
      <div className="card-soft h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">notifications</span>
        <span className="font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Espaço:<br/>Solicitações Pendentes</span>
      </div>
      
      <div className="card-soft flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50/50">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">analytics</span>
        <span className="font-bold text-gray-400 text-xs uppercase tracking-wider text-center">Espaço:<br/>Resumo do Dia (Cards)</span>
      </div>
    </aside>
  );
}
