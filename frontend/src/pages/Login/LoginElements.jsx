import React from 'react';

export function LoginImage() {
  return (
    <div className="login-image">
      <div className="w-full h-full flex flex-col items-center justify-center text-white/50 border-4 border-dashed border-white/20 rounded-[20px] m-6">
        <span className="material-symbols-outlined text-6xl mb-2">image</span>
        <span className="font-bold tracking-widest uppercase">Espaço para Imagem</span>
      </div>
    </div>
  );
}

export function LoginForm({ activeTab, setActiveTab }) {
  return (
    <div className="login-form-area flex flex-col gap-6">
      {/* Tabs Placeholder */}
      <div className="flex gap-2 p-2 bg-gray-100 rounded-xl w-full max-w-sm border-2 border-dashed border-gray-300">
        <div className="flex-1 py-3 text-center text-sm font-bold text-gray-400">Aba Paciente</div>
        <div className="flex-1 py-3 text-center text-sm font-bold text-gray-400">Aba Psicólogo</div>
      </div>
      
      {/* Form Placeholder */}
      <div className="w-full max-w-sm flex flex-col gap-4 border-2 border-dashed border-gray-300 p-6 rounded-[24px]">
        <span className="text-center font-bold text-gray-400 uppercase text-xs tracking-wider mb-2">Formulário de Login</span>
        
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Email</div>
        <div className="w-full h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">Campo Senha</div>
        
        <div className="flex justify-between w-full">
          <div className="w-24 h-4 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">Checkbox</div>
          <div className="w-24 h-4 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-400">Esqueci a Senha</div>
        </div>
        
        <div className="w-full h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold mt-4">
          Botão Entrar
        </div>
      </div>
    </div>
  );
}
