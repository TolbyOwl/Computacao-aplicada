import React from 'react';

export function AgendaSidebar() {
  return (
    <aside className="agenda-sidebar gap-6">
      <div className="placeholder-box rounded-xl h-20 mb-4">
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">Espaço: Logo & Título</span>
      </div>
      
      <div className="placeholder-box rounded-xl h-24 mb-2">
        <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">Espaço: Perfil do Psicólogo<br/>(Foto, Nome, Especialidade)</span>
      </div>
      
      <div className="flex flex-col gap-2">
         {[1, 2, 3, 4, 5].map(n => (
           <div key={n} className={`placeholder-box rounded-xl h-12 flex-row justify-start pl-4 ${n === 2 ? 'bg-primary/5 border-primary/30' : ''}`}>
             <span className={`font-bold text-sm tracking-wider ${n === 2 ? 'text-primary' : 'text-gray-400'}`}>
               Espaço: Link Menu {n} {n === 2 && '(Ativo: Pacientes)'}
             </span>
           </div>
         ))}
      </div>
      
      <div className="mt-auto flex flex-col gap-3">
        <div className="placeholder-box rounded-xl h-14">
           <span className="font-bold text-gray-400 text-xs uppercase tracking-wider">Botão: Conectar Google Calendar</span>
        </div>
        <div className="placeholder-box rounded-xl h-12 bg-[#8c624d]/10 border-[#8c624d]/30">
           <span className="font-bold text-[#8c624d] text-xs uppercase tracking-wider">Botão: Nova Sessão (Primário)</span>
        </div>
      </div>
    </aside>
  );
}

export function AgendaMainArea() {
  return (
    <main className="agenda-main">
      <div className="agenda-content">
        
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div className="flex-1 placeholder-box rounded-xl h-28 items-start justify-center pl-8">
            <span className="font-bold text-gray-400 text-sm uppercase tracking-wider">Espaço: Título (Meus Pacientes)<br/>& Breadcrumbs</span>
          </div>
          <div className="w-full md:w-96 flex gap-3">
             <div className="flex-1 placeholder-box rounded-xl h-14">
               <span className="font-bold text-gray-400 text-xs uppercase tracking-wider">Espaço: Input de Busca</span>
             </div>
             <div className="w-32 placeholder-box rounded-xl h-14 bg-gray-800 border-gray-900 border-solid">
               <span className="font-bold text-white text-xs uppercase tracking-wider">Botão:<br/>Novo</span>
             </div>
          </div>
        </div>
        
        {/* Filtros */}
        <div className="flex items-center justify-between mb-4">
           <div className="flex gap-2">
             {['Todos', 'Ativos', 'Pausa', 'Alta'].map(f => (
               <div key={f} className={`placeholder-box rounded-full h-10 px-6 ${f === 'Todos' ? 'bg-gray-800 border-gray-900 border-solid' : 'rounded-full'}`}>
                 <span className={`font-bold text-xs uppercase tracking-wider ${f === 'Todos' ? 'text-white' : 'text-gray-400'}`}>Aba: {f}</span>
               </div>
             ))}
           </div>
           <div className="placeholder-box rounded-lg h-8 px-4 border-none bg-transparent">
             <span className="font-bold text-gray-400 text-sm">Contador de Pacientes</span>
           </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
           {[1, 2, 3, 4, 5].map(card => (
             <div key={card} className="bg-white rounded-[24px] p-6 shadow-soft border border-[#EBE5E0]/50 h-[300px] flex flex-col justify-between">
                <div>
                   <div className="flex items-center gap-4 mb-6 placeholder-box rounded-xl h-20 border-none bg-gray-50">
                      <div className="size-14 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center shrink-0">
                        <span className="text-[10px] text-gray-400 font-bold">Avatar</span>
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-bold text-gray-400 uppercase">Nome do Paciente</span>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">Status Inline</span>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                     <div className="placeholder-box rounded-lg h-16">
                       <span className="text-[10px] font-bold text-gray-400 uppercase">Última Sessão</span>
                     </div>
                     <div className="placeholder-box rounded-lg h-16">
                       <span className="text-[10px] font-bold text-gray-400 uppercase">Próxima Sessão</span>
                     </div>
                   </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-[#EBE5E0] flex items-center justify-between">
                   <div className="flex gap-2">
                     <div className="size-8 placeholder-box rounded-lg border-none bg-gray-100">
                       <span className="material-symbols-outlined text-sm text-gray-400">clinical_notes</span>
                     </div>
                     <div className="size-8 placeholder-box rounded-lg border-none bg-gray-100">
                       <span className="material-symbols-outlined text-sm text-gray-400">chat_bubble</span>
                     </div>
                   </div>
                   <div className="placeholder-box rounded-lg h-8 px-3 border-none bg-transparent flex flex-row items-center gap-1">
                      <span className="text-xs font-bold text-primary uppercase">Ver Perfil</span>
                      <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
                   </div>
                </div>
             </div>
           ))}
           
           {/* Card Adicionar Novo */}
           <div className="placeholder-box rounded-[24px] border-2 border-dashed border-[#E5E0DC] flex flex-col justify-center items-center h-[300px] bg-[#FAF6F3]/50">
             <div className="size-16 rounded-full bg-white flex items-center justify-center text-primary mb-4 shadow-sm">
               <span className="material-symbols-outlined text-3xl">add</span>
             </div>
             <span className="text-lg font-bold text-text-main font-serif">Adicionar Novo</span>
             <span className="text-xs text-text-muted mt-2 text-center">Espaço para card vazio</span>
           </div>
        </div>
        
      </div>
    </main>
  );
}
