import React from 'react';
import { usePsychoDashboardLogic } from './PsychoDashboardLogic';
import { PsychoSidebar, PsychoMainArea, PsychoRightPanel } from './PsychoDashboardElements';
import './PsychoDashboard.css';

export default function PsychoDashboard() {
  const { appointments, requests } = usePsychoDashboardLogic();

  return (
    <div className="psycho-dashboard-container relative">
      <div className="paper-texture" />
      <PsychoSidebar />
      <PsychoMainArea appointments={appointments} />
      <PsychoRightPanel requests={requests} />
    </div>
  );
}
