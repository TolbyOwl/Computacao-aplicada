import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useHomeLogic() {
  const [title] = useState('Sistema Acolhimento Definitivo');
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return { title, handleStart };
}
