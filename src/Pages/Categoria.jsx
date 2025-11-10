import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerNoticiasPorCategoria } from "../Data/NoticiasCategoria";
import "./Categoria.css";
import CartNew from "../Components/CartNew/CartNew";

const Categoria = () => {
  const { nombreCategoria } = useParams();
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarNoticias = async () => {
      setCargando(true);
      try {
        const noticiasCategoria = await obtenerNoticiasPorCategoria(
          nombreCategoria
        );
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
    return texto.length > maxLength
      ? texto.substring(0, maxLength) + "..."
      : texto;
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
            <span className="categoria-label">
              {formatearCategoria(nombreCategoria)}
            </span>
            <p className="fecha-actual">{obtenerFechaActual()}</p>
          </div>
          <span className="noticias-count">
            {noticias.length} {noticias.length === 1 ? "artículo" : "artículos"}
          </span>
        </div>
      </div>

      <div className="noticias-container">
        {noticias.map((noticiaIndividual, index) => (
          <CartNew key={noticiaIndividual.id} noticia={noticiaIndividual} />
        ))}
      </div>
    </div>
  );
};

export default Categoria;
