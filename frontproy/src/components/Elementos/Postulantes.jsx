import React, { useState, useEffect } from 'react';
import './Postulantes.css';

const Postulantes = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [activo, setActivo] = useState(null);
  const [indexActivo, setIndexActivo] = useState(0);
  const [seccionActiva, setSeccionActiva] = useState('biografia');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/postulantes/")
      .then(res => res.json())
      .then(data => setPostulantes(data));
  }, []);

  const abrirModal = (postulante, index) => {
    setActivo(postulante);
    setIndexActivo(index);
    setSeccionActiva('biografia'); // Reiniciar sección
  };

  const cerrarModal = () => setActivo(null);

  const siguiente = () => {
    const siguienteIndex = (indexActivo + 1) % postulantes.length;
    setActivo(postulantes[siguienteIndex]);
    setIndexActivo(siguienteIndex);
    setSeccionActiva('biografia');
  };

  const anterior = () => {
    const anteriorIndex = (indexActivo - 1 + postulantes.length) % postulantes.length;
    setActivo(postulantes[anteriorIndex]);
    setIndexActivo(anteriorIndex);
    setSeccionActiva('biografia');
  };

  return (
    <div className="postulantes-contenedor">
      <h2 className="titulo">Papeleta de Postulantes</h2>

      <div className="postulantes-scroll-wrapper">
        <div className="papeleta-grid">
          {postulantes.map((p, i) => (
            <div key={p.id} className="casilla-papeleta" onClick={() => abrirModal(p, i)}>
              {p.imagen && <img src={p.imagen} alt={p.nombre} />}
              <p className="nombre">{p.nombre} {p.apellido}</p>
              <span className="partido">{p.nombre_partido || `Partido #${p.partido}`}</span>
            </div>
          ))}
        </div>
      </div>

      {activo && (
        <div className="modal-fondo" onClick={cerrarModal}>
          <div className="modal-panel" onClick={e => e.stopPropagation()}>
            {activo.imagen && <img src={activo.imagen} alt={activo.nombre} className="imagen-modal" />}
            <h3>{activo.nombre} {activo.apellido}</h3>
            <p className="partido-nombre">Partido: <strong>{activo.nombre_partido || `#${activo.partido}`}</strong></p>

            <div className="secciones-botones">
              <button onClick={() => setSeccionActiva('biografia')}>Biografía</button>
              <button onClick={() => setSeccionActiva('propuestas')}>Propuestas</button>
              <button onClick={() => setSeccionActiva('criticas')}>Críticas</button>
              <button onClick={() => setSeccionActiva('logros')}>Logros</button>
              <button onClick={() => setSeccionActiva('historia')}>Historia</button>
            </div>

            {seccionActiva === 'biografia' && (
              <p className="seccion-texto"><strong>Biografía:</strong> {activo.biografia}</p>
            )}
            {seccionActiva === 'propuestas' && (
              <p className="seccion-texto"><strong>Propuestas:</strong> {activo.propuestas}</p>
            )}
            {seccionActiva === 'criticas' && (
              <p className="seccion-texto"><strong>Críticas:</strong> {activo.criticas}</p>
            )}
            {seccionActiva === 'logros' && (
              <p className="seccion-texto"><strong>Logros:</strong> {activo.logros}</p>
            )}
            {seccionActiva === 'historia' && (
              <p className="seccion-texto"><strong>Historia:</strong> {activo.historia}</p>
            )}

            <div className="controles-navegacion">
              <button onClick={anterior}>← Anterior</button>
              <button onClick={siguiente}>Siguiente →</button>
            </div>
            <button className="cerrar" onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postulantes;
