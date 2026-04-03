import React from 'react';

export function RegisterImage() {
  return (
    <div className="login-image">
      <div className="w-full h-full flex flex-col items-center justify-center text-white/50 border-4 border-dashed border-white/20 rounded-[20px] m-6">
        <span className="material-symbols-outlined text-6xl mb-2">image</span>
        <span className="font-bold tracking-widest uppercase text-center">Espaço para Imagem<br/>Exclusiva Cadastro</span>
      </div>
    </div>
  );
}

export function RegisterForm() {
  return (
    <div className="login-form-area flex flex-col gap-6 w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-serif font-bold text-text-main mb-2">Criar Nova Conta</h2>
        <p className="text-sm text-text-muted">Junte-se ao Acolhimento</p>
      </div>

      <div className="w-full flex flex-col gap-4 border-2 border-dashed border-gray-300 p-6 rounded-[24px]">
        <span className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider mb-2">Formulário de Cadastro</span>
        
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Nome Completo</div>
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Email</div>
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Senha</div>
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Confirmação de Senha</div>
        
        <div className="w-full h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold mt-4">
          Botão Criar Conta
        </div>
      </div>
      
      <div className="text-center text-sm font-bold text-gray-400">
         Link: Já tenho uma conta
      </div>
    </div>
  );
}
