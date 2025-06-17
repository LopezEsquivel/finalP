import React, { useEffect, useState } from 'react';
import './Admin.css';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/lista_usuarios/');
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    const obj = {
      username,
      email,
      first_name: nombre,
      last_name: apellido,
      password,
    };

    try {
      await fetch('http://127.0.0.1:8000/api/crear_usuario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
      obtenerUsuarios();
      limpiar();
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/eliminar_usuario/${id}/`, {
        method: 'DELETE',
      });
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const limpiar = () => {
    setUsername('');
    setEmail('');
    setNombre('');
    setApellido('');
    setPassword('');
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.username.toLowerCase().includes(filtro.toLowerCase()) ||
      u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="admin-box">
      <h3>Administrar Usuarios</h3>

      <form onSubmit={crearUsuario} className="formulario">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Crear usuario</button>
        <button type="button" onClick={limpiar}>Limpiar</button>
      </form>

      <input
        type="text"
        placeholder="Buscar por nombre o correo"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{ marginTop: '10px', marginBottom: '10px', width: '100%', padding: '8px' }}
      />

      <p>Total encontrados: <strong>{usuariosFiltrados.length}</strong></p>

      {usuariosFiltrados.map((u) => (
        <div className="tarjeta-politico" key={u.id}>
          <h4>👤 {u.username}</h4>
          <div className="info">📧 {u.email}</div>
          <div className="info">🧾 {u.first_name} {u.last_name}</div>
          <div className="acciones">
            <button onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsuarios;

