import React, { useState } from 'react'; 
import './Admin.css'; 
import AdminForo from "./AdminForo"; 
import AdminPartidos from './AdminPartidos';
import AdminCampanas from "./AdminCampanas";
import AdminUsuarios from "./AdminUsuarios";
import AdminPoliticos from './AdminPoliticos';
import AdminPostulantes from './AdminPostulantes';


const Admin = () => {
  const [seccion, setSeccion] = useState('');

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      {/* Elegir qué desea administrar */}
      <select onChange={(e) => setSeccion(e.target.value)} defaultValue="">
        <option value="" disabled>Seleccione qué desea administrar</option>
        <option value="partidos">Partidos</option>
        <option value="campañas">Campañas</option>
        <option value="usuarios">Usuarios</option>
        <option value="foro">Foro</option>
        <option value="politicos">Políticos</option>
        <option value="postulantes">Postulantes</option>


      </select>

      <div className="admin-seccion">
        {/* Aquí se carga el componente según la opción seleccionada */}
        {seccion === 'partidos' && <AdminPartidos />}
        {seccion === 'campañas' && <AdminCampanas />}
        {seccion === 'usuarios' && <AdminUsuarios />}
        {seccion === 'foro' && <AdminForo />}
        {seccion === 'politicos' && <AdminPoliticos />}
        {seccion === 'postulantes' && <AdminPostulantes />}


      </div>
    </div>
  );
};

export default Admin;

