import React, { useState, useEffect } from 'react';
import './Presidentes.css';
import { useNavigate } from 'react-router-dom';

export default function Presidentes() {
  const navigate = useNavigate();
  const [presidentes, setPresidentes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [panel, setPanel] = useState('');
  const secciones = ['partido', 'logros', 'criticas', 'bibliografia', 'despues'];
  const [indicePanel, setIndicePanel] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/presidentes/')
      .then(res => res.json())
      .then(data => setPresidentes(data))
      .catch(error => console.error('Error cargando presidentes:', error));
  }, []);

  const volverAlMenu = () => navigate('/MenuUsuario');
  const cerrarTodo = () => {
    setSeleccionado(null);
    setPanel('');
  };

  const abrirPanel = (tipo) => {
    setPanel(tipo);
    setIndicePanel(secciones.indexOf(tipo));
  };

  const avanzarPanel = () => {
    const nuevoIndice = (indicePanel + 1) % secciones.length;
    setIndicePanel(nuevoIndice);
    setPanel(secciones[nuevoIndice]);
  };

  const retrocederPanel = () => {
    const nuevoIndice = (indicePanel - 1 + secciones.length) % secciones.length;
    setIndicePanel(nuevoIndice);
    setPanel(secciones[nuevoIndice]);
  };

  const renderContenido = () => {
    if (!seleccionado || !panel) return null;

    const titulos = {
      partido: "¿Qué hizo en su partido?",
      logros: "Logros",
      criticas: "Críticas",
      bibliografia: "Bibliografía",
      despues: "¿Qué hizo después?"
    };

    const contenido = seleccionado[{
      partido: 'que_hizo_en_su_partido',
      logros: 'logros',
      criticas: 'criticas',
      bibliografia: 'bibliografia',
      despues: 'despues_de_la_presidencia'
    }[panel]];

    return (
      <div className="overlay" onClick={cerrarTodo}>
        <div className="info-pres" onClick={e => e.stopPropagation()}>
          <h2>{seleccionado.nombre}</h2>
          <h3>{titulos[panel]}</h3>
          <p>{contenido || 'No hay información disponible.'}</p>
          <div className="nav-secciones">
            <button onClick={retrocederPanel}>← Anterior</button>
            <button onClick={avanzarPanel}>Siguiente →</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="presidentes-container">
      <h1 className="titulo">El que no conoce su historia está condenado a repetirla</h1>

      <div className="galeria-president">
        {presidentes.map((presidente, index) => (
          <div
            key={index}
            className="presidente-card"
            onClick={() => setSeleccionado(presidente)}
          >
            {presidente.img ? (
              <img src={presidente.img} alt={presidente.nombre} className="imagen" />
            ) : (
              <div className="imagen-placeholder">Sin imagen</div>
            )}
            <p className="nombre">{presidente.nombre}</p>
          </div>
        ))}
      </div>

      {seleccionado && !panel && (
        <div className="overlay" onClick={cerrarTodo}>
          <div className="info-pres" onClick={(e) => e.stopPropagation()}>
            <h2>{seleccionado.nombre}</h2>
            <p>{seleccionado.descripcion}</p>
            <div className="botones-info">
              <button onClick={() => abrirPanel('partido')}>¿Qué hizo en su partido?</button>
              <button onClick={() => abrirPanel('logros')}>Logros</button>
              <button onClick={() => abrirPanel('criticas')}>Críticas</button>
              <button onClick={() => abrirPanel('bibliografia')}>Bibliografía</button>
              <button onClick={() => abrirPanel('despues')}>¿Qué hizo después?</button>
            </div>
          </div>
        </div>
      )}

      {panel && renderContenido()}

      <button className="boton-volver" onClick={volverAlMenu}>Volver al Menú</button>
    </div>
  );
}
