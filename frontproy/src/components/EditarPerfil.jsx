import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarPerfil = ({ onClose, usuarioId, onActualizado }) => {
  const [perfil, setPerfil] = useState({
    nombre: '',
    partido: '',
    biografia: '',
  });

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usuarios/${usuarioId}/`);
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al cargar perfil:', error);
      }
    };
    obtenerPerfil();
  }, [usuarioId]);

  const manejarCambio = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:8000/api/usuarios/${usuarioId}/`, perfil);
      onActualizado(); // Para actualizar el progreso
      onClose();
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="editar-perfil-popup">
      <h3>Editar perfil</h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={perfil.nombre}
        onChange={manejarCambio}
      />
      <input
        type="text"
        name="partido"
        placeholder="Partido"
        value={perfil.partido}
        onChange={manejarCambio}
      />
      <textarea
        name="biografia"
        placeholder="Biografía"
        value={perfil.biografia}
        onChange={manejarCambio}
      />
      <button onClick={guardarCambios}>Guardar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
};

export default EditarPerfil;
