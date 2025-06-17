import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import voteImage from '/vote.webp';
import api from '../servicios/llamados';

const Login = () => {
  const [username, setUsername] = useState('');//  guardar el nombre de usuario 
  const [password, setPassword] = useState('');//, guardar contraseña
  const [mensaje, setMensaje] = useState('');//, mensaje


  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const obj = {
        username: username,
        password: password
      }
      // Hace el llamado al backend con usuario y contraseña
      const respuesta = await api.postData(obj, 'login_usuario');

      // Si la respuesta es exitosa, redirige al menú
      if (respuesta.mensaje) {
        navigate('/MenuUsuario'); //
      } else {
        setMensaje(' Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };


  return (
    <div className="login-container"> {/* Contenedor principal del login */}
      <div className="login-box"> {/* Caja central del formulario */}
        <img src={voteImage} alt="Votar" className="login-image" /> {/* Imagen del formulario */}
        
        <div className="login-form">
          <div className="login-icon">
            <i className="fas fa-user-circle"></i>
          </div>

          <input
            type="text"
            placeholder="USUARIO"
            className="login-input"
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
          />

      
          <input
            type="password"
            placeholder="CONTRASEÑA"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Enlace de restablecimiento de contraseña (sin funcionalidad) */}
          <a href="#" className="login-link">¿RESTABLECER?</a>

          {/* Botón para enviar el formulario */}
          <button className="login-button" onClick={handleLogin}>INICIAR</button>

          <p>{mensaje}</p>
        </div>
      </div>
    </div>
  );
};


export default Login;
