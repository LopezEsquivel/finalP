import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Inicio from './components/Inicio';
import Register from './components/Register';
import MenuUsuario from './components/MenuUsuario';
import Admin from "./components/admin/Admin";
import Info from './components/Info';
import Presidentes from './components/Elementos/Presidentes';
import Postulantes from './components/Elementos/Postulantes';


// Dentro del <Routes>:



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/MenuUsuario' element={<MenuUsuario/>}/>
        <Route path="/admin" element={<Admin />} />
       <Route path="/info" element={<Info />} />
       <Route path='/presidentes' element={<Presidentes/>}/>
      <Route path='/postulantes' element={<Postulantes/>}/>

      </Routes>
    </Router>
  );
}

export default App;
