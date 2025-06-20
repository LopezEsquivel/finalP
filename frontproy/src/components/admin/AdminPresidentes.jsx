import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const AdminPresidentes = () => {
  const [presidentes, setPresidentes] = useState([]);
  const [nuevoPresidente, setNuevoPresidente] = useState({
    nombre: "",
    descripcion: "",
    que_hizo_en_su_partido: "",
    logros: "",
    bibliografia: "",
    criticas: "",
    despues_de_la_presidencia: "",
    img: ""
  });
  const [imagenArchivo, setImagenArchivo] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  const obtenerPresidentes = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/presidentes/");
      setPresidentes(res.data);
    } catch (error) {
      console.error("Error al obtener presidentes:", error);
    }
  };

  useEffect(() => {
    obtenerPresidentes();
  }, []);

  const subirImagenACloudinary = async () => {
    if (!imagenArchivo) return "";
    const data = new FormData();
    data.append("file", imagenArchivo);
    data.append("upload_preset", "presidentes");
    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/ddbvxqdcc/image/upload", data);
      return res.data.secure_url;
    } catch (error) {
      console.error("Error al subir imagen a Cloudinary:", error);
      return "";
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoPresidente({ ...nuevoPresidente, [name]: value });
  };

  const manejarImagen = (e) => {
    setImagenArchivo(e.target.files[0]);
  };

  const agregarPresidente = async () => {
    const urlImagen = await subirImagenACloudinary();
    
    const datos = { ...nuevoPresidente, img: urlImagen };
    try {
      await axios.post("http://localhost:8000/api/presidentes/", datos);
      setNuevoPresidente({
        nombre: "",
        descripcion: "",
        que_hizo_en_su_partido: "",
        logros: "",
        bibliografia: "",
        criticas: "",
        despues_de_la_presidencia: "",
        img: ""
      });
      setImagenArchivo(null);
      obtenerPresidentes();
    } catch (error) {
      console.error("Error al guardar presidente:", error);
    }
  };

  const eliminarPresidente = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/presidentes/${id}/`);
      obtenerPresidentes();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarPresidente = async (id) => {
    try {
      const urlImagen = imagenArchivo ? await subirImagenACloudinary() : nuevoPresidente.img;
      await axios.put(`http://localhost:8000/api/presidentes/${id}/`, {
        ...nuevoPresidente,
        img: urlImagen
      });
      setEditandoId(null);
      setNuevoPresidente({
        nombre: "",
        descripcion: "",
        que_hizo_en_su_partido: "",
        logros: "",
        bibliografia: "",
        criticas: "",
        despues_de_la_presidencia: "",
        img: ""
      });
      obtenerPresidentes();
    } catch (error) {
      console.error("Error al editar presidente:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="titulo">Panel de Administración</h1>
      <h2>Agregar Presidente</h2>
      <div className="formulario">
        {Object.entries(nuevoPresidente).map(([campo, valor]) => (
          campo !== "img" && (
            <input
              key={campo}
              name={campo}
              value={valor}
              onChange={manejarCambio}
              placeholder={campo.replaceAll("_", " ").replace("que hizo", "¿Qué hizo").replace("descripcion", "Descripción")}
            />
          )
        ))}
        <input type="file" onChange={manejarImagen} />
        <button onClick={agregarPresidente}>Agregar Presidente</button>
      </div>

      <h2>Presidentes Registrados</h2>
      <div className="presidentes-lista">
        {presidentes.map((p) => (
          <div key={p.id} className="presidente-card">
            {p.img && <img src={p.img} alt={p.nombre} className="img-pre" />}
            <strong>{p.nombre}</strong>
            <p>{p.descripcion}</p>
            <button onClick={() => {
              setNuevoPresidente(p);
              setEditandoId(p.id);
            }}>Editar</button>
            <button onClick={() => eliminarPresidente(p.id)}>Eliminar</button>
            {editandoId === p.id && <button onClick={() => editarPresidente(p.id)}>Guardar Cambios</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPresidentes;

