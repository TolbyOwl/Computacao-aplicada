import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useDashboardLogic() {
  const [user] = useState({ name: 'Administrador' });
  const navigate = useNavigate();

  const handleLogout = () => {
    // Exemplo de lógica de saída
    navigate('/');
  };

  return { user, handleLogout };
}
