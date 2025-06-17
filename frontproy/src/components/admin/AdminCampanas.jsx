import React, { useEffect, useState } from 'react';
import llamados from '../../servicios/llamados';
import './Admin.css';

const AdminCampañas = () => {
  const [campanas, setCampanas] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroPartido, setFiltroPartido] = useState('');
  const [paginaActual, setPaginaActual] = useState(0);
  const porPagina = 5;

  useEffect(() => {
    obtenerCampanas();
    obtenerPartidos();
  }, []);

  const obtenerCampanas = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/campanas/');
    const data = await res.json();
    setCampanas(data);
  };

  const obtenerPartidos = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/partidos/');
    const data = await res.json();
    setPartidos(data);
  };

  const guardarCampana = async (e) => {
    e.preventDefault();
    const obj = {
      nombre_campaña: nombre,
      descripcion,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,
      partido: partidoId,
    };

    try {
      if (editandoId) {
        await fetch(`http://127.0.0.1:8000/api/campanas/${editandoId}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });
      } else {
        await llamados.postData(obj, 'campanas');
      }

      obtenerCampanas();
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar campaña:', error);
    }
  };

  const eliminarCampana = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/campanas/${id}/`, {
        method: 'DELETE',
      });
      obtenerCampanas();
    } catch (error) {
      console.error('Error al eliminar campaña:', error);
    }
  };

  const cargarEdicion = (c) => {
    setNombre(c.nombre_campaña);
    setDescripcion(c.descripcion);
    setFechaInicio(c.fecha_inicio);
    setFechaFin(c.fecha_fin);
    setPartidoId(c.partido);
    setEditandoId(c.id);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setFechaInicio('');
    setFechaFin('');
    setPartidoId('');
    setEditandoId(null);
  };

  const filtrarCampanas = () => {
    let filtradas = [...campanas];

    if (filtroNombre.trim() !== '') {
      filtradas = filtradas.filter(c =>
        c.nombre_campaña.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }

    if (filtroPartido !== '') {
      filtradas = filtradas.filter(c => c.partido === parseInt(filtroPartido));
    }

    return filtradas;
  };

  const campanasFiltradas = filtrarCampanas();

  return (
    <div className="admin-box">
      <h3>Administrar Campañas</h3>

      <form onSubmit={guardarCampana} className="formulario">
        <input
          type="text"
          placeholder="Nombre de la campaña"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          required
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />

        <select value={partidoId} onChange={(e) => setPartidoId(e.target.value)} required>
          <option value="">Seleccionar partido</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre_partido}</option>
          ))}
        </select>

        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        {editandoId && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
      </form>

      <hr />

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <select value={filtroPartido} onChange={(e) => setFiltroPartido(e.target.value)}>
          <option value="">Filtrar por partido</option>
          {partidos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre_partido}</option>
          ))}
        </select>
      </div>

      <p>Total encontradas: <strong>{campanasFiltradas.length}</strong></p>

      {campanasFiltradas
        .slice(paginaActual * porPagina, (paginaActual + 1) * porPagina)
        .map((c) => (
          <div className="tarjeta-politico" key={c.id}>
            <h4>📢 {c.nombre_campaña}</h4>
            <div className="info">📝 {c.descripcion}</div>
            <div className="info">📅 Inicio: {c.fecha_inicio}</div>
            <div className="info">📅 Fin: {c.fecha_fin || 'N/A'}</div>
            <div className="info">🏛 Partido ID: {c.partido}</div>
            <div className="acciones">
              <button onClick={() => cargarEdicion(c)}>Editar</button>
              <button onClick={() => eliminarCampana(c.id)}>Eliminar</button>
            </div>
          </div>
      ))}

      <div className="paginacion">
        <button disabled={paginaActual === 0} onClick={() => setPaginaActual(paginaActual - 1)}>
          Anterior
        </button>
        <span>Página {paginaActual + 1}</span>
        <button
          disabled={(paginaActual + 1) * porPagina >= campanasFiltradas.length}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AdminCampañas;
