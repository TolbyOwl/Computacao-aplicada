import React from 'react';

export function DashboardHeader({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl text-primary">dashboard</span>
        <h1 className="text-2xl font-serif font-bold text-text-main">
          Bem-vindo, {user.name}
        </h1>
      </div>
      <button className="btn-outline" onClick={onLogout}>
        <span className="material-symbols-outlined text-sm">logout</span>
        Sair
      </button>
    </header>
  );
}

export function DashboardContent() {
  return (
    <section className="dashboard-content">
      <div className="card-soft p-8 text-center flex flex-col items-center">
        <span className="material-symbols-outlined text-5xl text-text-muted/50 mb-4 block">construction</span>
        <h2 className="text-lg font-bold text-text-main mb-2">Área de Trabalho</h2>
        <p className="text-sm text-text-muted">
          Este ambiente está organizado perfeitamente. Coloque os elementos menores no <code>DashboardElements.jsx</code> e a lógica no <code>DashboardLogic.js</code>.
        </p>
      </div>
    </section>
  );
}
