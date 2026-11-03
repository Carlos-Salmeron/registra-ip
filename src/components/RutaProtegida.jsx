import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  const usuarioGuardado = localStorage.getItem('registraIpUsuario');
  
  if (!usuarioGuardado) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}