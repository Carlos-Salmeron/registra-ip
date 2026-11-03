import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoCreador, setTipoCreador] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación de campos vacíos
    if (!nombre || !correo || !tipoCreador) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validación básica de correo
    if (!correo.includes('@')) {
      setError('El correo debe ser válido.');
      return;
    }

    // Guardar en localStorage si todo está bien
    setError('');
    const datosUsuario = { nombre, correo, tipoCreador };
    localStorage.setItem('registraIpUsuario', JSON.stringify(datosUsuario));
    
    // Redirigir al dashboard
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Registro de Creador</h2>
      
      {/* Contenedor de errores accesible */}
      <div aria-live="polite" style={{ color: 'red', marginBottom: '10px' }}>
        {error}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <label>Correo:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <label>Tipo de creador:</label>
          <select 
            value={tipoCreador} 
            onChange={(e) => setTipoCreador(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Selecciona una opción</option>
            <option value="Diseñador">Diseñador</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Escritor">Escritor</option>
            <option value="Cineasta">Cineasta</option>
          </select>
        </div>
        
        <button type="submit" style={{ padding: '10px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
}