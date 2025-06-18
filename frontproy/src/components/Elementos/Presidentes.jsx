import React, { useState, useEffect } from 'react';
import './Presidentes.css';
import { useNavigate } from 'react-router-dom';

export default function Presidentes() {
  const navigate = useNavigate();
  const [presidentes, setPresidentes] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [indiceSeccion, setIndiceSeccion] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/presidentes/')
      .then(res => res.json())
      .then(data => setPresidentes(data))
      .catch(error => console.error('Error cargando presidentes:', error));
  }, []);

  const volverAlMenu = () => navigate('/MenuUsuario');

  const abrirSeccion = (index) => {
    setIndiceSeccion(index);
    setSeccionActiva(seleccionado?.secciones[index]);
  };

  const cambiarSeccion = (dir) => {
    const nuevoIndice = indiceSeccion + dir;
    if (nuevoIndice >= 0 && nuevoIndice < seleccionado.secciones.length) {
      setIndiceSeccion(nuevoIndice);
      setSeccionActiva(seleccionado.secciones[nuevoIndice]);
    }
  };

  const cerrarTodo = () => {
    setSeleccionado(null);
    setSeccionActiva(null);
    setIndiceSeccion(0);
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
            <img src={presidente.img} alt={presidente.nombre} className="imagen" />
            <p className="nombre">{presidente.nombre}</p>
          </div>
        ))}
      </div>

      {seleccionado && !seccionActiva && (
        <div className="overlay" onClick={cerrarTodo}>
          <div className="info-pres" onClick={(e) => e.stopPropagation()}>
            <h2>{seleccionado.nombre}</h2>
            <p className="intro">{seleccionado.descripcion}</p>
            <div className="botones-info">
              {seleccionado.secciones.map((sec, idx) => (
                <button key={idx} onClick={() => abrirSeccion(idx)}>{sec.titulo}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {seccionActiva && (
        <div className="overlay" onClick={cerrarTodo}>
          <div className="info-pres" onClick={(e) => e.stopPropagation()}>
            <h2>{seccionActiva.titulo}</h2>
            <ul className="lista-info">
              {seccionActiva.contenido.map((punto, i) => (
                <li key={i}>{punto.texto}</li>
              ))}
            </ul>
            <div className="nav-secciones">
              <button onClick={() => cambiarSeccion(-1)} disabled={indiceSeccion === 0}>⏪</button>
              <button onClick={() => cambiarSeccion(1)} disabled={indiceSeccion === seleccionado.secciones.length - 1}>⏩</button>
            </div>
          </div>
        </div>
      )}

      <button className="boton-volver" onClick={volverAlMenu}>Volver al Menú</button>
    </div>
  );
}
