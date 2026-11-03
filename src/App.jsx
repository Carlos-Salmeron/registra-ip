import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
import Registro from './pages/Registro';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta principal pública: El registro */}
          <Route path="/" element={<Registro />} />
          
          {/* Ruta protegida: El panel principal */}
          <Route 
            path="/dashboard" 
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;