import React, { useEffect, useState } from 'react';
import llamados from '../../servicios/llamados';
import './Admin.css';

const AdminPoliticos = () => {
  const [politicos, setPoliticos] = useState([]);
  const [politicosFiltrados, setPoliticosFiltrados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [campanas, setCampanas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [partidoId, setPartidoId] = useState('');
  const [campanaId, setCampanaId] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroPartido, setFiltroPartido] = useState('');
  const [filtroCampana, setFiltroCampana] = useState('');
  const [paginaActual, setPaginaActual] = useState(0);
  const porPagina = 5;

  useEffect(() => {
    obtenerPoliticos();
    obtenerPartidos();
    obtenerCampanas();
  }, []);

  useEffect(() => {
    filtrarPoliticos();
  }, [politicos, filtroNombre, filtroPartido, filtroCampana]);

  const obtenerPoliticos = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/politicos/');
    const data = await res.json();
    setPoliticos(data);
  };

  const obtenerPartidos = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/partidos/');
    const data = await res.json();
    setPartidos(data);
  };

  const obtenerCampanas = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/campanas/');
    const data = await res.json();
    setCampanas(data);
  };

  const guardarPolitico = async (e) => {
    e.preventDefault();

    const obj = {
      nombre,
      partido: partidoId,
      campana: campanaId,
    };

    try {
      if (editandoId) {
        await fetch(`http://127.0.0.1:8000/api/politicos/${editandoId}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });
      } else {
        await llamados.postData(obj, 'politicos');
      }

      obtenerPoliticos();
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar político:', error);
    }
  };

  const eliminarPolitico = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/politicos/${id}/`, {
        method: 'DELETE',
      });
      obtenerPoliticos();
    } catch (error) {
      console.error('Error al eliminar político:', error);
    }
  };

  const cargarEdicion = (p) => {
    setNombre(p.nombre);
    setPartidoId(p.partido);
    setCampanaId(p.campana);
    setEditandoId(p.id);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setPartidoId('');
    setCampanaId('');
    setEditandoId(null);
  };

  const filtrarPoliticos = () => {
    let filtrados = [...politicos];

    if (filtroNombre.trim() !== '') {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }

    if (filtroPartido !== '') {
      filtrados = filtrados.filter(p => p.partido === parseInt(filtroPartido));
    }

    if (filtroCampana !== '') {
      filtrados = filtrados.filter(p => p.campana === parseInt(filtroCampana));
    }

    setPoliticosFiltrados(filtrados);
    setPaginaActual(0); // Reiniciar paginación al filtrar
  };

  return (
    <div className="admin-box">
      <h3>Administrar Políticos</h3>

      <form onSubmit={guardarPolitico} className="formulario">
        <input
          type="text"
          placeholder="Nombre del político"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <select value={partidoId} onChange={(e) => setPartidoId(e.target.value)} required>
          <option value="">Seleccionar partido</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre_partido}
            </option>
          ))}
        </select>

        <select value={campanaId} onChange={(e) => setCampanaId(e.target.value)} required>
          <option value="">Seleccionar campaña</option>
          {campanas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre_campana}
            </option>
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

        <select value={filtroCampana} onChange={(e) => setFiltroCampana(e.target.value)}>
          <option value="">Filtrar por campaña</option>
          {campanas.map(c => (
            <option key={c.id} value={c.id}>{c.nombre_campana}</option>
          ))}
        </select>
      </div>

      <div>
        <p>Total encontrados: <strong>{politicosFiltrados.length}</strong></p>

        {politicosFiltrados
          .slice(paginaActual * porPagina, (paginaActual + 1) * porPagina)
          .map((p) => (
            <div className="tarjeta-politico" key={p.id}>
              <h4>👤 {p.nombre}</h4>
              <div className="info">🏛 Partido: {p.nombre_partido}</div>
              <div className="info">🗳 Campaña: {p.nombre_campana}</div>
              <div className="acciones">
                <button onClick={() => cargarEdicion(p)}>Editar</button>
                <button onClick={() => eliminarPolitico(p.id)}>Eliminar</button>
              </div>
            </div>
        ))}

        <div className="paginacion">
          <button disabled={paginaActual === 0} onClick={() => setPaginaActual(paginaActual - 1)}>
            Anterior
          </button>
          <span>Página {paginaActual + 1}</span>
          <button
            disabled={(paginaActual + 1) * porPagina >= politicosFiltrados.length}
            onClick={() => setPaginaActual(paginaActual + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPoliticos;

