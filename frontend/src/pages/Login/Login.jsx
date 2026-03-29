import React from 'react';
import { useLoginLogic } from './LoginLogic';
import { LoginImage, LoginForm } from './LoginElements';
import './Login.css';

export default function Login() {
  const { activeTab, setActiveTab, handleLogin } = useLoginLogic();

  return (
    <div className="login-container relative">
      <div className="paper-texture" />
      <div className="login-card">
        <LoginImage />
        <LoginForm 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onSubmit={handleLogin} 
        />
      </div>
    </div>
  );
}
