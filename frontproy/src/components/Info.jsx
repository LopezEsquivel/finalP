import React, { useState } from 'react';
import './Info.css';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Info = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMostrarMenu(!mostrarMenu);

  return (
    <div className="info-container">
      <div className="info-content">
        <h1>EL FUTURO DE TU PAÍS CAMBIA CON TU VOTO</h1>
        <p>Tenemos con la información necesaria para que tu voto sea informado</p>

        <div className="info-box">
          <strong>CONTAMOS CON</strong>
          <ul>
            <li>Foros Interactivos</li>
            <li>Información de los postulantes</li>
            <li>Videos</li>
            <li>Podrás interactuar con otros usuarios</li>
          </ul>
        </div>

        <button className="toggle-button" onClick={toggleMenu}>
          {mostrarMenu ? 'Ocultar opciones' : 'Mostrar opciones'}{' '}
          {mostrarMenu ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {mostrarMenu && (
          <div className="info-buttons">
            <button onClick={() => navigate('/register')}>REGÍSTRATE</button>
            <button onClick={() => navigate('/')}>VOLVER</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;


