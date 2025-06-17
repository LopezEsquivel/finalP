import React, { useEffect, useState } from 'react';
import './Admin.css';

const AdminForo = () => {
  const [comentarios, setComentarios] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const obtenerComentarios = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/comentarios/');
      const data = await res.json();
      setComentarios(data);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  const eliminarComentario = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/comentarios/${id}/`, {
        method: 'DELETE',
      });
      obtenerComentarios();
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  };

  const comentariosFiltrados = comentarios.filter((c) =>
    c.texto.toLowerCase().includes(filtroTexto.toLowerCase()) &&
    (c.usuario_nombre?.toLowerCase() || '').includes(filtroUsuario.toLowerCase())
  );

  return (
    <div className="admin-box">
      <h3>Administrar Foro</h3>

      <input
        type="text"
        placeholder="Buscar por contenido"
        value={filtroTexto}
        onChange={(e) => setFiltroTexto(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />

      <input
        type="text"
        placeholder="Buscar por nombre de usuario"
        value={filtroUsuario}
        onChange={(e) => setFiltroUsuario(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />

      <p>Total encontrados: <strong>{comentariosFiltrados.length}</strong></p>

      {comentariosFiltrados.map((c) => (
        <div className="tarjeta-politico" key={c.id}>
          <h4>🗨 {c.texto}</h4>
          <div className="info">👤 Usuario: {c.usuario_nombre || `ID ${c.usuario}`}</div>
          <div className="info">🕓 {c.fecha}</div>
          <div className="acciones">
            <button onClick={() => eliminarComentario(c.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminForo;

