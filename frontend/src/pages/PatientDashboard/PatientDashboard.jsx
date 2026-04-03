import React from 'react';
import { usePatientDashboardLogic } from './PatientDashboardLogic';
import { PatientHeader, NextSessionCard, InfoBlocks, MoodSection } from './PatientDashboardElements';
import './PatientDashboard.css';

export default function PatientDashboard() {
  const { nextSession } = usePatientDashboardLogic();

  return (
    <div className="patient-dashboard-container relative">
      <div className="paper-texture" />
      <div className="patient-dashboard-content">
        <PatientHeader />
        <NextSessionCard nextSession={nextSession} />
        <InfoBlocks />
        <MoodSection />
      </div>
    </div>
  );
}
