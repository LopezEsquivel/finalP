import React, { useEffect, useState } from 'react';
import llamados from '../../servicios/llamados'; 
import './Admin.css';

const AdminPartidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    obtenerPartidos();
  }, []);

  const obtenerPartidos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/partidos/');
      const data = await response.json();
      setPartidos(data);
    } catch (error) {
      console.error('Error al obtener partidos:', error);
    }
  };

  const agregarOActualizar = async (e) => {
    e.preventDefault();
    const obj = {
      nombre_partido: nombre,
      fecha_creacion: fecha,
    };

    try {
      if (editandoId) {
        await fetch(`http://127.0.0.1:8000/api/partidos/${editandoId}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj),
        });
      } else {
        await llamados.postData(obj, 'partidos');
      }
      obtenerPartidos();
      limpiarFormulario();
    } catch (error) {
      console.error('Error al guardar partido:', error);
    }
  };

  const eliminarPartido = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/partidos/${id}/`, {
        method: 'DELETE',
      });
      obtenerPartidos();
    } catch (error) {
      console.error('Error al eliminar partido:', error);
    }
  };

  const cargarEdicion = (partido) => {
    setNombre(partido.nombre_partido);
    setFecha(partido.fecha_creacion);
    setEditandoId(partido.id);
  };

  const limpiarFormulario = () => {
    setNombre('');
    setFecha('');
    setEditandoId(null);
  };

  return (
    <div className="admin-box">
      <h3>Administrar Partidos</h3>

      <form onSubmit={agregarOActualizar} className="formulario">
        <input
          type="text"
          placeholder="Nombre del partido"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Fecha de creación"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? 'Actualizar' : 'Agregar'}</button>
        {editandoId && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
      </form>

      <ul className="lista">
        {partidos.map((partido) => (
          <li key={partido.id}>
            <strong>{partido.nombre_partido}</strong> - {partido.fecha_creacion}
            <div className="botones">
              <button onClick={() => cargarEdicion(partido)}>Editar</button>
              <button onClick={() => eliminarPartido(partido.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPartidos;


