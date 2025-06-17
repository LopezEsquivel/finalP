import React, { useState } from 'react';
import './Presidentes.css';
import { useNavigate } from 'react-router-dom';

export default function Presidentes() {
  const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [indiceSeccion, setIndiceSeccion] = useState(0);

  const volverAlMenu = () => navigate('/MenuUsuario');

  const abrirSeccion = (index) => {
    setIndiceSeccion(index);
    setSeccionActiva(seleccionado?.secciones[index]);
  };

  const cambiarSeccion = (dir) => {
    const nuevoIndice = indiceSeccion + dir;
    if (nuevoIndice >= 0 && nuevoIndice < seleccionado.secciones.length) {
      setIndiceSeccion(nuevoIndice);
      setSeccionActiva(seleccionado.secciones[nuevoIndice]);
    }
  };

  const cerrarTodo = () => {
    setSeleccionado(null);
    setSeccionActiva(null);
    setIndiceSeccion(0);
  };

  const presidentes = [
    {
      nombre: 'Laura Chinchilla',
      img: '/Laura.jpg',
      descripcion: 'Laura Chinchilla Miranda fue presidenta de Costa Rica entre 2010 y 2014. Primera mujer en ocupar este cargo en el país, su gobierno se caracterizó por un enfoque en seguridad, infraestructura y temas sociales.',
      secciones: [
        {
          titulo: '¿Qué hizo durante su presidencia?',
          contenido: [
            'Impulsó la modernización policial y fortalecimiento de la seguridad ciudadana.',
            'Aprobó leyes para combatir la violencia doméstica y proteger los derechos de las mujeres.',
            'Promovió la inversión extranjera y mantuvo la estabilidad económica.',
            'Aumentó la inversión en educación pública y conectividad escolar.',
            'Fortaleció programas sociales en salud y vivienda.'
          ]
        },
        {
          titulo: 'Desafíos y críticas',
          contenido: [
            'Enfrentó protestas por infraestructura, como el caso de la carretera San José–San Ramón.',
            'Críticas a su estilo de liderazgo distante.',
            'Desacuerdos con sindicatos del sector público.',
            'Acusaciones de falta de respuesta ante corrupción institucional.'
          ]
        },
        {
          titulo: 'Errores',
          contenido: [
            'Fracaso en la reforma fiscal conocida como "Plan Fiscal".',
            'Baja popularidad y percepción de inacción ante problemas estructurales.',
            'Problemas de imagen pública por uso de transporte privado en misión oficial.',
            'No logró una reforma profunda en el sistema de salud ni en educación.'
          ]
        },
        {
          titulo: 'Después de la presidencia',
          contenido: [
            'Recibe pensión vitalicia como expresidenta.',
            'Participa en foros internacionales como la ONU y OEA sobre democracia y derechos humanos.',
            'Ha sido observadora electoral en distintos países.',
            'Publica artículos y brinda charlas sobre política y democracia en América Latina.',
            'Promueve el liderazgo femenino y el empoderamiento político de las mujeres.'
          ]
        },
        {
          titulo: 'Medio ambiente y sostenibilidad',
          contenido: [
            'Continuó el impulso de energías renovables en la matriz energética.',
            'Representó al país en foros sobre cambio climático y conservación.',
            'Apoyó el desarrollo del Programa de Pagos por Servicios Ambientales.',
            'Defendió la conservación de áreas silvestres y biodiversidad costarricense.',
            'Fomentó la política diplomática en temas ambientales a nivel internacional.'
          ]
        }
      ]
    },
    {
      nombre: 'Oscar Arias',
      img: '/Oscar.jpg',
      descripcion: 'Oscar Arias Sánchez fue presidente de Costa Rica en dos periodos (1986–1990 y 2006–2010). Reconocido internacionalmente por su labor en procesos de paz en Centroamérica, recibió el Premio Nobel de la Paz en 1987.',
      secciones: [
        {
          titulo: '¿Qué hizo durante su presidencia?',
          contenido: [
            'Promovió el Plan de Paz de Esquipulas para Centroamérica.',
            'Estableció políticas económicas orientadas a la apertura comercial.',
            'Impulsó programas sociales y de infraestructura básica.',
            'Desarrolló relaciones diplomáticas activas con Estados Unidos y la región.'
          ]
        },
        {
          titulo: 'Desafíos y críticas',
          contenido: [
            'Críticas por el Tratado de Libre Comercio con Estados Unidos (CAFTA).',
            'Acusaciones de favorecer intereses empresariales.',
            'Cuestionamientos sobre su rol activo en campañas políticas aún después de su mandato.'
          ]
        },
        {
          titulo: 'Errores',
          contenido: [
            'Promesas incumplidas sobre sostenibilidad ambiental.',
            'Críticas por gastos excesivos durante su segundo mandato.',
            'Demoras en proyectos de infraestructura importantes.'
          ]
        },
        {
          titulo: 'Después de la presidencia',
          contenido: [
            'Ha participado en conferencias sobre democracia y paz.',
            'Figura reconocida en foros globales de política internacional.',
            'Activo en fundaciones y publicaciones relacionadas con la democracia y los derechos humanos.'
          ]
        },
        {
          titulo: 'Medio ambiente y sostenibilidad',
          contenido: [
            'Prometió ser carbono neutral en 2021 durante su segundo mandato.',
            'Apoyó programas de reforestación y energías renovables.',
            'Promovió parques nacionales como parte del turismo ecológico costarricense.'
          ]
        }
      ]
    },
    {
      nombre: 'Guillermo Solís',
      img: '/Guillermo2.jpg',
      descripcion: 'Guillermo Solís Rivera fue presidente de Costa Rica entre 2014 y 2018. Historiador y académico, llegó al poder como candidato del Partido Acción Ciudadana.',
      secciones: [
        {
          titulo: '¿Qué hizo durante su presidencia?',
          contenido: [
            'Aumentó el presupuesto para educación pública.',
            'Mejoró el acceso a tecnologías para estudiantes y escuelas.',
            'Fortaleció las relaciones comerciales con Asia y Europa.',
            'Modernizó el sistema tributario digital del país.'
          ]
        },
        {
          titulo: 'Desafíos y críticas',
          contenido: [
            'Escándalo de corrupción conocido como el “cementazo”.',
            'Falta de acción contundente ante casos de irregularidades institucionales.',
            'Cuestionamientos por el uso del gasto público y déficit fiscal creciente.'
          ]
        },
        {
          titulo: 'Errores',
          contenido: [
            'Falta de liderazgo en momentos de crisis institucional.',
            'Descoordinación en sectores clave como seguridad y salud.',
            'Débil comunicación política con la ciudadanía.'
          ]
        },
        {
          titulo: 'Después de la presidencia',
          contenido: [
            'Regresó a la academia como profesor e investigador.',
            'Participa en paneles sobre gobernabilidad y lucha contra la corrupción.',
            'Ha publicado artículos en medios internacionales sobre la democracia en América Latina.'
          ]
        },
        {
          titulo: 'Medio ambiente y sostenibilidad',
          contenido: [
            'Apoyó la expansión de parques nacionales.',
            'Fomentó el uso de energía solar en edificios gubernamentales.',
            'Mantuvo políticas de sostenibilidad y reducción de emisiones.'
          ]
        }
      ]
    },
    {
      nombre: 'Carlos Alvarado',
      img: '/Carlos.jpg',
      descripcion: 'Carlos Alvarado Quesada fue presidente de Costa Rica entre 2018 y 2022. Periodista, escritor y politólogo, su gobierno destacó por sus acciones en sostenibilidad y respuesta a la pandemia de COVID-19.',
      secciones: [
        {
          titulo: '¿Qué hizo durante su presidencia?',
          contenido: [
            'Implementó el Plan Nacional de Descarbonización.',
            'Gestionó la respuesta nacional ante la pandemia del COVID-19.',
            'Promovió la digitalización de servicios públicos.',
            'Impulsó programas de educación técnica y empleabilidad juvenil.'
          ]
        },
        {
          titulo: 'Desafíos y críticas',
          contenido: [
            'Medidas restrictivas durante la pandemia causaron tensiones sociales.',
            'Críticas a su gestión de la deuda pública y endeudamiento externo.',
            'Conflictos con sectores sindicales y educativos.'
          ]
        },
        {
          titulo: 'Errores',
          contenido: [
            'Retrasos en ejecución de obras públicas.',
            'Debilidad en su equipo de comunicación política.',
            'Percepción de distanciamiento con sectores rurales.'
          ]
        },
        {
          titulo: 'Después de la presidencia',
          contenido: [
            'Ha sido invitado a foros internacionales sobre sostenibilidad.',
            'Participa como consultor y panelista sobre gobernanza democrática.',
            'Continúa escribiendo y participando en medios.'
          ]
        },
        {
          titulo: 'Medio ambiente y sostenibilidad',
          contenido: [
            'Lanzó la meta de Costa Rica como país carbono neutral al 2050.',
            'Promovió transporte eléctrico y eficiencia energética.',
            'Reconocido internacionalmente por su liderazgo ambiental.'
          ]
        }
      ]
    },
    {
      nombre: 'Rodrigo Chaves',
      img: '/rodrigo.jpg',
      descripcion: 'Rodrigo Chaves Robles es el actual presidente de Costa Rica (desde 2022). Economista con trayectoria en el Banco Mundial, su gobierno ha estado marcado por una postura fuerte contra la corrupción.',
      secciones: [
        {
          titulo: '¿Qué hizo durante su presidencia?',
          contenido: [
            'Promovió medidas contra el gasto público excesivo.',
            'Reformas en educación, salud y justicia.',
            'Fortalecimiento de la Policía y lucha contra el crimen organizado.',
            'Digitalización de trámites y servicios públicos.'
          ]
        },
        {
          titulo: 'Desafíos y críticas',
          contenido: [
            'Estilo confrontativo con prensa y oposición.',
            'Controversias por decisiones unilaterales en el poder Ejecutivo.',
            'Conflictos por designaciones en puestos clave del gobierno.'
          ]
        },
        {
          titulo: 'Errores',
          contenido: [
            'Cuestionamientos por concentración del poder.',
            'Dificultades para implementar reformas estructurales por falta de apoyo legislativo.',
            'Reclamos por falta de transparencia en contratos públicos.'
          ]
        },
        {
          titulo: 'Después de la presidencia',
          contenido: [
            'Actualmente en ejercicio.',
            'Se espera que continúe participando en política nacional e internacional.'
          ]
        },
        {
          titulo: 'Medio ambiente y sostenibilidad',
          contenido: [
            'Apoya la economía verde y producción agrícola sostenible.',
            'Ha mantenido políticas de conservación ambiental previas.',
            'Promueve energías limpias y proyectos de sostenibilidad fiscal.'
          ]
        }
      ]
    }
  ];

  return (
    <div className="presidentes-container">
      <h1 className="titulo">El que no conoce su historia está condenado a repetirla</h1>

      <div className="galeria-president">
        {presidentes.map((presidente, index) => (
          <div
            key={index}
            className="presidente-card"
            onClick={() => setSeleccionado(presidente)}
          >
            <img src={presidente.img} alt={presidente.nombre} className="imagen" />
            <p className="nombre">{presidente.nombre}</p>
          </div>
        ))}
      </div>

      {seleccionado && !seccionActiva && (
        <div className="overlay" onClick={cerrarTodo}>
          <div className="info-pres" onClick={(e) => e.stopPropagation()}>
            <h2>{seleccionado.nombre}</h2>
            <p className="intro">{seleccionado.descripcion}</p>
            <div className="botones-info">
              {seleccionado.secciones.map((sec, idx) => (
                <button key={idx} onClick={() => abrirSeccion(idx)}>{sec.titulo}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {seccionActiva && (
        <div className="overlay" onClick={cerrarTodo}>
          <div className="info-pres" onClick={(e) => e.stopPropagation()}>
            <h2>{seccionActiva.titulo}</h2>
            <ul className="lista-info">
              {seccionActiva.contenido.map((punto, i) => (
                <li key={i}>{punto}</li>
              ))}
            </ul>
            <div className="nav-secciones">
              <button onClick={() => cambiarSeccion(-1)} disabled={indiceSeccion === 0}>⏪</button>
              <button onClick={() => cambiarSeccion(1)} disabled={indiceSeccion === seleccionado.secciones.length - 1}>⏩</button>
            </div>
          </div>
        </div>
      )}

      <button className="boton-volver" onClick={volverAlMenu}>Volver al Menú</button>
    </div>
  );
}