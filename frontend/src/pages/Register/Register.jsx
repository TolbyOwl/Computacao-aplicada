import React from 'react';
import { RegisterImage, RegisterForm } from './RegisterElements';
import '../Login/Login.css';

export default function Register() {
  return (
    <div className="login-container relative">
      <div className="paper-texture" />
      <div className="login-card">
        <RegisterImage />
        <RegisterForm />
      </div>
    </div>
  );
}
