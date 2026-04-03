import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLoginLogic() {
  const [activeTab, setActiveTab] = useState('paciente'); // paciente | psicologo
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (activeTab === 'paciente') navigate('/paciente');
    else navigate('/psicologo');
  };

  return { activeTab, setActiveTab, handleLogin };
}
