import React from 'react';
import { useDashboardLogic } from './DashboardLogic';
import { DashboardHeader, DashboardContent } from './DashboardElements';
import './Dashboard.css';

export default function Dashboard() {
  // Toda a lógica concentrada no hook
  const { user, handleLogout } = useDashboardLogic();

  // Apenas composição de elementos JSX abaixo
  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <DashboardContent />
    </div>
  );
}
