import React from 'react';

export function ForgotPasswordImage() {
  return (
    <div className="login-image">
      <div className="w-full h-full flex flex-col items-center justify-center text-white/50 border-4 border-dashed border-white/20 rounded-[20px] m-6">
        <span className="material-symbols-outlined text-6xl mb-2">lock_reset</span>
        <span className="font-bold tracking-widest uppercase text-center">Espaço para Imagem<br/>Recuperação de Senha</span>
      </div>
    </div>
  );
}

export function ForgotPasswordForm() {
  return (
    <div className="login-form-area flex flex-col gap-6 w-full max-w-sm justify-center">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-serif font-bold text-text-main mb-2">Recuperar Senha</h2>
        <p className="text-sm text-text-muted">Enviaremos as instruções para seu email.</p>
      </div>

      <div className="w-full flex flex-col gap-4 border-2 border-dashed border-gray-300 p-6 rounded-[24px]">
        <span className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider mb-2">Formulário de Recuperação</span>
        
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Email de Recuperação</div>
        
        <div className="w-full h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold mt-4">
          Botão Enviar Instruções
        </div>
      </div>
      
      <div className="text-center text-sm font-bold text-gray-400">
         Link: Voltar para o Login
      </div>
    </div>
  );
}
