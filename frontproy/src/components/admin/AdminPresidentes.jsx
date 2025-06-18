import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import './AdminPresidentes.css';

const AdminPresidentes = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [img, setImg] = useState('');
  const [presidentes, setPresidentes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formEditado, setFormEditado] = useState({ nombre: '', descripcion: '', img: '' });
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const porPagina = 5;

  useEffect(() => {
    cargarPresidentes();
  }, []);

  const cargarPresidentes = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/presidentes/');
      setPresidentes(res.data);
    } catch (err) {
      console.error('Error al cargar presidentes:', err);
    }
  };

  const agregarPresidente = async () => {
    if (!img) return alert('Primero subí una imagen');
    try {
      await axios.post('http://127.0.0.1:8000/api/presidentes/', { nombre, descripcion, img });
      setNombre('');
      setDescripcion('');
      setImg('');
      cargarPresidentes();
      alert('Presidente agregado');
    } catch (err) {
      console.error(err);
      alert('Error al guardar presidente');
    }
  };

  const subirImagen = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "presidentes");
    formData.append("folder", "Presidentes");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddbvxqdcc/image/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) setImg(data.secure_url);
    } catch (error) {
      console.error('Error al subir imagen', error);
    }
  };

  const eliminarPresidente = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este presidente?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/presidentes/${id}/`);
      cargarPresidentes();
    } catch (err) {
      console.error(err);
    }
  };

  const abrirModalEditar = (presidente) => {
    setEditando(presidente.id);
    setFormEditado({ nombre: presidente.nombre, descripcion: presidente.descripcion, img: presidente.img });
    setModalVisible(true);
  };

  const guardarCambios = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/presidentes/${editando}/`, formEditado);
      setModalVisible(false);
      setEditando(null);
      cargarPresidentes();
    } catch (err) {
      console.error(err);
      alert('Error al guardar cambios');
    }
  };

  const presidentesFiltrados = presidentes.filter(p => p.nombre.toLowerCase().includes(filtro.toLowerCase()));
  const totalPaginas = Math.ceil(presidentesFiltrados.length / porPagina);
  const mostrarPresidentes = presidentesFiltrados.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  return (
    <div className="admin-panel" style={{ maxHeight: 'none', overflowY: 'auto' }}>
      <h2>Agregar Presidente</h2>
      <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
      <input type="file" onChange={subirImagen} />
      <button onClick={agregarPresidente}>Agregar Presidente</button>

      <h2>Presidentes Registrados</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      {mostrarPresidentes.map(p => (
        <div key={p.id} className="presidente-item">
          <img src={p.img} alt={p.nombre} className="mini-img" />
          <strong>{p.nombre}</strong>
          <div>
            <button onClick={() => abrirModalEditar(p)}>Editar</button>
            <button onClick={() => eliminarPresidente(p.id)}>Eliminar</button>
          </div>
        </div>
      ))}

      <div className="paginacion">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button key={i + 1} onClick={() => setPaginaActual(i + 1)} disabled={paginaActual === i + 1}>
            {i + 1}
          </button>
        ))}
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Editar Presidente</h3>
            <input type="text" value={formEditado.nombre} onChange={e => setFormEditado({ ...formEditado, nombre: e.target.value })} />
            <textarea value={formEditado.descripcion} onChange={e => setFormEditado({ ...formEditado, descripcion: e.target.value })} />
            <input type="text" value={formEditado.img} onChange={e => setFormEditado({ ...formEditado, img: e.target.value })} />
            <button onClick={guardarCambios}>Guardar</button>
            <button onClick={() => setModalVisible(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPresidentes;

