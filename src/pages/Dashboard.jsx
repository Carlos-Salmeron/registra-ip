import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Recuperar los datos guardados en el registro
  const usuarioGuardado = localStorage.getItem('registraIpUsuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  const handleCerrarSesion = () => {
    localStorage.removeItem('registraIpUsuario');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Panel Principal</h2>
      {usuario ? (
        <div>
          <p>¡Bienvenido, <strong>{usuario.nombre}</strong>!</p>
          <p>Rol: {usuario.tipoCreador}</p>
          <p>Correo: {usuario.correo}</p>
        </div>
      ) : (
        <p>No hay usuario activo.</p>
      )}

      <button
        onClick={() => navigate('/registrar-obra')}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '15px' }}
      >
        Ir a Registrar Obra
      </button>
      
      <button 
        onClick={handleCerrarSesion}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--text-color)', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}