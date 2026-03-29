import { useState } from 'react';

export function usePsychoDashboardLogic() {
  const [appointments] = useState([]);
  const [requests] = useState([]);

  return { appointments, requests };
}
