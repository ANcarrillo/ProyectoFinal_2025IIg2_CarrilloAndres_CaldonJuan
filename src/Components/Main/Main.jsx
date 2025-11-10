import React from "react";
import "./Main.css";
import Deporte from "../../assets/Deportes.gif";
import Tecnologia from "../../assets/tecnologia.gif";
import salud from "../../assets/salud.gif";
import politica from "../../assets/politica.gif";
import negocio from "../../assets/negocios.gif";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const noticias = [
    {
      id: 1,
      titulo: "Política",
      categoria: "politica",
      descripcion: "Mantente informado sobre los acontecimientos políticos más relevantes del país.",
      imagen: politica,
      color: "#e74c3c"
    },
    {
      id: 2,
      titulo: "Cultura",
      categoria: "cultura",
      descripcion: "Descubre el arte, música y tradiciones que enriquecen nuestra sociedad.",
      imagen: "https://picsum.photos/600/300?random=2",
      color: "#9b59b6"
    },
    {
      id: 3,
      titulo: "Deportes",
      categoria: "deportes",
      descripcion: "Las últimas noticias del mundo deportivo, resultados y análisis.",
      imagen: Deporte,
      color: "#27ae60"
    },
    {
      id: 4,
      titulo: "Salud",
      categoria: "salud",
      descripcion: "Información vital sobre bienestar, prevención y avances médicos.",
      imagen: salud,
      color: "#3498db"
    },
    {
      id: 5,
      titulo: "Negocios",
      categoria: "negocio",
      descripcion: "Análisis económico, mercados y tendencias empresariales.",
      imagen: negocio,
      color: "#f39c12"
    },
    {
      id: 6,
      titulo: "Tecnología",
      categoria: "tecnologia",
      descripcion: "Innovación, gadgets y el futuro digital al alcance de tu mano.",
      imagen: Tecnologia,
      color: "#1abc9c"
    }
  ];

  const irACategoria = (categoria) => {
    navigate(`/categoria/${categoria}`);
  };

  return (
    <main className="main">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Noticias Hoy</h1>
          <p className="hero-subtitle">
            Tu fuente confiable de información actualizada
          </p>
          <div className="hero-badge">
            <span className="badge-live">●</span>
            <span>En vivo • Actualizado constantemente</span>
          </div>
        </div>
      </section>

      <section className="categorias-section">
        <div className="section-header">
          <h2>Explora por Categorías</h2>
          <p>Selecciona la sección que más te interese</p>
        </div>

        <div className="grid-categorias">
          {noticias.map((noticia) => (
            <article 
              key={noticia.id} 
              className="categoria-card"
              onClick={() => irACategoria(noticia.categoria)}
            >
              <div className="card-image-container">
                <img src={noticia.imagen} alt={noticia.titulo} />
                <div className="card-overlay"></div>
              </div>
              
              <div className="card-content">
                <div 
                  className="card-icon" 
                  style={{ backgroundColor: noticia.color }}
                >
                  {noticia.titulo.charAt(0)}
                </div>
                
                <h3 className="card-title">{noticia.titulo}</h3>
                <p className="card-description">{noticia.descripcion}</p>
                
                <button 
                  className="card-button"
                  style={{ 
                    backgroundColor: noticia.color,
                    borderColor: noticia.color 
                  }}
                >
                  Explorar {noticia.titulo}
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Tienes una historia que contar?</h2>
          <p>Únete a nuestro equipo de reporteros y comparte tus noticias</p>
          <button className="cta-button" onClick={() => navigate('/login')}>
            Comenzar ahora
          </button>
        </div>
      </section>
    </main>
  );
};

export default Main;