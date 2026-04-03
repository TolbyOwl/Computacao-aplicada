import { useState } from 'react';

export function usePatientDashboardLogic() {
  const [nextSession] = useState(null);
  return { nextSession };
}
