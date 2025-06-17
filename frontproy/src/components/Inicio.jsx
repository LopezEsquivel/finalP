import React from 'react';
import './inicio.css';
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Inicio() {
  return (
    <div className="fondo">
      <nav className="barra-navegacion">
        <a href="/login" className="boton-nav">Iniciar Sesión</a>
        <a href="/register" className="boton-nav">Regístrate</a>
        <a href="/info" className="boton-nav">Más información</a>
      </nav>

      <div className="contenido">
        <h1>Prepárate <br />para el <br />futuro.</h1>
      </div>

      <footer className="redes">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </footer>
    </div>
  );
}

export default Inicio;
