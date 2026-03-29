import { Routes, Route, Link } from 'react-router-dom';

// Páginas Originais
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

// Novas páginas estruturadas via Wireframe
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import PatientDashboard from './pages/PatientDashboard/PatientDashboard';
import PsychoDashboard from './pages/PsychoDashboard/PsychoDashboard';
import PatientsList from './pages/PatientsList/PatientsList';
import Notes from './pages/Notes/Notes';
import PatientProfile from './pages/PatientProfile/PatientProfile';

function NavigationHelper() {
  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 shadow-xl border border-gray-200 rounded-lg text-xs flex flex-col gap-2 z-50">
      <strong className="text-primary mb-1">Navegação Temporária:</strong>
      <Link to="/login" className="text-blue-500 hover:underline">1. Tela de Login</Link>
      <Link to="/cadastro" className="text-blue-500 hover:underline">1.5. Tela de Cadastro</Link>
      <Link to="/recuperar-senha" className="text-blue-500 hover:underline">1.6. Recuperar Senha</Link>
      <Link to="/paciente" className="text-blue-500 hover:underline">2. Dashboard Paciente</Link>
      <Link to="/psicologo" className="text-blue-500 hover:underline">3. Dashboard Psicólogo</Link>
      <Link to="/psicologo/pacientes" className="text-blue-500 hover:underline">4. Lista de Pacientes</Link>
      <Link to="/psicologo/anotacoes" className="text-blue-500 hover:underline">5. Anotações (Geral)</Link>
      <Link to="/psicologo/paciente/1" className="text-blue-500 hover:underline">6. Anotações (Por Paciente)</Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-exemplo" element={<Dashboard />} />
        
        {/* Rotas Baseadas na Imagem/Wireframe */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/paciente" element={<PatientDashboard />} />
        <Route path="/psicologo" element={<PsychoDashboard />} />
        <Route path="/psicologo/pacientes" element={<PatientsList />} />
        <Route path="/psicologo/anotacoes" element={<Notes />} />
        <Route path="/psicologo/paciente/:id" element={<PatientProfile />} />
      </Routes>
      
      {/* Helper persistente na tela para você poder transitar entre os protótipos */}
      <NavigationHelper />
    </>
  );
}
