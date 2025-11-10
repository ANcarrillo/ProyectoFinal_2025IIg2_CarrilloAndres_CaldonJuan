import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerNoticiaPorId } from "../../Data/Noticias";
import "./NoticiaIndividual.css";

const NoticiaIndividual = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarNoticia = async () => {
      try {
        const noticiaEncontrada = await obtenerNoticiaPorId(id);
        setNoticia(noticiaEncontrada);
      } catch (error) {
        console.error("Error al obtener la noticia:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarNoticia();
  }, [id]);

  if (cargando) {
    return <p>Cargando noticia...</p>;
  }

  if (!noticia) {
    return <p>No se encontró la noticia.</p>;
  }

  return (
    <div className="noticia-individual">
      <div className="presentacionNoticia">
        <h2>{noticia.titulo}</h2>
        <h4>{noticia.subtitulo}</h4>
      </div>
      <div className="imagenNoticia">
        <img
          src={
            noticia.url ||
            "https://ahrefs.com/blog/wp-content/uploads/2023/10/image12-5.png"
          }
          alt={noticia.titulo}
        />
      </div>
      <p>
        <strong style={{color:"orange"}}>Categoría:</strong> {noticia.categoria}
      </p>
      <p>{noticia.contenido}</p>
    </div>
  );
};

export default NoticiaIndividual;
