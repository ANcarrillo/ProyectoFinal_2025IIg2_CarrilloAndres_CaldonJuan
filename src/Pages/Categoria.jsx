import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerNoticiasPorCategoria } from "../Data/NoticiasCategoria";
import "./Categoria.css";

const Categoria = () => {
  const { nombreCategoria } = useParams();
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarNoticias = async () => {
      setCargando(true);
      try {
        const noticiasCategoria = await obtenerNoticiasPorCategoria(nombreCategoria);
        setNoticias(noticiasCategoria);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarNoticias();
  }, [nombreCategoria]);

  const formatearCategoria = (categoria) => {
    return categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase();
  };

  const truncarTexto = (texto, maxLength) => {
    if (!texto) return "";
    return texto.length > maxLength ? texto.substring(0, maxLength) + "..." : texto;
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (cargando) {
    return (
      <div className="categoria-wrapper">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando noticias...</p>
        </div>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className="categoria-wrapper">
        <div className="categoria-header">
          <div className="header-content">
            <button onClick={() => navigate(-1)} className="btn-back">
              ← Volver
            </button>
            <h1>{formatearCategoria(nombreCategoria)}</h1>
          </div>
        </div>
        <div className="empty-state">
          <p>No se encontraron noticias en esta categoría</p>
        </div>
      </div>
    );
  }

  return (
    <div className="categoria-wrapper">
      <div className="categoria-header">
        <div className="header-content">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← Volver
          </button>
          <div className="header-info">
            <span className="categoria-label">{formatearCategoria(nombreCategoria)}</span>
            <p className="fecha-actual">{obtenerFechaActual()}</p>
          </div>
          <span className="noticias-count">{noticias.length} {noticias.length === 1 ? 'artículo' : 'artículos'}</span>
        </div>
      </div>

      <div className="noticias-container">
        {noticias.map((noticia, index) => (
          <article key={noticia.id} className="noticia-card">
            <div className="noticia-image">
              <img 
                src={noticia.url} 
                alt={noticia.titulo}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x450/f0f0f0/666666?text=Sin+Imagen';
                }}
              />
            </div>
            
            <div className="noticia-content">
              <div className="noticia-meta">
                <span className="meta-categoria">{formatearCategoria(nombreCategoria)}</span>
                <span className="meta-separador">•</span>
                
              </div>

              <h2 className="noticia-titulo">{noticia.titulo}</h2>
              
              {noticia.subtitulo && (
                <h3 className="noticia-subtitulo">{noticia.subtitulo}</h3>
              )}
              
              {noticia.descripcion && (
                <p className="noticia-descripcion">
                  {truncarTexto(noticia.descripcion, 200)}
                </p>
              )}

              <a href="#" className="leer-mas">
                Continuar leyendo →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Categoria;