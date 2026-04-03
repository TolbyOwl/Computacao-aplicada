import { useState } from 'react';

export function usePatientsListLogic() {
  const [patients] = useState([
    { id: '1', name: 'Ana Clara Silva', status: 'Em Acompanhamento', statusColor: 'accent', nextSession: 'Hoje', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-RhXAUKnOlCgmkKCd_Jd-qWhCXk5d0vLxeww6sSGt-6uj6SgTYoKN0uj1c1lt41ZQntvH9uJ-6MXlirNeFJk8c9eznpVf22lzn6hiNZ3df2ZDj8i-7rT_DGvEWkaJy7i5WJ4xbPRMHRzudaz82w_xyRxzw75trrbQNJ_j3iHn6Z8db3NSFwzN766frpyh9GISlA7iqTvHISYZGsUuypey1SMxot5MYdb1jaQK8f2-15iCEIBMBuiHMcmJKwqc_L1vF7flm_DbaWc' },
    { id: '2', name: 'Carlos Mendes', status: 'Em Pausa', statusColor: 'warning', nextSession: '15 Nov', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_Xwr9HD-d5pdZMsZf6oqjrti3nbZGAZG87XiGE1aCm45lZCIzfwgG0i722GMi7dmddQtBvXAmUgqaGCxZsiLQ9-ew6QuLam84uU_zbS-uQOYrJcu1GphJmHy7T-lGJKqeczlaXzTeze9X0Z3C-X0iQzr5GiC6gYFUZMdhwapwvSYBdJ_y_toNeL8avidbrNFkQejsJRCtvdlBIrMw50rYAiBgavIkOn1wwnGhjtZ_hycVqzNdCHE0MrqLg1QsSu1oDNFhmlDMQK8' },
    { id: '3', name: 'João Pereira', status: 'Alta Clínica', statusColor: 'gray', nextSession: '-', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyQlj74y-l8WEoAT4I1HLKvlwvcezJ-xr7K4-8cpG7Z4eXOTHZ-EwbtVmLJmjyNfwkCJAbydQ-8VsJdtoP2TE9B547HuzPz7wgkPzyFPU9qGZTbiJ8s5Zcq4HLH8ICVCBdjznCMA4K2HS63hem0YbrZDEa4fVxGztX7JlUzfP9hJJjCsYKXHYi8x_RdgUAdWUqsYS2UcsiqNPSgttq-MclHh8u_SH3g-7huP_sEQ-7JwIP0rpvClmW5_bCDkWGjjvpCpQWwFJf36c' },
    { id: '4', name: 'Beatriz Souza', status: 'Em Acompanhamento', statusColor: 'accent', nextSession: 'Amanhã', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjOi97YZp7ciRT3q5xfMd7e5r0QROhCVzU3rwlP387m6ceVHZO2gpUSdY_zxD88LP83qL6nM-S8s8d9Q6x3T7IgjxFXVKqE9o-X10qG1YUSCKTHBMedTwjJbPIrzXd8EkjVx8AC65W5OJUyfTeWRquU0Y6qcRTj1CIQH4HuumKp0qf9xYll9JoVDI06wIxRWPZ3glUvSfX6xhptwEDIcsOKLGjbx21-8XD2tf52Nt8R-BYJ82OrFqSSczwaNHEQuRTFLB-QNgx9VI' },
  ]);

  return { patients };
}
