import React, { useState, useEffect, useRef } from 'react';
import './MenuUsuario.css';
import axios from 'axios';
import EditarPerfil from './EditarPerfil';

import {
  FaBell, FaComments, FaUserFriends, FaCaretDown,
  FaUserCircle, FaUpload, FaSignOutAlt, FaEdit, FaSave
} from 'react-icons/fa';

const MenuUsuario = () => {
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [publicaciones, setPublicaciones] = useState([]);
  const [textoPublicacion, setTextoPublicacion] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const [nombre, setNombre] = useState('Usuario123');
  const [partido, setPartido] = useState('Independiente');
  const [biografia, setBiografia] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  const fileInputRef = useRef(null);
  const [fotoPerfilUrl, setFotoPerfilUrl] = useState(null);

  const datosPerfil = {
    nombre: nombre.trim() !== '',
    partido: partido.trim() !== '',
    biografia: biografia.trim() !== '',
    foto: true
  };

  const total = Object.keys(datosPerfil).length;
  const completados = Object.values(datosPerfil).filter(Boolean).length;
  const progreso = Math.round((completados / total) * 100);

  const toggleMenu = () => setMostrarMenuUsuario(!mostrarMenuUsuario);
  const cerrarSesion = () => (window.location.href = '/');

  const cargarPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/publicaciones/');
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);
    }
  };

  const manejarPublicacion = async () => {
    if (textoPublicacion.trim() === '') return;
    try {
      const nuevaPublicacion = {
        autor: nombre,
        contenido: textoPublicacion,
      };
      await axios.post('http://localhost:8000/api/publicaciones/', nuevaPublicacion);
      setTextoPublicacion('');
      setMensajeExito('✅ Publicado con éxito');
      cargarPublicaciones();
      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      console.error('Error al publicar:', error);
    }
  };

  const guardarPerfil = () => {
    setModoEdicion(false);
    // Aquí puedes hacer POST o PATCH al backend
  };

  const manejarFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('foto_perfil', file);

    try {
      const res = await axios.post('http://localhost:8000/api/subir-foto/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setFotoPerfilUrl('http://localhost:8000' + res.data.foto_perfil);
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  };

  useEffect(() => {
    cargarPublicaciones();
    axios.get('http://localhost:8000/api/perfil/', { withCredentials: true })
      .then(res => {
        if (res.data.foto_perfil) {
          setFotoPerfilUrl('http://localhost:8000' + res.data.foto_perfil);
        }
      }).catch(error => console.error('Error al obtener perfil:', error));
  }, []);

  return (
    <div className="usuario-wrapper">
      <header className="barra-superior">
        <h1 className="titulo-header">¡Bienvenido!</h1>
        <div className="iconos-header">
          <FaComments className="icono-nav" />
          <FaUserFriends className="icono-nav" />
          <FaBell className="icono-nav" />
          <div className="dropdown-usuario">
            <FaCaretDown className="icono-nav" onClick={toggleMenu} />
            {mostrarMenuUsuario && (
              <div className="menu-desplegable">
                <p><strong>Nombre:</strong> {nombre}</p>
                <p><strong>Partido:</strong> {partido}</p>
                <button className="btn-editar" onClick={() => setModoEdicion(true)}>
                  <FaEdit /> Editar perfil
                </button>
                <button className="btn-cerrar" onClick={cerrarSesion}>
                  <FaSignOutAlt /> Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="usuario-layout">
        <aside className="sidebar">
          <button className="btn-menu" onClick={() => navigate('/presidentes')}>Presidentes</button>
          <button className="btn-menu"><em>Candidatos</em></button>
          <button className="btn-menu">Foro</button>
          <button className="btn-menu"><em>Debates</em></button>
          <button className="btn-menu">Gráficos</button>
        </aside>

        <main className="usuario-main">
          <div className="tarjeta-perfil">
            {fotoPerfilUrl ? (
              <img src={fotoPerfilUrl} alt="Foto de perfil" className="foto-perfil" />
            ) : (
              <FaUserCircle className="icono-foto" />
            )}
            {modoEdicion ? (
              <>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="text" value={partido} onChange={e => setPartido(e.target.value)} />
                <textarea placeholder="Biografía" value={biografia} onChange={e => setBiografia(e.target.value)} />
                <button className="btn-editar" onClick={guardarPerfil}><FaSave /> Guardar</button>
              </>
            ) : (
              <>
                <p className="nombre-usuario">{nombre}</p>
                <p className="estado-usuario">{partido}</p>
                <p className="estado-usuario">{biografia || 'Sin biografía aún.'}</p>
              </>
            )}
            <div className="barra-progreso">
              <div className="progreso" style={{ width: `${progreso}%` }}></div>
            </div>
            <p className="texto-progreso">{progreso}% del perfil completado</p>
            <label className="custom-upload">
              <FaUpload className="upload-icon" />
              <span>Actualizar foto</span>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={manejarFotoChange}
              />
            </label>
          </div>

          <div className="seccion-publicaciones">
            {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
            <textarea
              placeholder="¿Qué opinas sobre la política actual?"
              value={textoPublicacion}
              onChange={(e) => setTextoPublicacion(e.target.value)}
            />
            <button className="btn-publicar" onClick={manejarPublicacion}>Publicar</button>

            {publicaciones.map((pub, index) => (
              <div key={index} className="publicacion">
                <FaUserCircle className="foto-usuario" />
                <div className="publicacion-contenido">
                  <strong>{pub.autor}</strong>
                  <p>{pub.contenido}</p>
                  <small>{new Date(pub.fecha_creacion).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuUsuario;









