import React from 'react';
import { usePatientProfileLogic } from './PatientProfileLogic';
import { ProfileSidebar, ProfileMainArea } from './PatientProfileElements';
import './PatientProfile.css';

export default function PatientProfile() {
  const { activeTab, setActiveTab, patientData } = usePatientProfileLogic();

  return (
    <div className="profile-container relative">
      <div className="paper-texture" />
      <ProfileSidebar patientData={patientData} />
      <ProfileMainArea activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
