import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import RegistrarObra from './pages/RegistrarObra';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta pública: Registro */}
          <Route path="/" element={<Registro />} />
          
          {/* Ruta protegida: Panel Principal */}
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } 
          />

          {/* Ruta del Wizard de Registro de Obra */}
          <Route path="/registrar-obra" element={<RegistrarObra />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;