import React from 'react';
import { AgendaSidebar, AgendaMainArea } from './PatientsListElements';
import './PatientsList.css';

export default function PatientsList() {
  return (
    <div className="agenda-container">
      <div className="paper-texture" />
      <AgendaSidebar />
      <AgendaMainArea />
    </div>
  );
}
