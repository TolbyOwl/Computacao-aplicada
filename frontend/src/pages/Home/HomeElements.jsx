import React from 'react';

export function HomeHeader({ title }) {
  return (
    <header className="home-header">
      <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white mb-4 shadow-soft">
        <span className="material-symbols-outlined text-4xl">spa</span>
      </div>
      <h1 className="text-4xl font-serif text-text-main font-bold mb-3">{title}</h1>
    </header>
  );
}

export function HomeHero({ onStart }) {
  return (
    <div className="home-hero">
      <p className="text-text-muted max-w-lg mb-8 text-lg">
        Ambiente limpo, estruturado e configurado. 
        As páginas e componentes estão divididos em Lógica, Elementos Visuais e Estilo.
      </p>
      <button className="btn-primary group" onClick={onStart}>
        Abrir Dashboard 
        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
      </button>
    </div>
  );
}
