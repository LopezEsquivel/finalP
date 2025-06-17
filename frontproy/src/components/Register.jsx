import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import api from '../servicios/llamados';

const Register = () => {
  // Estados para los campos
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [username, setUsername] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Manejador del botón registrar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    try {
      const objUsuario = {
        "username": username,
        "first_name": nombre,
        "last_name": apellido,
        "email": email,
        "password": password
    }
  const respuesta = await api.postData(
    objUsuario, // campos que espera el backend
    'crear_usuario'
  );

  if (respuesta.exito) {
    setMensaje(' Usuario creado correctamente');
  } else {
    setMensaje('Error al registrar usuario');
  }
} catch (error) {
  setMensaje('Error al conectar con el servidor');
}
  };

// Redirección a Facebook y Google
const handleFacebook = () => {
  window.open('https://www.facebook.com', '_blank');
};

const handleGoogle = () => {
  window.open('https://accounts.google.com', '_blank');
};

return (
  <div className="register-background">
    <div className="register-box">
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirme la contraseña" value={confirmarPassword} onChange={(e) => setConfirmarPassword(e.target.value)} />
        <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />

        <button type="submit" className="btn-register">REGISTRARTE</button>

        {/* Mensaje de respuesta */}
        <p style={{ fontWeight: 'bold' }}>{mensaje}</p>

        <p className="terms-text">
          Al registrarte, aceptas nuestras <a href="#">Condiciones</a>,
          nuestra <a href="#">Política de privacidad</a> y nuestra <a href="#">Política de cookies</a>.
        </p>
        
      </form>
    </div>
  </div>
);
};

export default Register;








