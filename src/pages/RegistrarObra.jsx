import React, { useState } from 'react';

export default function RegistrarObra() {
  const [paso, setPaso] = useState(1);
  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [autor, setAutor] = useState('');
  const [folioGenerado, setFolioGenerado] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // Validaciones por paso según la rúbrica
  const esPaso1Valido = archivo !== null;
  const esPaso2Valido = titulo.trim().length >= 5 && categoria !== '';

  const handleSiguiente = () => {
    if (paso === 1 && esPaso1Valido) setPaso(2);
    else if (paso === 2 && esPaso2Valido) setPaso(3);
    else if (paso === 3) setPaso(4);
  };

  const handleAtras = () => {
    if (paso > 1) setPaso(paso - 1);
  };

  const handleConfirmarRegistro = async () => {
    // Simular o generar folio con el formato requerido: OBRA-0733-###
    const numeroAleatorio = Math.floor(Math.random() * 900) + 100;
    const folioFinal = `OBRA-0733-${numeroAleatorio}`;
    setFolioGenerado(folioFinal);

    const formData = new FormData();
    formData.append('folio', folioFinal);
    formData.append('titulo', titulo);
    formData.append('categoria', categoria);
    formData.append('descripcion', descripcion);
    formData.append('autor', autor);
    if (archivo) {
      formData.append('archivo', archivo);
    }

    try {
      const respuesta = await fetch('http://localhost:4000/obras', {
        method: 'POST',
        body: formData,
      });

      if (respuesta.ok) {
        setMensajeExito(`¡Obra registrada con éxito! Folio generado: ${folioFinal}`);
      } else {
        setMensajeExito('Error al guardar en el servidor backend.');
      }
    } catch (error) {
      setMensajeExito('Error de conexión con el servidor en el puerto 4000.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Wizard de Registro de Obra</h2>

     {/* Barra de progreso visual */}
<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
  <span style={{ fontWeight: paso === 1 ? 'bold' : 'normal', color: paso === 1 ? '#600733' : '#333' }}>Paso 1</span>
  <span style={{ fontWeight: paso === 2 ? 'bold' : 'normal', color: paso === 2 ? '#600733' : '#333' }}>Paso 2</span>
  <span style={{ fontWeight: paso === 3 ? 'bold' : 'normal', color: paso === 3 ? '#600733' : '#333' }}>Paso 3</span>
  <span style={{ fontWeight: paso === 4 ? 'bold' : 'normal', color: paso === 4 ? '#600733' : '#333' }}>Paso 4</span>
</div>

      <hr style={{ marginBottom: '20px' }} />

      {/* PASO 1: Subir archivo */}
      {paso === 1 && (
        <div>
          <h3>Paso 1: Seleccionar Archivo de la Obra</h3>
          <input 
            type="file" 
            onChange={(e) => setArchivo(e.target.files[0])} 
            style={{ margin: '20px 0' }}
          />
          {!esPaso1Valido && <p style={{ color: 'red', fontSize: '0.9rem' }}>Debe seleccionar un archivo para continuar.</p>}
        </div>
      )}

      {/* PASO 2: Metadatos */}
      {paso === 2 && (
        <div>
          <h3>Paso 2: Metadatos de la Obra</h3>
          <div style={{ marginBottom: '15px' }}>
            <label>Título (Mínimo 5 caracteres):</label><br />
            <input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Categoría:</label><br />
            <select 
              value={categoria} 
              onChange={(e) => setCategoria(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Infraestructura Urbana">Infraestructura Urbana</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Descripción:</label><br />
            <textarea 
              value={descripcion} 
              onChange={(e) => setDescripcion(e.target.value)} 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Autor:</label><br />
            <input 
              type="text" 
              value={autor} 
              onChange={(e) => setAutor(e.target.value)} 
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          {!esPaso2Valido && <p style={{ color: 'red', fontSize: '0.9rem' }}>El título debe tener al menos 5 caracteres y debe seleccionar una categoría.</p>}
        </div>
      )}

      {/* PASO 3: Vista Previa */}
      {paso === 3 && (
        <div>
          <h3>Paso 3: Vista Previa del Registro</h3>
          <p><strong>Archivo seleccionado:</strong> {archivo ? archivo.name : 'Ninguno'}</p>
          <p><strong>Título:</strong> {titulo}</p>
          <p><strong>Categoría:</strong> {categoria}</p>
          <p><strong>Descripción:</strong> {descripcion}</p>
          <p><strong>Autor:</strong> {autor}</p>
          <p style={{ color: '#600733', marginTop: '10px' }}>Verifique que los datos sean correctos antes de confirmar.</p>
        </div>
      )}

      {/* PASO 4: Confirmación */}
      {paso === 4 && (
        <div>
          <h3>Paso 4: Confirmar Envío</h3>
          {mensajeExito ? (
            <div>
              <p style={{ color: 'green', fontWeight: 'bold' }}>{mensajeExito}</p>
            </div>
          ) : (
            <div>
              <p>Presione el botón para enviar los datos y guardar la obra en el servidor backend.</p>
              <button 
                onClick={handleConfirmarRegistro}
                style={{ padding: '10px 20px', backgroundColor: '#600733', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
              >
                Confirmar y Guardar Obra
              </button>
            </div>
          )}
        </div>
      )}

      {/* Botones de navegación */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        {paso > 1 && paso < 4 && (
          <button onClick={handleAtras} style={{ padding: '8px 15px', cursor: 'pointer' }}>
            Atrás
          </button>
        )}
        {paso < 3 && (
          <button 
            onClick={handleSiguiente} 
            disabled={(paso === 1 && !esPaso1Valido) || (paso === 2 && !esPaso2Valido)}
            style={{ 
              padding: '8px 15px', 
              backgroundColor: ((paso === 1 && !esPaso1Valido) || (paso === 2 && !esPaso2Valido)) ? '#ccc' : '#600733', 
              color: 'white', 
              border: 'none', 
              cursor: ((paso === 1 && !esPaso1Valido) || (paso === 2 && !esPaso2Valido)) ? 'not-allowed' : 'pointer',
              marginLeft: 'auto'
            }}
          >
            Siguiente
          </button>
        )}
        {paso === 3 && (
          <button 
            onClick={handleSiguiente} 
            style={{ padding: '8px 15px', backgroundColor: '#600733', color: 'white', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}
          >
            Ir a Confirmación
          </button>
        )}
      </div>
    </div>
  );
}