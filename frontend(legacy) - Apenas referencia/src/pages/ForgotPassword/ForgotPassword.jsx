import React from 'react';
import { ForgotPasswordImage, ForgotPasswordForm } from './ForgotPasswordElements';
import '../Login/Login.css';

export default function ForgotPassword() {
  return (
    <div className="login-container relative">
      <div className="paper-texture" />
      <div className="login-card">
        <ForgotPasswordImage />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
