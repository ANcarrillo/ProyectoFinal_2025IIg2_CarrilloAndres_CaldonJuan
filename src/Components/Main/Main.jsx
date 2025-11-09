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
      titulo: "politica",
      descripcion: "Noticias de colombia.",
      imagen: politica
    },
    {
      id: 2,
      titulo: "cultura",
      descripcion: "Noticias del mundo.",
      imagen: "https://picsum.photos/600/300?random=2"
    },
    {
      id: 3,
      titulo: "deportes",
      descripcion: "Lo mejor del deporte.",
      imagen: Deporte
    },
    {
      id: 4,
      titulo: "salud",
      descripcion: "Noticias de tecnología.",
      imagen: salud
    },
    {
      id: 5,
      titulo: "negocio",
      descripcion: "Noticias de tecnología.",
      imagen: negocio
    },
    {
      id: 6,
      titulo: "tecnologia",
      descripcion: "Noticias de tecnología.",
      imagen: Tecnologia
    }
  ];
  const irACategoria = (categoria) => {
    navigate(`/categoria/${categoria}`);
  };

  return (
    <main className="main">
      <section className="inicio" id="inicio">
        <h1>Bienvenido a Noticias Hoy</h1>
        <p>Tu fuente confiable de información actualizada al instante.</p>
      </section>

      <section className="noticias">
        <h2>Últimas Noticias</h2>
        <div className="grid-noticias">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="card">
              <img src={noticia.imagen} alt={noticia.titulo} />
              <h3>{noticia.titulo}</h3>
              <p>{noticia.descripcion}</p>
              <button onClick={() => irACategoria(noticia.titulo)}>
                Ver {noticia.titulo}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
