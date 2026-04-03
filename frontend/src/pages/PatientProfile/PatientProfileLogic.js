import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function usePatientProfileLogic() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('anotacao'); // anotacao | consulta | proxima
  const [patientData] = useState({
    name: `Paciente ${id || '01'}`,
    info: 'Informações detalhadas do paciente...',
    progress: 'Evolução registrada...',
  });

  return { activeTab, setActiveTab, patientData };
}
