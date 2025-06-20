import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import "./AdminPresidentes.css";

const AdminPostulantes = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [partido, setPartido] = useState("");
  const [biografia, setBiografia] = useState("");
  const [propuestas, setPropuestas] = useState("");
  const [criticas, setCriticas] = useState("");
  const [logros, setLogros] = useState("");
  const [historia, setHistoria] = useState("");
  const [imagen, setImagen] = useState(null);

  const [postulantes, setPostulantes] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroPartido, setFiltroPartido] = useState("");
  const [pagina, setPagina] = useState(1);
  const elementosPorPagina = 5;

  useEffect(() => {
    obtenerPostulantes();
    obtenerPartidos();
  }, []);

  const obtenerPostulantes = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/postulantes/");
    const data = await res.json();
    setPostulantes(data);
  };

  const obtenerPartidos = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/partidos/");
    const data = await res.json();
    setPartidos(data);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setPartido("");
    setBiografia("");
    setPropuestas("");
    setCriticas("");
    setLogros("");
    setHistoria("");
    setImagen(null);
    setEditandoId(null);
  };

  const guardarPostulante = async (e) => {
    e.preventDefault();

    let imageUrl = "";

    if (imagen) {
      const imgData = new FormData();
      imgData.append("file", imagen);
      imgData.append("upload_preset", "postulantes");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/ddbvxqdcc/image/upload",
          imgData
        );
        imageUrl = res.data.secure_url;
      } catch (error) {
        alert("Error al subir imagen");
        return;
      }
    }

    const nuevoPostulante = {
      nombre,
      apellido,
      partido,
      biografia,
      propuestas,
      criticas,
      logros,
      historia,
      imagen: imageUrl,
    };

    const url = editandoId
      ? `http://127.0.0.1:8000/api/postulantes/${editandoId}/`
      : "http://127.0.0.1:8000/api/postulantes/";

    const method = editandoId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoPostulante),
      });

      if (!res.ok) throw new Error();

      obtenerPostulantes();
      limpiarFormulario();
    } catch {
      alert("Error al guardar el postulante.");
    }
  };

  const editarPostulante = (p) => {
    setNombre(p.nombre);
    setApellido(p.apellido);
    setPartido(p.partido);
    setBiografia(p.biografia);
    setPropuestas(p.propuestas);
    setCriticas(p.criticas || "");
    setLogros(p.logros || "");
    setHistoria(p.historia || "");
    setEditandoId(p.id);
  };

  const eliminarPostulante = async (id) => {
    if (window.confirm("¿Eliminar este postulante?")) {
      await fetch(`http://127.0.0.1:8000/api/postulantes/${id}/`, {
        method: "DELETE",
      });
      obtenerPostulantes();
    }
  };

  const filtrados = postulantes.filter((p) =>
    p.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
    (filtroPartido === "" || p.partido == filtroPartido)
  );

  const totalPaginas = Math.ceil(filtrados.length / elementosPorPagina);
  const mostrar = filtrados.slice((pagina - 1) * elementosPorPagina, pagina * elementosPorPagina);

  return (
    <div className="admin-scroll">
      <div className="admin-container">
        <h2>Administrar Postulantes</h2>

        <form onSubmit={guardarPostulante} className="formulario">
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          <select value={partido} onChange={(e) => setPartido(e.target.value)} required>
            <option value="">Seleccionar partido</option>
            {partidos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre_partido}</option>
            ))}
          </select>
          <textarea placeholder="Biografía" value={biografia} onChange={(e) => setBiografia(e.target.value)} required />
          <textarea placeholder="Propuestas" value={propuestas} onChange={(e) => setPropuestas(e.target.value)} required />
          <textarea placeholder="Críticas" value={criticas} onChange={(e) => setCriticas(e.target.value)} />
          <textarea placeholder="Logros" value={logros} onChange={(e) => setLogros(e.target.value)} />
          <textarea placeholder="Historia" value={historia} onChange={(e) => setHistoria(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => setImagen(e.target.files?.[0] || null)} />
          <button type="submit">{editandoId ? "Actualizar" : "Agregar"}</button>
          {editandoId && <button type="button" onClick={limpiarFormulario}>Cancelar</button>}
        </form>

        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={filtroNombre}
            onChange={(e) => {
              setFiltroNombre(e.target.value);
              setPagina(1);
            }}
          />
          <select value={filtroPartido} onChange={(e) => {
            setFiltroPartido(e.target.value);
            setPagina(1);
          }}>
            <option value="">Todos los partidos</option>
            {partidos.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre_partido}</option>
            ))}
          </select>
        </div>

        <div className="lista">
          {mostrar.map((p) => (
            <div key={p.id} className="tarjeta-politico">
              <h4>{p.nombre} {p.apellido}</h4>
              <div className="info">Partido: {partidos.find(pt => pt.id === p.partido)?.nombre_partido || p.partido}</div>
              <div className="acciones">
                <button onClick={() => editarPostulante(p)}>Editar</button>
                <button onClick={() => eliminarPostulante(p.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>

        <div className="paginacion">
          <button onClick={() => setPagina(p => p - 1)} disabled={pagina === 1}>Anterior</button>
          <span>Página {pagina} de {totalPaginas}</span>
          <button onClick={() => setPagina(p => p + 1)} disabled={pagina === totalPaginas}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPostulantes;

